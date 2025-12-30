// Test Qwen2.5-VL model for image analysis
const fs = require('fs')
const path = require('path')

// Load .env manually
const envPath = path.join(__dirname, '.env')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
  }
})

const apiKey = envVars.HUGGINGFACE_API_KEY

async function testQwenVL() {
  console.log('🔍 Testing Qwen2.5-VL-7B-Instruct model...\n')
  
  if (!apiKey || apiKey.includes('xxx')) {
    console.log('❌ HUGGINGFACE_API_KEY not configured!')
    return
  }
  
  console.log('✅ API Key found:', apiKey.slice(0, 10) + '...')
  
  // Test with a simple text prompt (no image)
  try {
    console.log('\n📡 Calling HuggingFace API...')
    
    const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-VL-7B-Instruct',
        messages: [
          {
            role: 'user',
            content: 'Xin chào! Bạn là model gì? Trả lời ngắn gọn bằng tiếng Việt.'
          }
        ],
        max_tokens: 100,
        temperature: 0.1,
      }),
    })
    
    console.log('📊 Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Error:', errorText)
      return
    }
    
    const data = await response.json()
    console.log('\n✅ Model response:')
    console.log(data.choices?.[0]?.message?.content || 'No content')
    console.log('\n🎉 Qwen2.5-VL model is working!')
    
  } catch (error) {
    console.log('❌ Error:', error.message)
  }
}

testQwenVL()
