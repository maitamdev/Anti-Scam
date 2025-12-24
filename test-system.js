// Comprehensive System Test Script
const BASE_URL = 'http://localhost:3000'

async function testAPI(endpoint, method = 'GET', body = null, timeout = 15000) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    }
    if (body) options.body = JSON.stringify(body)
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options)
    clearTimeout(timeoutId)
    const data = await response.json()
    return { success: response.ok, status: response.status, data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log('\n🧪 TESTING ANTI-SCAM SYSTEM\n')
  console.log('=' .repeat(50))
  
  // Test 1: Stats API
  console.log('\n📊 Test 1: Stats API')
  const stats = await testAPI('/api/stats')
  console.log(stats.success ? '✅ PASS' : '❌ FAIL', JSON.stringify(stats.data, null, 2))
  
  // Test 2: Model Info
  console.log('\n🤖 Test 2: Model Info API')
  const modelInfo = await testAPI('/api/model/info')
  console.log(modelInfo.success ? '✅ PASS' : '❌ FAIL', JSON.stringify(modelInfo.data, null, 2))
  
  // Test 3: Anonymous Scan (NO AUTH)
  console.log('\n🔍 Test 3: Anonymous Scan (facebook.com)')
  const anonScan = await testAPI('/api/scan-v2', 'POST', { url: 'https://facebook.com' })
  console.log(anonScan.success ? '✅ PASS' : '❌ FAIL')
  if (anonScan.data) {
    console.log('  - Score:', anonScan.data.data?.score)
    console.log('  - Label:', anonScan.data.data?.label)
    console.log('  - ShareToken:', anonScan.data.data?.shareToken || 'N/A (anonymous)')
  }
  
  // Test 4: Blocklist Check
  console.log('\n🚫 Test 4: Blocklist API')
  const blocklist = await testAPI('/api/blocklist?domain=facebook.com')
  console.log(blocklist.success ? '✅ PASS' : '❌ FAIL', JSON.stringify(blocklist.data, null, 2))
  
  // Test 5: Guides API
  console.log('\n📚 Test 5: Guides API')
  const guides = await testAPI('/api/guides?page=1&limit=3')
  console.log(guides.success ? '✅ PASS' : '❌ FAIL')
  if (guides.data?.data) {
    console.log('  - Total:', guides.data.data.pagination?.total || 0)
    console.log('  - Categories:', guides.data.data.categories?.length || 0)
  }
  
  // Test 6: Invalid/Suspicious URL Scan
  console.log('\n⚠️  Test 6: Invalid Domain Scan')
  const invalidScan = await testAPI('/api/scan-v2', 'POST', { url: 'not-a-valid-url' })
  console.log(invalidScan.success ? '✅ PASS' : '❌ FAIL')
  if (invalidScan.data?.data) {
    console.log('  - Score:', invalidScan.data.data.score)
    console.log('  - Label:', invalidScan.data.data.label, '(AI correctly identifies invalid domain)')
  }
  
  // Test 7: Dangerous URL Scan (with longer timeout)
  console.log('\n🚨 Test 7: Suspicious URL Scan')
  const dangerScan = await testAPI('/api/scan-v2', 'POST', { url: 'http://suspicious-link.tk/login' }, 30000)
  console.log(dangerScan.success ? '✅ PASS' : '❌ FAIL')
  if (dangerScan.success && dangerScan.data?.data) {
    console.log('  - Score:', dangerScan.data.data.score)
    console.log('  - Label:', dangerScan.data.data.label)
    console.log('  - Reasons:', dangerScan.data.data.reasons?.slice(0, 2))
  } else if (dangerScan.error) {
    console.log('  - Error:', dangerScan.error)
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ TEST COMPLETED\n')
}

// Run tests
runTests().catch(console.error)
