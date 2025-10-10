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


    // Program cards -> open program details modal
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-program') || card.dataset.program;
            createProgramModal(key);
        });
    });

    // Read More buttons for feature/blog cards
    document.querySelectorAll('.open-blog-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = btn.getAttribute('data-blog') || btn.dataset.blog;
            createBlogModal(key);
        });
    });

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

// Create Program Details Modal
function createProgramModal(key) {
    const contentMap = {
        playgroup: {
            title: 'Playgroup',
            subtitle: "A gentle introduction to school for little explorers",
            body: `<p>Our Playgroup program (1.5 - 2.5 years) focuses on sensory exploration, social play, and gentle routine-building.</p>
                   <ul class="list-disc pl-6 mt-4">
                     <li>Short, structured group activities</li>
                     <li>Sensory play and motor skill development</li>
                     <li>Safe, supervised environment for first-time schoolers</li>
                   </ul>`
        },
        nursery: {
            title: 'Nursery',
            subtitle: "Foundational growth through play-based learning",
            body: `<p>Our Nursery program emphasises language development, early numeracy, and social skills through guided play.</p>
                   <ul class="list-disc pl-6 mt-4">
                     <li>Story time and phonics introduction</li>
                     <li>Fine motor skill activities</li>
                     <li>Interactive group learning</li>
                   </ul>`
        },
        lkg: {
            title: 'LKG',
            subtitle: "Kindergarten readiness and confidence building",
            body: `<p>LKG prepares children with early literacy and math readiness, routine independence and cooperative play.</p>`
        },
        ukg: {
            title: 'UKG',
            subtitle: "Preparing for formal schooling",
            body: `<p>UKG focuses on pre-reading, numeracy, and social-emotional skills to ensure a smooth transition to primary school.</p>`
        },
        daycare: {
            title: 'Day Care',
            subtitle: "Safe and caring environment for young children",
            body: `<p>Our Day Care option offers a nurturing environment for working parents, with structured routines and personalised care.</p>`
        }
    };

    const info = contentMap[key] || { title: 'Program Details', subtitle: '', body: '<p>Details coming soon.</p>' };

    const modalHTML = `
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0">
      <div class="modal-content bg-white rounded-2xl p-8 max-w-3xl w-full scale-95 transition-transform">
        <div class="flex justify-between items-start mb-4">
            <div>
                <h2 class="text-4xl font-bold text-gray-800">${info.title}</h2>
                <p class="text-lg text-gray-600 mt-1">${info.subtitle}</p>
            </div>
            <button class="close-modal-btn p-1">
                <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
            </button>
        </div>
        <div class="prose max-w-none text-gray-700">${info.body}</div>
      </div>
    </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = modalHTML;
    const overlay = container.firstElementChild;
    document.body.appendChild(overlay);

    // Close modal handlers
    const closeBtn = container.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });

    lucide.createIcons();
    showModal(overlay);
}

// Create Blog / Feature Modal (for Read More buttons)
function createBlogModal(key) {
    const blogMap = {
        science: {
            title: 'The Science of Early Learning',
            body: '<p>We use play-based, evidence-backed approaches to encourage cognitive and social development in early years.</p>'
        },
        social: {
            title: 'Social Skills Development',
            body: '<p>Our curriculum emphasises sharing, empathy, and cooperative play to build strong social foundations.</p>'
        },
        primary: {
            title: 'Preparing for Primary School',
            body: '<p>Transition-focused programs ensure children enter primary school confident and ready to learn.</p>'
        }
    };
    const info = blogMap[key] || { title: 'Read More', body: '<p>More information coming soon.</p>' };
    const modalHTML = `
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0">
      <div class="modal-content bg-white rounded-2xl p-8 max-w-3xl w-full scale-95 transition-transform">
        <div class="flex justify-between items-start mb-4">
            <div>
                <h2 class="text-4xl font-bold text-gray-800">${info.title}</h2>
            </div>
            <button class="close-modal-btn p-1">
                <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
            </button>
        </div>
        <div class="prose max-w-none text-gray-700">${info.body}</div>
      </div>
    </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = modalHTML;
    const overlay = container.firstElementChild;
    document.body.appendChild(overlay);

    // Close modal handlers
    const closeBtn = container.querySelector('.close-modal-btn');
    closeBtn.addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });

    lucide.createIcons();
    showModal(overlay);
}

