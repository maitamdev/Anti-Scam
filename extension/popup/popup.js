// Configuration
const API_BASE_URL = 'https://anti-scam-kappa.vercel.app/api'; // Update with your actual domain

// DOM Elements
const scanCurrentPageBtn = document.getElementById('scanCurrentPage');
const scanImagesBtn = document.getElementById('scanImages');
const reportPageBtn = document.getElementById('reportPage');
const settingsBtn = document.getElementById('settings');
const openDashboardBtn = document.getElementById('openDashboard');
const resultsDiv = document.getElementById('results');
const resultContent = document.getElementById('resultContent');
const closeResultsBtn = document.getElementById('closeResults');
const loadingDiv = document.getElementById('loading');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const scansTodayEl = document.getElementById('scansToday');
const threatsBlockedEl = document.getElementById('threatsBlocked');

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
  loadStats();
  attachEventListeners();
  
  // Auto-scan current page on popup open
  const tab = await getCurrentTab();
  if (tab && tab.url && !tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://') && !tab.url.startsWith('chrome-extension://')) {
    scanCurrentPage();
  } else {
    checkCurrentPageStatus();
  }
}

function attachEventListeners() {
  scanCurrentPageBtn.addEventListener('click', scanCurrentPage);
  scanImagesBtn.addEventListener('click', scanImages);
  reportPageBtn.addEventListener('click', reportPage);
  closeResultsBtn.addEventListener('click', hideResults);
  settingsBtn.addEventListener('click', openSettings);
  openDashboardBtn.addEventListener('click', openDashboard);
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function scanCurrentPage() {
  try {
    showLoading(true);
    hideResults();

    const tab = await getCurrentTab();
    const url = tab.url;

    if (!url || url.startsWith('chrome://') || url.startsWith('edge://') || url.startsWith('chrome-extension://')) {
      showError('Không thể quét trang chrome:// hoặc edge://. Vui lòng mở một trang web thông thường.');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Lỗi khi quét URL');
    }

    const data = await response.json();
    console.log('API Response:', data);
    console.log('Score:', data.data?.score);
    console.log('Label:', data.data?.label);
    displayScanResults(data);
    updateStats('scan');

    // Update status
    updatePageStatus(data);

  } catch (error) {
    console.error('Scan error:', error);
    showError(error.message || 'Lỗi khi quét trang. Vui lòng thử lại.');
  } finally {
    showLoading(false);
  }
}

async function scanImages() {
  try {
    showLoading(true);
    hideResults();

    // Send message to content script to find images
    const tab = await getCurrentTab();
    
    chrome.tabs.sendMessage(tab.id, { action: 'getImages' }, async (response) => {
      if (chrome.runtime.lastError) {
        showError('Không thể quét hình ảnh trên trang này');
        showLoading(false);
        return;
      }

      if (!response || !response.images || response.images.length === 0) {
        showError('Không tìm thấy hình ảnh nào trên trang');
        showLoading(false);
        return;
      }

      // Scan first image (you can extend this to scan all images)
      const imageUrl = response.images[0];
      
      const scanResponse = await fetch(`${API_BASE_URL}/scan-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: imageUrl })
      });

      if (!scanResponse.ok) {
        throw new Error('Lỗi khi quét hình ảnh');
      }

      const data = await scanResponse.json();
      displayImageResults(data, response.images.length);
      updateStats('scan');
      
      showLoading(false);
    });

  } catch (error) {
    console.error('Image scan error:', error);
    showError('Lỗi khi quét hình ảnh. Vui lòng thử lại.');
    showLoading(false);
  }
}

async function reportPage() {
  try {
    const tab = await getCurrentTab();
    const url = tab.url;

    if (!url || url.startsWith('chrome://') || url.startsWith('edge://')) {
      showError('Không thể báo cáo trang này');
      return;
    }

    const reason = prompt('Vui lòng mô tả lý do báo cáo:');
    if (!reason) return;

    showLoading(true);

    const response = await fetch(`${API_BASE_URL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url: url,
        reason: reason,
        source: 'extension'
      })
    });

    if (!response.ok) {
      throw new Error('Lỗi khi gửi báo cáo');
    }

    showSuccess('Đã gửi báo cáo thành công. Cảm ơn bạn!');
    updateStats('report');

  } catch (error) {
    console.error('Report error:', error);
    showError('Lỗi khi gửi báo cáo. Vui lòng thử lại.');
  } finally {
    showLoading(false);
  }
}

function displayScanResults(data) {
  let html = '';
  
  // Extract actual data from API response
  const scanData = data.data || data;
  const score = scanData.score || 0;
  const url = scanData.url || 'N/A';
  const label = scanData.label || 'N/A';
  const reasons = scanData.reasons || [];
  const domain = scanData.domain || 'N/A';
  const aiConfidence = scanData.aiConfidence ? (scanData.aiConfidence * 100).toFixed(0) : 'N/A';
  
  // Determine label color and text
  let labelClass = 'low';
  let labelText = 'AN TOÀN';
  if (label === 'DANGEROUS') {
    labelClass = 'high';
    labelText = 'NGUY HIỂM';
  } else if (label === 'CAUTION') {
    labelClass = 'medium';
    labelText = 'CẢNH BÁO';
  }
  
  html += `
    <div style="margin-bottom: 12px;">
      <strong>Domain:</strong> <span style="font-size: 12px; word-break: break-all;">${domain}</span>
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Điểm rủi ro:</strong> <span style="font-size: 16px; font-weight: bold; color: ${score > 70 ? '#dc2626' : score > 40 ? '#f59e0b' : '#059669'};">${score}/100</span>
    </div>
    <div style="margin-bottom: 12px;">
      <span class="risk-badge ${labelClass}">${labelText}</span>
    </div>
    <div style="margin-bottom: 8px; font-size: 12px; color: #6b7280;">
      <strong>Độ tin cậy AI:</strong> ${aiConfidence}%
    </div>
  `;

  if (reasons && reasons.length > 0) {
    html += `
      <div style="margin-top: 12px;">
        <strong>Dấu hiệu phát hiện:</strong>
        <ul style="margin-left: 20px; margin-top: 8px; font-size: 13px; line-height: 1.6;">
          ${reasons.map(reason => `<li style="margin-bottom: 4px;">${reason}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Add full URL at bottom
  html += `
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #6b7280; word-break: break-all;">
      <strong>URL đầy đủ:</strong><br/>${url}
    </div>
  `;

  resultContent.innerHTML = html;
  showResults();
}

function displayImageResults(data, totalImages) {
  let html = '';
  
  html += `
    <div style="margin-bottom: 12px;">
      <strong>Tổng số hình ảnh:</strong> ${totalImages}
    </div>
    <div style="margin-bottom: 12px;">
      <strong>Kết quả:</strong> ${data.message || data.classification || 'N/A'}
    </div>
  `;

  if (data.riskScore !== undefined) {
    const riskLevel = data.riskScore > 70 ? 'high' : data.riskScore > 40 ? 'medium' : 'low';
    const riskText = data.riskScore > 70 ? 'Nguy hiểm cao' : data.riskScore > 40 ? 'Cảnh báo' : 'An toàn';
    const safetyScore = 100 - data.riskScore; // Điểm an toàn = 100 - điểm rủi ro
    
    html += `
      <div style="margin-bottom: 12px;">
        <span class="risk-badge ${riskLevel}">${riskText} - ${safetyScore}%</span>
      </div>
    `;
  }

  resultContent.innerHTML = html;
  showResults();
}

function updatePageStatus(data) {
  // Extract actual data from API response
  const scanData = data.data || data;
  const score = scanData.score || 0;
  const label = scanData.label || 'SAFE';
  
  // Use label for accurate classification
  if (label === 'DANGEROUS' || score > 70) {
    statusIndicator.className = 'status-indicator danger';
    statusIndicator.querySelector('.status-icon').textContent = '⚠';
    statusText.textContent = `Nguy hiểm (${score}/100)`;
  } else if (label === 'CAUTION' || score > 40) {
    statusIndicator.className = 'status-indicator warning';
    statusIndicator.querySelector('.status-icon').textContent = '!';
    statusText.textContent = `Cảnh báo (${score}/100)`;
  } else {
    statusIndicator.className = 'status-indicator safe';
    statusIndicator.querySelector('.status-icon').textContent = '✓';
    statusText.textContent = `An toàn (${score}/100)`;
  }
}

async function checkCurrentPageStatus() {
  try {
    const tab = await getCurrentTab();
    const url = tab.url;

    if (!url || url.startsWith('chrome://') || url.startsWith('edge://')) {
      return;
    }

    // Check if URL is in blocklist/whitelist
    const cached = await getCachedStatus(url);
    if (cached) {
      updatePageStatus(cached);
    }
  } catch (error) {
    console.error('Status check error:', error);
  }
}

async function getCachedStatus(url) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['cachedScans'], (result) => {
      const cached = result.cachedScans || {};
      resolve(cached[url] || null);
    });
  });
}

