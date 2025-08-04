function checkOrientation() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    
    if (isMobile && window.innerWidth < 490 && window.innerHeight > window.innerWidth) {
        const orientationMessage = document.getElementById('orientation-message');
        if (!orientationMessage) {
            const message = document.createElement('div');
            message.id = 'orientation-message';
            message.innerHTML = `
                <div class="orientation-alert">
                    <p>📱 For better visibility, please rotate your device to landscape mode 🔄</p>
                </div>
            `;
            document.body.insertBefore(message, document.body.firstChild);
        }
    } else {
        const orientationMessage = document.getElementById('orientation-message');
        if (orientationMessage) {
            orientationMessage.remove();
        }
    }
}
