// Test VirusTotal API
const apiKey = '4df33b17e5e46aa29ce3ba570acbe392fdc69e56f226247a317a5a99edb48a8f';
const testUrl = process.argv[2] || 'https://google.com';
const urlId = Buffer.from(testUrl).toString('base64').replace(/=/g, '');

console.log('🔍 Testing VirusTotal API...');
console.log('Test URL:', testUrl);
console.log('URL ID:', urlId);
console.log('');

fetch(`https://www.virustotal.com/api/v3/urls/${urlId}`, {
  headers: { 'x-apikey': apiKey }
})
  .then(res => {
    console.log('✅ Response Status:', res.status);
    if (res.status === 404) {
      console.log('❌ URL not found in VirusTotal database');
      return null;
    }
    return res.json();
  })
  .then(data => {
    if (!data) return;
    
    if (data.error) {
      console.log('❌ API Error:', data.error);
    } else if (data.data?.attributes?.last_analysis_stats) {
      const stats = data.data.attributes.last_analysis_stats;
      console.log('');
      console.log('📊 Analysis Results:');
      console.log('  Malicious:', stats.malicious || 0);
      console.log('  Suspicious:', stats.suspicious || 0);
      console.log('  Harmless:', stats.harmless || 0);
      console.log('  Undetected:', stats.undetected || 0);
      console.log('  Total engines:', stats.malicious + stats.suspicious + stats.harmless + stats.undetected);
      console.log('');
      console.log('✅ VirusTotal API is working!');
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  })
  .catch(err => {
    console.error('❌ Fetch error:', err.message);
    console.error('Stack:', err.stack);
  });
