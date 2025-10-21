// EmailJS Configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_14zrdg6',
    TEMPLATE_ID: 'template_snxhxlk',  
    PUBLIC_KEY: '5SyxCT8kGY0_H51dC' // Replace with your actual public key
};

// Initialize EmailJS
(function() {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized with key:', EMAILJS_CONFIG.PUBLIC_KEY);
    } else {
        console.warn('EmailJS not initialized: Please set your PUBLIC_KEY in emailjs-config.js');
    }
})();
