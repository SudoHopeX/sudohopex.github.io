const openMessageBtn = document.getElementById('openMessageBtn') || document.getElementById('openMsgBtn-about');
const mainContent = document.getElementById('mainContent');
const head = document.getElementById('head');

let popupWindow;
let popupJustOpened = false; // Flag to ignore first mainContent click after popup opens

if (openMessageBtn) {
  openMessageBtn.addEventListener('click', () => {
    // Construct full URL: domain + /message-popup.html
    const popupUrl = `${window.location.origin}/message-popup.html`;

    // Open popup window
    popupWindow = window.open(popupUrl, 'SendMessage', 'width=460,height=600');

    if (popupWindow) {
      // Add blur to background
      mainContent?.classList.add('blurred');
      head?.classList.add('blurred');
      popupJustOpened = true;

      // Check when popup is closed
      const popupChecker = setInterval(() => {
        if (!popupWindow || popupWindow.closed) {
          clearInterval(popupChecker);
          mainContent?.classList.remove('blurred');
          head?.classList.remove('blurred');
          popupJustOpened = false;
        }
      }, 500);
    } else {
      alert('Popup blocked! Please allow popups for this site.');
    }
  });
}
