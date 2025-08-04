function checkOrientation() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isPortrait = window.innerWidth < 490 && window.innerHeight > window.innerWidth;
  const existing = document.getElementById('orientation-message');

  if (isMobile && isPortrait) {
    if (!existing) {
      // Add styles once
      if (!document.getElementById('orientation-style')) {
        const style = document.createElement('style');
        style.id = 'orientation-style';
        style.textContent = `
          @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          .orientation-alert {
            position: fixed;
            top: 0; left: 0; right: 0;
            background-color: #ffd700;
            color: #2c3e50;
            text-align: center;
            padding: 10px;
            z-index: 1000;
            font-weight: bold;
            animation: slideDown 0.5s ease-in-out;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }
        `;
        document.head.appendChild(style);
      }

      // Create the alert
      const message = document.createElement('div');
      message.id = 'orientation-message';
      message.innerHTML = `
        <div class="orientation-alert">
          📱 For better visibility, please rotate your device to landscape mode 🔄
        </div>
      `;
      document.body.insertBefore(message, document.body.firstChild);
    }
  } else {
    if (existing) existing.remove();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkOrientation();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(checkOrientation, 200);
  });

  window.addEventListener('orientationchange', checkOrientation);
});

