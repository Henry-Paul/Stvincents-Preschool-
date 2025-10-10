// EmailJS Configuration - UPDATE THESE WITH YOUR ACTUAL VALUES
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_14zrdg6', // Get from EmailJS → Email Services
    TEMPLATE_ID: 'template_snxhxlk', // Get from EmailJS → Email Templates  
    PUBLIC_KEY: '5SyxCT8kGY0_H51dC' // Get from EmailJS → Account → API Keys
};

// Application State
const appState = {
    currentTestimonialIndex: 0,
    currentImageSlideIndex: 0,
    canvasState: {
        isDrawing: false,
        currentTool: 'brush',
        currentColor: 'black',
        brushSize: 5
    }
};

// Testimonials Data
const testimonials = [
    { 
        name: "Priya N.", 
        text: "The best preschool in Chandanagar! My daughter has been attending for a year and her confidence has grown tremendously. The teachers are very caring and the curriculum is excellent." 
    }, 
    { 
        name: "Rajesh M.", 
        text: "Wonderful school with amazing staff. My son looks forward to going to school every day. The facilities are clean, safe, and perfect for young children. Highly recommended!" 
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    lucide.createIcons();
    initializeMobileMenu();
    initializeTestimonials();
    initializeFAQ();
    initializeCanvas();
    initializeImageSlider();
    initializeModals();
    
    // Initialize EmailJS only if config is set
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized');
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Testimonials Slider
function initializeTestimonials() {
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;

    renderTestimonials();
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', showNextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', showPrevTestimonial);
    
    setInterval(showNextTestimonial, 5000);
}

function renderTestimonials() {
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;
    
    slider.innerHTML = testimonials.map(t => `
        <div class="testimonial-slide p-4 flex-shrink-0">
            <div class="bg-yellow-100 p-8 rounded-xl crayon-border">
                <p class="font-body text-gray-600 testimonial-text">"${t.text}"</p>
                <p class="font-bold text-gray-800 mt-6 text-2xl text-right">- ${t.name}</p>
            </div>
        </div>
    `).join('');
    
    updateTestimonialSlider();
}

function showNextTestimonial() {
    appState.currentTestimonialIndex = (appState.currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonialSlider();
}

function showPrevTestimonial() {
    appState.currentTestimonialIndex = (appState.currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonialSlider();
}

function updateTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        slider.style.transform = `translateX(-${appState.currentTestimonialIndex * 100}%)`;
    }
}

// FAQ Accordion
function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const wasOpen = parent.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(openItem => openItem.classList.remove('open'));
            if (!wasOpen) parent.classList.add('open');
        });
    });
}

// Canvas Drawing (simplified)
function initializeCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = appState.canvasState.brushSize;
        ctx.strokeStyle = appState.canvasState.currentColor;
    }
    
    let isDrawing = false;
    
    function startDrawing(e) { 
        isDrawing = true; 
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.beginPath(); 
        ctx.moveTo(x, y); 
    }
    
    function draw(e) { 
        if (!isDrawing) return; 
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineTo(x, y); 
        ctx.stroke(); 
    }
    
    function stopDrawing() { 
        isDrawing = false; 
        ctx.closePath();
    }
    
    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Color selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            appState.canvasState.currentColor = e.target.dataset.color;
            document.querySelector('.color-btn.active').classList.remove('active');
            e.target.classList.add('active');
            ctx.strokeStyle = appState.canvasState.currentColor;
        });
    });
    
    // Clear canvas
    document.getElementById('clear-canvas-btn').addEventListener('click', () => {
        if (confirm('Clear canvas?')) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });
    
    // Save canvas
    document.getElementById('save-canvas-btn').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'st-vincents-drawing.png';
        link.href = dataURL;
        link.click();
    });
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

// Image Slider
function initializeImageSlider() {
    const imageSlider = document.getElementById('image-slider');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (!imageSlider) return;
    
    function updateImageSlider() {
        imageSlider.style.transform = `translateX(-${appState.currentImageSlideIndex * 100}%)`;
        sliderDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === appState.currentImageSlideIndex);
        });
    }
    
    document.getElementById('slider-next').addEventListener('click', () => {
        appState.currentImageSlideIndex = (appState.currentImageSlideIndex + 1) % sliderDots.length;
        updateImageSlider();
    });
    
    document.getElementById('slider-prev').addEventListener('click', () => {
        appState.currentImageSlideIndex = (appState.currentImageSlideIndex - 1 + sliderDots.length) % sliderDots.length;
        updateImageSlider();
    });
    
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            appState.currentImageSlideIndex = index;
            updateImageSlider();
        });
    });
    
    setInterval(() => {
        appState.currentImageSlideIndex = (appState.currentImageSlideIndex + 1) % sliderDots.length;
        updateImageSlider();
    }, 4000);
}

