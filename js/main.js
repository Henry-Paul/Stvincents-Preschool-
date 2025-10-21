// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile Menu
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Initialize testimonials
    initializeTestimonials();

    // Initialize image slider
    initializeImageSlider();

    // Initialize FAQ accordion
    initializeFAQ();

    // Initialize modal event listeners
    initializeModalEvents();

    // Initialize WhatsApp functionality
    initializeWhatsApp();

    // Auto popup modal after 4 seconds
    setTimeout(() => {
        if (window.ModalFunctions) {
            window.ModalFunctions.createAutoPopupModal();
        }
    }, 4000);
});

function initializeTestimonials() {
    const testimonials = [
        { 
            name: "Sai Ram", 
            text: "My child has shown lot of development and he is now more confident after joining st vincent's school." 
        }, 
        { 
            name: "Latha B.", 
            text: "St. Vincent School has excellent facilities and a clean, well-maintained campus that supports learning. The classrooms are modern and well-equipped. What truly stands out is how friendly and approachable the teachers are... One of the Best Schools in ChandaNagar" 
        }, 
        { 
            name: "Shashank Bhardwaj.", 
            text: "My child loves going to this preschool! The teachers are caring, the environment is safe and nurturing, and I've seen amazing growth in my little one's confidence and skills." 
        },
        { 
            name: "Saurabh Shourie.", 
            text: "Great environment with lesser fees in comparison to other schools nearby . My child loves the school. Highly recommended.!" 
        },
        { 
            name: "Anita Singha.", 
            text: "Recently my daughter joined  school and she's very happy and she's hyperactive kid so, I am happy that school is very spacious , hygienic  plus we got good  experienced teachers as well" 
        }
    ];

    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;

    let currentIndex = 0;
    let expandedStates = Array(testimonials.length).fill(false);

    function renderTestimonials() {
        slider.innerHTML = testimonials.map((t, index) => {
            const isExpanded = expandedStates[index];
            const isLongText = t.text.length > 200;
            const displayText = isExpanded ? t.text : (isLongText ? t.text.substring(0, 200) + '...' : t.text);
            
            return `
                <div class="testimonial-slide p-4 flex-shrink-0 w-full">
                    <div class="bg-yellow-100 p-6 rounded-xl crayon-border h-full flex flex-col justify-between min-h-[280px] max-h-[280px] transition-all duration-300 ${isExpanded ? 'expanded' : ''}">
                        <div class="flex-grow overflow-hidden">
                            <p class="font-body text-gray-600 testimonial-text leading-relaxed text-justify">"${displayText}"</p>
                        </div>
                        <div class="mt-4 flex justify-between items-center">
                            <p class="font-bold text-gray-800 text-xl text-right flex-1">- ${t.name}</p>
                            ${isLongText ? `
                                <button class="read-more-btn ml-4 text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors crayon-button bg-blue-100 px-3 py-1" data-index="${index}">
                                    ${isExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Add event listeners to read more buttons
        document.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-index'));
                toggleTestimonialExpansion(index);
            });
        });
    }

    function toggleTestimonialExpansion(index) {
        expandedStates[index] = !expandedStates[index];
        
        const slides = document.querySelectorAll('.testimonial-slide');
        if (slides[index]) {
            const testimonialCard = slides[index].querySelector('.bg-yellow-100');
            if (testimonialCard) {
                if (expandedStates[index]) {
                    testimonialCard.classList.remove('min-h-[280px]', 'max-h-[280px]');
                    testimonialCard.classList.add('min-h-[400px]', 'max-h-none');
                } else {
                    testimonialCard.classList.remove('min-h-[400px]', 'max-h-none');
                    testimonialCard.classList.add('min-h-[280px]', 'max-h-[280px]');
                }
                
                const button = testimonialCard.querySelector('.read-more-btn');
                if (button) {
                    button.textContent = expandedStates[index] ? 'Read Less' : 'Read More';
                }
                
                const textElement = testimonialCard.querySelector('.testimonial-text');
                if (textElement) {
                    textElement.textContent = `"${expandedStates[index] ? testimonials[index].text : testimonials[index].text.substring(0, 200) + '...'}"`;
                }
            }
        }
    }

    function updateSlider() { 
        slider.style.transform = `translateX(-${currentIndex * 100}%)`; 
    }

    function showNext() { 
        currentIndex = (currentIndex + 1) % testimonials.length; 
        updateSlider(); 
    }

    // Initialize the slider
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', () => { 
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length; 
        updateSlider(); 
    });
    
    // Auto-slide every 8 seconds
    setInterval(showNext, 8000);
    renderTestimonials();
}

