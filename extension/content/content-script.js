// Content Script - Injected into web pages
// This script can interact with the DOM of web pages

console.log('ANTISCAM Content Script loaded');

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getImages') {
    const images = getPageImages();
    sendResponse({ images: images });
  } else if (request.action === 'highlightDangerousLinks') {
    highlightDangerousLinks();
    sendResponse({ success: true });
  }
  return true;
});

// Get all images on the page
function getPageImages() {
  const images = [];
  const imgElements = document.querySelectorAll('img');
  
  imgElements.forEach((img) => {
    if (img.src && img.src.startsWith('http')) {
      images.push(img.src);
    }
  });
  
  return images;
}

// Highlight potentially dangerous links
function highlightDangerousLinks() {
  const links = document.querySelectorAll('a[href]');
  
  links.forEach((link) => {
    const href = link.href;
    
    // Check for suspicious patterns
    if (isSuspiciousUrl(href)) {
      link.style.border = '2px solid #EF4444';
      link.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      link.title = '⚠️ ANTISCAM: Liên kết này có thể nguy hiểm';
    }
  });
}

// Check if URL is suspicious
function isSuspiciousUrl(url) {
  try {
    const urlObj = new URL(url);
    
    // Check for IP addresses instead of domain names
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(urlObj.hostname)) {
      return true;
    }
    
    // Check for suspicious TLDs
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top'];
    if (suspiciousTLDs.some(tld => urlObj.hostname.endsWith(tld))) {
      return true;
    }
    
    // Check for unicode/homograph attacks
    if (/[^\x00-\x7F]/.test(urlObj.hostname)) {
      return true;
    }
    
    // Check for excessive subdomains
    const parts = urlObj.hostname.split('.');
    if (parts.length > 4) {
      return true;
    }
    
    // Check for suspicious keywords
    const suspiciousKeywords = ['login', 'secure', 'account', 'verify', 'update', 'confirm'];
    const pathLower = urlObj.pathname.toLowerCase();
    if (suspiciousKeywords.some(keyword => pathLower.includes(keyword))) {
      // Only flag if domain doesn't match the service
      if (!urlObj.hostname.includes('facebook') && pathLower.includes('facebook')) return true;
      if (!urlObj.hostname.includes('google') && pathLower.includes('google')) return true;
      if (!urlObj.hostname.includes('paypal') && pathLower.includes('paypal')) return true;
    }
    
    return false;
  } catch (e) {
    return false;
  }
}

// Create warning banner for dangerous pages
function createWarningBanner(message, riskLevel) {
  // Remove existing banner if any
  const existingBanner = document.getElementById('antiscam-warning-banner');
  if (existingBanner) {
    existingBanner.remove();
  }
  
  const banner = document.createElement('div');
  banner.id = 'antiscam-warning-banner';
  banner.className = 'antiscam-banner';
  
  const color = riskLevel === 'high' ? '#EF4444' : '#F59E0B';
  
  banner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: ${color};
      color: white;
      padding: 16px;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
      font-weight: 600;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    ">
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
        <span style="font-size: 24px;">⚠️</span>
        <span>ANTISCAM: ${message}</span>
        <button id="antiscam-close-banner" style="
          background: rgba(255,255,255,0.2);
          border: 1px solid white;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-left: 20px;
        ">Đóng</button>
      </div>
    </div>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);
  
  // Add close button handler
  document.getElementById('antiscam-close-banner')?.addEventListener('click', () => {
    banner.remove();
  });
  
  // Adjust page padding to account for banner
  document.body.style.paddingTop = '60px';
}

// Monitor for dynamic content changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          // Check new links
          if (node.tagName === 'A') {
            const href = node.getAttribute('href');
            if (href && isSuspiciousUrl(href)) {
              node.style.border = '2px solid #EF4444';
              node.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              node.title = '⚠️ ANTISCAM: Liên kết này có thể nguy hiểm';
            }
          }
          
          // Check new images
          if (node.tagName === 'IMG') {
            // Could trigger image scan here
          }
        }
      });
    }
  });
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Check for phishing forms
function checkForPhishingForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach((form) => {
    const inputs = form.querySelectorAll('input[type="password"], input[type="email"]');
    
    if (inputs.length > 0) {
      // Check if HTTPS
      if (window.location.protocol !== 'https:') {
        form.style.border = '3px solid #EF4444';
        form.style.padding = '10px';
        
        const warning = document.createElement('div');
        warning.style.cssText = `
          background: #FEE2E2;
          color: #991B1B;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 12px;
          font-weight: 600;
        `;
        warning.textContent = '⚠️ Cảnh báo: Form này không được mã hóa (HTTP). Không nhập thông tin nhạy cảm!';
        
        form.insertBefore(warning, form.firstChild);
      }
    }
  });
}

// Run checks when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    checkForPhishingForms();
  });
} else {
  checkForPhishingForms();
}

// Export functions for testing
window.ANTISCAM = {
  getPageImages,
  isSuspiciousUrl,
  createWarningBanner
};
