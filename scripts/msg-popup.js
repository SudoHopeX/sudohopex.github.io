const openMessageBtn = document.getElementById('openMessageBtn');
const mainContent = document.getElementById('mainContent');
const head = document.getElementById('head');

let popupWindow;
let removeBlurTimeout;
let popupJustOpened = false; // Flag to ignore first mainContent click after popup opens

openMessageBtn.addEventListener('click', () => {
  // Open popup window immediately
  popupWindow = window.open('message-popup.html', 'SendMessage', 'width=460,height=600');
  if (popupWindow) {
    mainContent.classList.add('blurred');
    head.classList.add('blurred');
    popupJustOpened = true; // Set flag to ignore first click

    // Poll to detect when popup is closed
    const popupChecker = setInterval(() => {
      if (!popupWindow || popupWindow.closed) {
        clearInterval(popupChecker);
        mainContent.classList.remove('blurred');
        head.classList.remove('blurred');
        popupJustOpened = false; // Reset flag when popup closes
      }
    }, 500);
  } else {
    alert('Popup blocked! Please allow popups for this site.');
  }
});