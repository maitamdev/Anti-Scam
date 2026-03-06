# URL Scan Engine Documentation

## Analysis Pipeline
1. URL normalization and validation
2. Domain age and registration check
3. Heuristic scoring
4. Vietnamese scam pattern matching
5. AI model prediction
6. External threat feed check
7. Score aggregation
8. Result classification

## Heuristic Checks
- Suspicious TLD detection
- Brand impersonation
- URL length analysis
- Special character detection
- Known scam patterns
- Redirect chain analysis

## AI Model
- HuggingFace text classification
- Trained on Vietnamese scam data
- Confidence threshold: 0.7

## Risk Levels
- SAFE (0-30): Low risk
- CAUTION (31-60): Medium risk
- DANGEROUS (61-100): High riskdocs: add scan engine technical documentation
