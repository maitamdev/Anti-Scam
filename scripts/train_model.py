"""
ANTISCAM - Model Training Script
Fine-tune a BERT model for phishing/scam detection

Requirements:
pip install torch transformers datasets scikit-learn pandas

Usage:
python scripts/train_model.py --data training_data.csv --output models/
"""

import argparse
import json
import os
from datetime import datetime

import pandas as pd
import torch
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
from torch.utils.data import Dataset, DataLoader
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    TrainingArguments,
    Trainer,
    EarlyStoppingCallback,
)


# Label mapping
LABEL_MAP = {
    'SAFE': 0,
    'PHISHING': 1,
    'SCAM': 2,
    'SPAM': 3,
    'MALWARE': 4,
}

LABEL_MAP_REVERSE = {v: k for k, v in LABEL_MAP.items()}


class ScamDataset(Dataset):
    """Custom dataset for scam detection"""
    
    def __init__(self, texts, labels, tokenizer, max_length=256):
        self.texts = texts
        self.labels = labels
        self.tokenizer = tokenizer
        self.max_length = max_length
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = str(self.texts[idx])
        label = self.labels[idx]
        
        encoding = self.tokenizer(
            text,
            truncation=True,
            padding='max_length',
            max_length=self.max_length,
            return_tensors='pt'
        )
        
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'labels': torch.tensor(label, dtype=torch.long)
        }


def compute_metrics(pred):
    """Compute metrics for evaluation"""
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    
    precision, recall, f1, _ = precision_recall_fscore_support(
        labels, preds, average='weighted'
    )
    acc = accuracy_score(labels, preds)
    
    return {
        'accuracy': acc,
        'precision': precision,
        'recall': recall,
        'f1': f1,
    }


def load_data_from_db():
    """Load training data from database (placeholder)"""
    # In production, this would connect to PostgreSQL
    # For now, return sample data
    return pd.DataFrame({
        'text': [
            'Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam',
            'Đăng nhập Vietcombank - Xác minh tài khoản ngay',
            'Shopee Việt Nam - Mua sắm trực tuyến',
            'Chúc mừng bạn đã trúng iPhone 15 Pro Max',
            'Đầu tư Forex lãi suất 100%/tháng',
            'Tài khoản của bạn sẽ bị khóa trong 24h',
            'Nhập OTP để xác minh danh tính',
            'Google - Tìm kiếm thông tin',
            'Facebook - Kết nối bạn bè',
            'Nhận ngay 10 triệu đồng miễn phí',
        ],
        'label': ['SAFE', 'PHISHING', 'SAFE', 'SCAM', 'SCAM', 
                  'PHISHING', 'PHISHING', 'SAFE', 'SAFE', 'SCAM']
    })


def train_model(
    data_path: str = None,
    output_dir: str = 'models',
    model_name: str = 'bert-base-multilingual-cased',
    epochs: int = 3,
    batch_size: int = 16,
    learning_rate: float = 2e-5,
):
    """Train the scam detection model"""
    
    print(f"🚀 Starting training with model: {model_name}")
    
    # Load data
    if data_path and os.path.exists(data_path):
        df = pd.read_csv(data_path)
    else:
        print("📊 Loading sample data...")
        df = load_data_from_db()
    
    print(f"📊 Loaded {len(df)} samples")
    
    # Prepare labels
    df['label_id'] = df['label'].map(LABEL_MAP)
    
    # Split data
    train_texts, val_texts, train_labels, val_labels = train_test_split(
        df['text'].tolist(),
        df['label_id'].tolist(),
        test_size=0.2,
        random_state=42,
        stratify=df['label_id']
    )
    
    print(f"📊 Train: {len(train_texts)}, Val: {len(val_texts)}")
    
    # Load tokenizer and model
    print(f"📥 Loading tokenizer and model...")
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSequenceClassification.from_pretrained(
        model_name,
        num_labels=len(LABEL_MAP),
        problem_type="single_label_classification"
    )
    
    # Create datasets
    train_dataset = ScamDataset(train_texts, train_labels, tokenizer)
    val_dataset = ScamDataset(val_texts, val_labels, tokenizer)
    
    # Training arguments
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    run_output_dir = os.path.join(output_dir, f"run_{timestamp}")
    
    training_args = TrainingArguments(
        output_dir=run_output_dir,
        num_train_epochs=epochs,
        per_device_train_batch_size=batch_size,
        per_device_eval_batch_size=batch_size,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir=os.path.join(run_output_dir, 'logs'),
        logging_steps=10,
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="f1",
        greater_is_better=True,
        learning_rate=learning_rate,
    )
    
    # Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics,
        callbacks=[EarlyStoppingCallback(early_stopping_patience=2)],
    )
    
    # Train
    print("🏋️ Training...")
    trainer.train()
    
    # Evaluate
    print("📊 Evaluating...")
    eval_results = trainer.evaluate()
    print(f"📊 Results: {eval_results}")
    
    # Save model
    final_model_path = os.path.join(output_dir, 'latest')
    trainer.save_model(final_model_path)
    tokenizer.save_pretrained(final_model_path)
    
    # Save metadata
    metadata = {
        'model_name': model_name,
        'trained_at': timestamp,
        'samples': len(df),
        'metrics': eval_results,
        'label_map': LABEL_MAP,
    }
    
    with open(os.path.join(final_model_path, 'metadata.json'), 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"✅ Model saved to {final_model_path}")
    print(f"📊 Accuracy: {eval_results['eval_accuracy']:.4f}")
    print(f"📊 F1 Score: {eval_results['eval_f1']:.4f}")
    
    return eval_results


def predict(text: str, model_path: str = 'models/latest'):
    """Make prediction on a single text"""
    
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)
    model.eval()
    
    encoding = tokenizer(
        text,
        truncation=True,
        padding='max_length',
        max_length=256,
        return_tensors='pt'
    )
    
    with torch.no_grad():
        outputs = model(**encoding)
        probs = torch.softmax(outputs.logits, dim=-1)
        pred_label_id = probs.argmax(-1).item()
        confidence = probs[0][pred_label_id].item()
    
    return {
        'label': LABEL_MAP_REVERSE[pred_label_id],
        'confidence': confidence,
        'probabilities': {
            LABEL_MAP_REVERSE[i]: probs[0][i].item()
            for i in range(len(LABEL_MAP))
        }
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Train ANTISCAM model')
    parser.add_argument('--data', type=str, help='Path to training data CSV')
    parser.add_argument('--output', type=str, default='models', help='Output directory')
    parser.add_argument('--model', type=str, default='bert-base-multilingual-cased', 
                        help='Base model name')
    parser.add_argument('--epochs', type=int, default=3, help='Number of epochs')
    parser.add_argument('--batch-size', type=int, default=16, help='Batch size')
    parser.add_argument('--lr', type=float, default=2e-5, help='Learning rate')
    
    args = parser.parse_args()
    
    train_model(
        data_path=args.data,
        output_dir=args.output,
        model_name=args.model,
        epochs=args.epochs,
        batch_size=args.batch_size,
        learning_rate=args.lr,
    )