// Modal System
function initializeModals() {
    // Contact modal triggers
    document.getElementById('open-contact-modal').addEventListener('click', createContactModal);
    document.getElementById('open-contact-modal-mobile').addEventListener('click', createContactModal);
    document.getElementById('open-contact-modal-hero').addEventListener('click', createContactModal);
    document.getElementById('open-contact-modal-bottom').addEventListener('click', createContactModal);
    
    const premiumContactBtn = document.querySelector('.open-contact-modal-premium');
    if (premiumContactBtn) {
        premiumContactBtn.addEventListener('click', createContactModal);
    }
}

function createContactModal() {
    const modalHTML = `
        <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0">
            <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h2 class="text-5xl font-bold text-gray-800">Schedule a Visit</h2>
                            <p class="text-xl text-gray-600 mt-2">We'd love to show you around our campus!</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <form id="contact-form" class="space-y-4">
                        <div class="text-2xl">
                            <label for="parentName" class="font-medium text-gray-700">Parent's Name *</label>
                            <input type="text" id="parentName" name="parentName" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="phone" class="font-medium text-gray-700">Phone Number *</label>
                            <input type="tel" id="phone" name="phone" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="childAge" class="font-medium text-gray-700">Child's Age *</label>
                            <input type="number" id="childAge" name="childAge" min="1" max="8" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="program" class="font-medium text-gray-700">Program Interested In *</label>
                            <select id="program" name="program" class="w-full mt-1 p-3 crayon-border text-xl" required>
                                <option value="">Select a program</option>
                                <option value="playgroup">Playgroup</option>
                                <option value="nursery">Nursery</option>
                                <option value="lkg">LKG</option>
                                <option value="ukg">UKG</option>
                                <option value="daycare">Day Care</option>
                            </select>
                        </div>
                        <div class="text-2xl">
                            <label for="message" class="font-medium text-gray-700">Additional Message (Optional)</label>
                            <textarea id="message" name="message" class="w-full mt-1 p-3 crayon-border text-xl" rows="3"></textarea>
                        </div>
                        <button type="submit" class="w-full crayon-button bg-red-400 text-white font-bold text-2xl p-4 flex items-center justify-center gap-2">
                            <span id="submit-text">Submit Inquiry</span>
                            <div id="submit-spinner" class="spinner hidden" style="width: 20px; height: 20px;"></div>
                        </button>
                        <p id="contact-form-status" class="text-center font-semibold hidden text-xl p-4 crayon-border"></p>
                    </form>
                </div>
            </div>
        </div>`;
    
    const container = document.getElementById('contact-modal-container');
    container.innerHTML = modalHTML;
    const overlay = container.querySelector('.modal-overlay');
    showModal(overlay);
    
    // Form submission handling
    const form = container.querySelector('#contact-form');
    const statusMessage = container.querySelector('#contact-form-status');
    const submitText = container.querySelector('#submit-text');
    const submitSpinner = container.querySelector('#submit-spinner');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            showFormMessage('Email service not configured. Please call us directly at 091009 99312.', 'error');
            return;
        }
        
        // Show loading state
        submitText.classList.add('hidden');
        submitSpinner.classList.remove('hidden');
        statusMessage.classList.add('hidden');
        
        try {
            // Get form data
            const formData = {
                parentName: document.getElementById('parentName').value,
                phone: document.getElementById('phone').value,
                childAge: document.getElementById('childAge').value,
                program: document.getElementById('program').value,
                message: document.getElementById('message').value || 'No additional message'
            };
            
            // Prepare template parameters
            const templateParams = {
                name: formData.parentName,
                time: new Date().toLocaleString(),
                message: `
Parent Name: ${formData.parentName}
Phone: ${formData.phone}
Child's Age: ${formData.childAge}
Program: ${formData.program}
Message: ${formData.message}

Submitted from St. Vincent's Preschool website.
                `.trim()
            };
            
            console.log('Sending email with params:', templateParams);
            
            // Send email using EmailJS
            const response = await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            
            // Success
            showFormMessage('Thank you! We will contact you soon to schedule your visit.', 'success');
            form.reset();
            
            // Auto-close after success
            setTimeout(() => {
                closeModal(overlay);
            }, 3000);
            
        } catch (error) {
            console.error('Email sending failed:', error);
            showFormMessage('Sorry, there was an error. Please call us directly at 091009 99312.', 'error');
        } finally {
            // Reset button state
            submitText.classList.remove('hidden');
            submitSpinner.classList.add('hidden');
        }
        
        function showFormMessage(message, type) {
            statusMessage.textContent = message;
            statusMessage.className = `text-center font-semibold text-xl form-${type} crayon-border p-4`;
            statusMessage.classList.remove('hidden');
        }
    });
    
    // Close modal handlers
    const closeBtn = container.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
    
    lucide.createIcons();
}

function showModal(overlay) {
    overlay.style.display = 'flex';
    setTimeout(() => { 
        overlay.classList.remove('opacity-0'); 
        overlay.querySelector('.modal-content').classList.remove('scale-95'); 
    }, 10);
}

function closeModal(overlay) {
    overlay.classList.add('opacity-0');
    overlay.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => { 
        overlay.remove(); 
    }, 300);
}
