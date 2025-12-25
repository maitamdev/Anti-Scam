// Background Service Worker for ANTISCAM Extension

// Configuration
const API_BASE_URL = 'https://anti-scam-kappa.vercel.app/api';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Install event
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('ANTISCAM Extension installed');
    
    // Initialize storage
    chrome.storage.local.set({
      stats: { scansToday: 0, threatsBlocked: 0 },
      cachedScans: {},
      settings: {
        autoScan: true,
        notifications: true,
        blockDangerous: false
      }
    });

    // Create context menu
    createContextMenus();

    // Open welcome page
    chrome.tabs.create({ url: 'https://antiscam.vercel.app' });
  }
});

// Create context menus
function createContextMenus() {
  if (!chrome.contextMenus) return;
  
  chrome.contextMenus.create({
    id: 'scanUrl',
    title: 'Quét URL với ANTISCAM',
    contexts: ['link']
  });

  chrome.contextMenus.create({
    id: 'scanImage',
    title: 'Quét hình ảnh với ANTISCAM',
    contexts: ['image']
  });

  chrome.contextMenus.create({
    id: 'reportPage',
    title: 'Báo cáo trang lừa đảo',
    contexts: ['page']
  });
}

// Context menu click handler
chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case 'scanUrl':
      scanUrl(info.linkUrl);
      break;
    case 'scanImage':
      scanImage(info.srcUrl);
      break;
    case 'reportPage':
      reportPage(tab.url);
      break;
  }
});

// Scan URL
async function scanUrl(url) {
  try {
    // Check cache first
    const cached = await getCachedResult(url);
    if (cached) {
      showNotification('ANTISCAM - Kết quả từ cache', 
        `${url}\nMức độ rủi ro: ${cached.riskScore}%`);
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
      throw new Error('Scan failed');
    }

    const data = await response.json();
    
    // Cache result
    cacheResult(url, data);

    // Show notification
    const riskLevel = data.riskScore > 70 ? '🔴 Nguy hiểm cao' : 
                      data.riskScore > 40 ? '🟡 Cảnh báo' : '🟢 An toàn';
    
    showNotification(`ANTISCAM - ${riskLevel}`, 
      `${url}\nMức độ rủi ro: ${data.riskScore}%`);

    // Update stats
    updateStats('scan');
    
    if (data.riskScore > 70) {
      updateStats('threat');
      
      // Check if should block
      const settings = await getSettings();
      if (settings.blockDangerous) {
        // Block navigation to dangerous URL
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            if (tab.url === url) {
              chrome.tabs.update(tab.id, { 
                url: chrome.runtime.getURL('blocked.html') + '?url=' + encodeURIComponent(url)
              });
            }
          });
        });
      }
    }

  } catch (error) {
    console.error('Scan error:', error);
    showNotification('ANTISCAM - Lỗi', 'Không thể quét URL này');
  }
}

// Scan image
async function scanImage(imageUrl) {
  try {
    const response = await fetch(`${API_BASE_URL}/scan-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl: imageUrl })
    });

    if (!response.ok) {
      throw new Error('Image scan failed');
    }

    const data = await response.json();
    
    showNotification('ANTISCAM - Quét hình ảnh', 
      data.message || data.classification || 'Đã quét xong');
    
    updateStats('scan');

  } catch (error) {
    console.error('Image scan error:', error);
    showNotification('ANTISCAM - Lỗi', 'Không thể quét hình ảnh này');
  }
}

// Report page
async function reportPage(url) {
  try {
    const response = await fetch(`${API_BASE_URL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        url: url,
        reason: 'Reported from extension',
        source: 'extension'
      })
    });

    if (!response.ok) {
      throw new Error('Report failed');
    }

    showNotification('ANTISCAM - Báo cáo', 'Đã gửi báo cáo thành công');
    updateStats('report');

  } catch (error) {
    console.error('Report error:', error);
    showNotification('ANTISCAM - Lỗi', 'Không thể gửi báo cáo');
  }
}