function initializeImageSlider() {
    const imageSlider = document.getElementById('image-slider');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let slideIndex = 0;

    if (!imageSlider || !sliderDots.length) return;

    function updateImageSlider() {
        imageSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        // Update active dot
        sliderDots.forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % sliderDots.length;
        updateImageSlider();
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + sliderDots.length) % sliderDots.length;
        updateImageSlider();
    }

    // Initialize image slider
    const nextArrow = document.getElementById('slider-next');
    const prevArrow = document.getElementById('slider-prev');
    
    if (nextArrow) nextArrow.addEventListener('click', nextSlide);
    if (prevArrow) prevArrow.addEventListener('click', prevSlide);
    
    // Add click events to dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slideIndex = index;
            updateImageSlider();
        });
    });
    
    // Auto-advance slides
    setInterval(nextSlide, 4000);
}

function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const wasOpen = parent.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(openItem => openItem.classList.remove('open'));
            if (!wasOpen) {
                parent.classList.add('open');
            }
        });
    });

    // FAQ CTA Modal Triggers
    document.querySelectorAll('.open-contact-modal-faq').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const faqType = e.target.getAttribute('data-faq');
            if (window.ModalFunctions) {
                window.ModalFunctions.createContactModal();
            }
            
            // Pre-fill the form based on FAQ type
            setTimeout(() => {
                const programSelect = document.getElementById('program');
                const messageTextarea = document.getElementById('message');
                
                if (programSelect && messageTextarea) {
                    let programValue = '';
                    let additionalMessage = '';
                    
                    switch(faqType) {
                        case 'ideal-age':
                            programValue = 'playgroup';
                            additionalMessage = 'I have questions about the ideal age to start preschool.';
                            break;
                        case 'preparation':
                            programValue = '';
                            additionalMessage = 'I need guidance on preparing my child for preschool and would like to book an orientation session.';
                            break;
                        case 'quality-standards':
                            programValue = '';
                            additionalMessage = 'I would like to learn more about your quality standards and schedule a tour.';
                            break;
                        case 'separation-anxiety':
                            programValue = '';
                            additionalMessage = 'I need help with separation anxiety and would like support for my child.';
                            break;
                        case 'play-learning':
                            programValue = '';
                            additionalMessage = 'I am interested in experiencing your play-based learning approach through a trial session.';
                            break;
                    }
                    
                    if (programValue && programSelect.querySelector(`option[value="${programValue}"]`)) {
                        programSelect.value = programValue;
                    }
                    
                    if (additionalMessage) {
                        messageTextarea.value = additionalMessage;
                    }
                }
            }, 100);
        });
    });
}

function initializeModalEvents() {
    // Program modals
    document.querySelectorAll('.program-card').forEach(card => { 
        card.addEventListener('click', () => {
            if (window.ModalFunctions && window.ModalFunctions.programData) {
                const program = card.dataset.program;
                window.ModalFunctions.createModal(
                    window.ModalFunctions.programData[program], 
                    document.getElementById('modal-container')
                );
            }
        }); 
    });

    // Blog modals
    document.querySelectorAll('.open-blog-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const blogId = btn.getAttribute('data-blog');
            if (window.ModalFunctions) {
                window.ModalFunctions.createBlogModal(blogId);
            }
        });
    });

    // Contact modal triggers
    const contactModalButtons = [
        'open-contact-modal',
        'open-contact-modal-mobile', 
        'open-contact-modal-hero',
        'open-contact-modal-bottom'
    ];

    contactModalButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => {
                if (window.ModalFunctions) {
                    window.ModalFunctions.createContactModal();
                }
            });
        }
    });

    // Premium contact modal button
    const openContactModalPremium = document.querySelector('.open-contact-modal-premium');
    if (openContactModalPremium) {
        openContactModalPremium.addEventListener('click', () => {
            if (window.ModalFunctions) {
                window.ModalFunctions.createContactModal();
            }
        });
    }
}

function initializeWhatsApp() {
    const whatsappButton = document.getElementById('whatsapp-chat-button');
    if (!whatsappButton) return;
    
    // Remove notification badge after first interaction
    whatsappButton.addEventListener('click', function() {
        const badge = this.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    });
    
    // Auto-show tooltip on page load
    setTimeout(() => {
        const tooltip = whatsappButton.querySelector('.whatsapp-chat-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
            }, 5000);
        }
    }, 2000);
}