function showResults() {
  resultsDiv.classList.remove('hidden');
}

function hideResults() {
  resultsDiv.classList.add('hidden');
}

function showLoading(show) {
  if (show) {
    loadingDiv.classList.remove('hidden');
  } else {
    loadingDiv.classList.add('hidden');
  }
}

function showError(message) {
  resultContent.innerHTML = `
    <div style="color: #dc2626; text-align: center; padding: 20px;">
      <div style="font-size: 40px; margin-bottom: 12px;">⚠️</div>
      <div>${message}</div>
    </div>
  `;
  showResults();
}

function showSuccess(message) {
  resultContent.innerHTML = `
    <div style="color: #059669; text-align: center; padding: 20px;">
      <div style="font-size: 40px; margin-bottom: 12px;">✓</div>
      <div>${message}</div>
    </div>
  `;
  showResults();
}

function loadStats() {
  chrome.storage.local.get(['stats'], (result) => {
    const stats = result.stats || { scansToday: 0, threatsBlocked: 0 };
    scansTodayEl.textContent = stats.scansToday || 0;
    threatsBlockedEl.textContent = stats.threatsBlocked || 0;
  });
}

function updateStats(type) {
  chrome.storage.local.get(['stats'], (result) => {
    const stats = result.stats || { scansToday: 0, threatsBlocked: 0 };
    
    if (type === 'scan') {
      stats.scansToday = (stats.scansToday || 0) + 1;
    } else if (type === 'threat') {
      stats.threatsBlocked = (stats.threatsBlocked || 0) + 1;
    }
    
    chrome.storage.local.set({ stats }, () => {
      loadStats();
    });
  });
}

function openSettings() {
  chrome.runtime.openOptionsPage();
}

function openDashboard() {
  chrome.tabs.create({ url: 'https://antiscam.vercel.app/dashboard' });
}