// Tab update listener - auto scan on navigation
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const settings = await getSettings();
    
    if (settings.autoScan && !tab.url.startsWith('chrome://') && !tab.url.startsWith('edge://')) {
      // Auto scan in background
      checkUrlSafety(tab.url, tabId);
    }
  }
});

// Check URL safety in background
async function checkUrlSafety(url, tabId) {
  try {
    // Check cache first
    const cached = await getCachedResult(url);
    if (cached) {
      if (cached.riskScore > 70) {
        updateBadge(tabId, 'danger');
      } else if (cached.riskScore > 40) {
        updateBadge(tabId, 'warning');
      }
      return;
    }

    // Quick check against blocklist
    const response = await fetch(`${API_BASE_URL}/blocklist?url=${encodeURIComponent(url)}`);
    
    if (response.ok) {
      const data = await response.json();
      
      if (data.blocked) {
        updateBadge(tabId, 'danger');
        
        const settings = await getSettings();
        if (settings.notifications) {
          showNotification('⚠️ ANTISCAM - Cảnh báo', 
            'Trang này đã được đánh dấu là nguy hiểm!');
        }
        
        updateStats('threat');
      }
    }

  } catch (error) {
    console.error('Background check error:', error);
  }
}

// Update badge
function updateBadge(tabId, level) {
  if (level === 'danger') {
    chrome.action.setBadgeText({ text: '⚠', tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#EF4444', tabId });
  } else if (level === 'warning') {
    chrome.action.setBadgeText({ text: '!', tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#F59E0B', tabId });
  } else {
    chrome.action.setBadgeText({ text: '', tabId });
  }
}

// Show notification
function showNotification(title, message) {
  if (chrome.notifications) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon128.png',
      title: title,
      message: message,
      priority: 2
    });
  }
}

// Cache management
async function getCachedResult(url) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['cachedScans'], (result) => {
      const cached = result.cachedScans || {};
      const cachedData = cached[url];
      
      if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
        resolve(cachedData.data);
      } else {
        resolve(null);
      }
    });
  });
}

function cacheResult(url, data) {
  chrome.storage.local.get(['cachedScans'], (result) => {
    const cached = result.cachedScans || {};
    cached[url] = {
      data: data,
      timestamp: Date.now()
    };
    chrome.storage.local.set({ cachedScans: cached });
  });
}

// Get settings
async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['settings'], (result) => {
      resolve(result.settings || {
        autoScan: true,
        notifications: true,
        blockDangerous: false
      });
    });
  });
}

// Update stats
function updateStats(type) {
  chrome.storage.local.get(['stats'], (result) => {
    const stats = result.stats || { scansToday: 0, threatsBlocked: 0 };
    
    if (type === 'scan') {
      stats.scansToday = (stats.scansToday || 0) + 1;
    } else if (type === 'threat') {
      stats.threatsBlocked = (stats.threatsBlocked || 0) + 1;
    }
    
    chrome.storage.local.set({ stats });
  });
}

// Reset daily stats at midnight
function resetDailyStats() {
  chrome.storage.local.get(['stats'], (result) => {
    const stats = result.stats || {};
    stats.scansToday = 0;
    chrome.storage.local.set({ stats });
  });
}

// Schedule daily reset
chrome.alarms.create('resetDailyStats', { 
  when: getNextMidnight(),
  periodInMinutes: 24 * 60 
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'resetDailyStats') {
    resetDailyStats();
  }
});

function getNextMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanUrl') {
    scanUrl(request.url).then(() => sendResponse({ success: true }));
    return true;
  } else if (request.action === 'getStats') {
    chrome.storage.local.get(['stats'], (result) => {
      sendResponse(result.stats || { scansToday: 0, threatsBlocked: 0 });
    });
    return true;
  }
});

console.log('ANTISCAM Background Service Worker loaded');
