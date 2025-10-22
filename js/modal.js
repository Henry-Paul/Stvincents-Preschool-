// Modal Logic
const programData = {
    playgroup: { 
        title: "Playgroup", 
        hook: "Where Curiosity Takes Flight!", 
        value: "Our Playgroup is a wonderland of sensory experiences designed to nurture your toddler's budding curiosity.", 
        curriculum: ["Sensory Play", "Gross Motor Skills", "Fine Motor Development", "Music & Movement", "Early Language", "Group Play"], 
        color: "red" 
    },
    nursery: { 
        title: "Nursery", 
        hook: "Building Blocks for a Bright Future!", 
        value: "In Nursery, we build upon natural curiosity by introducing foundational concepts in literacy and numeracy.", 
        curriculum: ["Phonics", "Pre-writing Skills", "Number Recognition", "Physical Development", "Colors & Shapes", "Storytelling"], 
        color: "blue" 
    },
    lkg: { 
        title: "Pre-Primary 1", 
        hook: "Getting Ready for Big School!", 
        value: "Our program focuses on developing foundational academic skills and preparing children for formal schooling.", 
        curriculum: ["Reading & Writing", "Basic Numeracy", "Physical Development", "EVS Concepts", "Logical Reasoning", "Creative Expression"], 
        color: "yellow" 
    },
    ukg: { 
        title: "Pre-Primary 2", 
        hook: "Advanced Preparation for Primary School!", 
        value: "Our program ensures children are fully prepared for primary school with comprehensive skill development.", 
        curriculum: ["Advanced Reading & Writing", "Mathematical Concepts", "Physical Development", "Science Exploration", "Problem Solving", "Public Speaking"], 
        color: "green" 
    },
    daycare: { 
        title: "Day Care", 
        hook: "Your Child's Safe Second Home!", 
        value: "We provide a secure, nurturing, and structured environment for children of working parents.", 
        curriculum: ["Homework Assistance", "Hobby Classes", "Structured Play", "Nap Time", "Indoor Activities"], 
        color: "purple" 
    }
};

const blogData = {
    science: {
        title: "The Science of Early Learning",
        subtitle: "How Preschool Shapes Brain Development",
        image: "images/blog/science-learning.jpeg",
        content: `
            <p class="mb-4">Early childhood is a critical period for brain development. Research shows that 90% of a child's brain develops by age 5, making the preschool years crucial for establishing the foundation for all future learning.</p>
            <p class="mb-4">At St. Vincent's, we leverage this understanding through:</p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>Stimulating environments that promote neural connections</li>
                <li>Play-based activities that develop executive function</li>
                <li>Social interactions that build emotional intelligence</li>
                <li>Language-rich experiences that boost cognitive development</li>
            </ul>
            <p class="mb-6">Our curriculum is designed to capitalize on these critical developmental windows, ensuring your child builds the cognitive, social, and emotional skills needed for lifelong success.</p>
            <div class="bg-blue-50 p-4 crayon-border text-center">
                <h4 class="font-bold text-xl mb-2">Ready to see the difference?</h4>
                <p class="mb-3">Schedule a visit to experience our science-backed approach to early learning.</p>
                <button class="open-contact-modal-from-blog crayon-button bg-blue-500 text-white font-bold px-6 py-3 text-lg">Call +91 9032249494</button>
            </div>
        `
    },
    social: {
        title: "Social Skills Development",
        subtitle: "Building Foundations for Healthy Relationships",
        image: "images/blog/social-skills.jpeg",
        content: `
            <p class="mb-4">Preschool provides the first structured environment where children learn to navigate social relationships outside their family. These early experiences are fundamental to developing essential life skills.</p>
            <p class="mb-4">Through guided play, group activities, and daily interactions, our teachers help children learn:</p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>Empathy and emotional regulation</li>
                <li>Cooperation and sharing skills</li>
                <li>Conflict resolution abilities</li>
                <li>Communication and active listening</li>
                <li>Building positive friendships</li>
            </ul>
            <p class="mb-6">These social competencies form the foundation for healthy relationships throughout life and are crucial for academic and career success later on.</p>
            <div class="bg-green-50 p-4 crayon-border text-center">
                <h4 class="font-bold text-xl mb-2">See our social learning in action!</h4>
                <p class="mb-3">Visit our campus and observe how we nurture social development.</p>
                <button class="open-contact-modal-from-blog crayon-button bg-green-500 text-white font-bold px-6 py-3 text-lg">Call +91 9032249494</button>
            </div>
        `
    },
    primary: {
        title: "Preparing for Primary School",
        subtitle: "A Smooth Transition to Formal Education",
        image: "images/blog/primary-preparation.jpeg",
        content: `
            <p class="mb-4">The transition from preschool to primary school is a significant milestone that requires careful preparation. Our program specifically focuses on ensuring children are academically, socially, and emotionally ready for this important step.</p>
            <p class="mb-4">Key preparation areas include:</p>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>Developing independence and self-help skills</li>
                <li>Building attention span and following multi-step instructions</li>
                <li>Establishing foundational literacy and numeracy</li>
                <li>Promoting problem-solving and critical thinking</li>
                <li>Building confidence and resilience</li>
            </ul>
            <p class="mb-6">We work closely with parents to ensure each child develops the confidence and skills needed to thrive in primary school, making this important transition as smooth and positive as possible.</p>
            <div class="bg-purple-50 p-4 crayon-border text-center">
                <h4 class="font-bold text-xl mb-2">Ensure a smooth transition!</h4>
                <p class="mb-3">Learn how our program prepares children for primary school success.</p>
                <button class="open-contact-modal-from-blog crayon-button bg-purple-500 text-white font-bold px-6 py-3 text-lg">Call +91 9032249494</button>
            </div>
        `
    }
};

function createModal(data, container, isAutoPopup = false) {
    let modalHTML = '';
    if (container === document.getElementById('modal-container')) {
        modalHTML = createProgramModalHTML(data);
    } else if (container === document.getElementById('contact-modal-container') || container === document.getElementById('auto-popup-modal-container')) {
        modalHTML = createContactModalHTML(isAutoPopup);
    } else if (container === document.getElementById('blog-modal-container')) {
        modalHTML = createBlogModalHTML(data);
    }

    container.innerHTML = modalHTML;
    const overlay = container.querySelector('.modal-overlay');
    overlay.style.display = 'flex';
    
    setTimeout(() => { 
        overlay.classList.remove('opacity-0'); 
        overlay.querySelector('.modal-content').classList.remove('scale-95'); 
    }, 10);
    
    lucide.createIcons();
    
    // Handle form submission
    const contactForm = container.querySelector('#contact-form');
    if (contactForm) {
        setupFormSubmission(contactForm, overlay, isAutoPopup);
    }
    
    // Close modal when clicking overlay or close button
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.closest('.close-modal-btn') || e.target.closest('.close-blog-modal')) {
            closeModal(overlay);
        }
    });
    
    // Open contact modal from program modal
    const openContactModalBtns = container.querySelectorAll('.open-contact-modal-from-program, .open-contact-modal-from-blog');
    openContactModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(overlay);
            setTimeout(() => {
                createContactModal();
            }, 300);
        });
    });
}

function createProgramModalHTML(data) {
    return `
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
        <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
            <div class="p-8">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h2 class="text-5xl font-bold text-gray-800">${data.title}</h2>
                        <p class="text-2xl text-${data.color}-600 font-semibold mt-1">${data.hook}</p>
                    </div>
                    <button class="close-modal-btn p-1">
                        <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                    </button>
                </div>
                <p class="font-body text-gray-600 mb-6 text-lg">${data.value}</p>
                <h3 class="font-bold text-3xl mb-3 text-gray-700">Curriculum Highlights</h3>
                <ul class="space-y-2 mb-8">
                    ${data.curriculum.map(item => `
                        <li class="flex items-center text-xl">
                            <i data-lucide="check-circle-2" class="w-6 h-6 text-green-500 mr-2"></i>${item}
                        </li>
                    `).join('')}
                </ul>
                <div class="bg-${data.color}-100 crayon-border p-6 flex justify-between items-center">
                    <div>
                        <p class="text-gray-600 font-medium text-xl">To know more</p>
                        <p class="text-4xl font-bold text-gray-800">Contact Us</p>
                    </div>
                    <button class="open-contact-modal-from-program crayon-button bg-${data.color}-500 text-white font-bold px-6 py-3 text-xl">Book a Tour</button>
                </div>
            </div>
        </div>
    </div>`;
}

function createContactModalHTML(isAutoPopup) {
    return `
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
        <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
            <div class="p-8">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-5xl font-bold text-gray-800">${isAutoPopup ? 'Get Started Today!' : 'Schedule a Visit'}</h2>
                        <p class="text-xl text-gray-600 mt-2">${isAutoPopup ? 'Let us help you find the perfect program for your child!' : 'We\'d love to show you around our campus!'}</p>
                    </div>
                    <button class="close-modal-btn p-1">
                        <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                    </button>
                </div>
                <form id="contact-form" class="space-y-4">
                    <div class="text-2xl">
                        <label for="parentName" class="font-medium text-gray-700">Parent's Name</label>
                        <input type="text" id="parentName" name="parentName" class="w-full mt-1 p-3 crayon-border text-xl" required>
                    </div>
                    <div class="text-2xl">
                        <label for="phone" class="font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" name="phone" class="w-full mt-1 p-3 crayon-border text-xl" required>
                    </div>
                    <div class="text-2xl">
                        <label for="childAge" class="font-medium text-gray-700">Child's Age</label>
                        <select id="childAge" name="childAge" class="w-full mt-1 p-3 crayon-border text-xl" required>
                            <option value="">Select age range</option>
                            <option value="1.5 to 2 years">1.5 to 2 years</option>
                            <option value="2 to 3 years">2 to 3 years</option>
                            <option value="3 to 4 years">3 to 4 years</option>
                            <option value="4 to 5 years">4 to 5 years</option>
                        </select>
                    </div>
                    <div class="text-2xl">
                        <label for="program" class="font-medium text-gray-700">Program Interested In</label>
                        <select id="program" name="program" class="w-full mt-1 p-3 crayon-border text-xl" required>
                            <option value="">Select a program</option>
                            <option value="playgroup">Playgroup</option>
                            <option value="nursery">Nursery</option>
                            <option value="lkg">Pre-Primary 1</option>
                            <option value="ukg">Pre-Primary 2</option>
                            <option value="daycare">Day Care</option>
                        </select>
                    </div>
                    <div class="text-2xl">
                        <label for="message" class="font-medium text-gray-700">Additional Message (Optional)</label>
                        <textarea id="message" name="message" class="w-full mt-1 p-3 crayon-border text-xl" rows="3"></textarea>
                    </div>
                    <button type="submit" class="w-full crayon-button bg-red-400 text-white font-bold text-2xl p-4 flex items-center justify-center gap-2">
                        <span id="submit-text">${isAutoPopup ? 'Get Started' : 'Submit Inquiry'}</span>
                        <div id="submit-spinner" class="spinner hidden" style="width: 20px; height: 20px;"></div>
                    </button>
                    <p id="contact-form-success-message" class="text-green-600 text-center font-semibold hidden text-xl">Thank you! We'll call you soon!</p>
                    <p id="contact-form-error-message" class="text-red-600 text-center font-semibold hidden text-xl">There was an error submitting your form. Please try again or call us directly.</p>
                </form>
            </div>
        </div>
    </div>`;
}

function createBlogModalHTML(data) {
    const blogDataWithColor = {
        ...data,
        color: data === blogData.science ? 'blue' : data === blogData.social ? 'green' : 'purple'
    };
    
    return `
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0" style="display: none;">
        <div class="modal-content bg-paper crayon-border w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-95 blog-modal-content">
            <div class="p-8">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h2 class="text-5xl font-bold text-gray-800">${blogDataWithColor.title}</h2>
                        <p class="text-xl text-${blogDataWithColor.color}-600 font-semibold mt-1">${blogDataWithColor.subtitle}</p>
                    </div>
                    <button class="close-modal-btn p-1">
                        <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                    </button>
                </div>
                <div class="flex flex-col md:flex-row gap-8 mb-8">
                    <div class="md:w-2/5">
                        <div class="responsive-img-container crayon-border">
                            <img src="${blogDataWithColor.image}" alt="${blogDataWithColor.title}" class="responsive-img">
                        </div>
                    </div>
                    <div class="md:w-3/5">
                        <div class="prose max-w-none font-body text-gray-700 text-lg">
                            ${blogDataWithColor.content}
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <button class="close-blog-modal crayon-button bg-red-400 text-white font-bold px-8 py-4 text-xl">Close</button>
                </div>
            </div>
        </div>
    </div>`;
}

function setupFormSubmission(contactForm, overlay, isAutoPopup) {
    const successMessage = contactForm.querySelector('#contact-form-success-message');
    const errorMessage = contactForm.querySelector('#contact-form-error-message');
    const submitText = contactForm.querySelector('#submit-text');
    const submitSpinner = contactForm.querySelector('#submit-spinner');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitText.classList.add('hidden');
        submitSpinner.classList.remove('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        // Collect form data
        const formData = {
            parentName: document.getElementById('parentName').value,
            phone: document.getElementById('phone').value,
            childAge: document.getElementById('childAge').value,
            program: document.getElementById('program').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toLocaleString(),
            source: isAutoPopup ? 'Auto Popup Form' : 'Website Contact Form'
        };
        
        console.log('Sending form data:', formData);
        
        // Check if EmailJS is properly configured
        if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === '5SyxCT8kGY0_H51dC') {
            console.error('EmailJS not properly configured');
            showFormError(errorMessage, submitText, submitSpinner);
            return;
        }
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showFormSuccess(successMessage, contactForm, submitText, submitSpinner, overlay);
            }, function(error) {
                console.log('FAILED...', error);
                showFormError(errorMessage, submitText, submitSpinner);
            });
    });
}

function showFormSuccess(successMessage, contactForm, submitText, submitSpinner, overlay) {
    successMessage.classList.remove('hidden');
    contactForm.reset();
    
    // Reset button state
    submitText.classList.remove('hidden');
    submitSpinner.classList.add('hidden');
    
    setTimeout(() => { 
        successMessage.classList.add('hidden'); 
        closeModal(overlay);
    }, 3000);
}

function showFormError(errorMessage, submitText, submitSpinner) {
    errorMessage.classList.remove('hidden');
    
    // Reset button state
    submitText.classList.remove('hidden');
    submitSpinner.classList.add('hidden');
}

function closeModal(overlay) {
    overlay.classList.add('opacity-0');
    overlay.querySelector('.modal-content').classList.add('scale-95');
    setTimeout(() => { 
        overlay.remove(); 
    }, 300);
}

function createContactModal() {
    createModal({}, document.getElementById('contact-modal-container'));
}

function createAutoPopupModal() {
    createModal({}, document.getElementById('auto-popup-modal-container'), true);
}

function createBlogModal(blogId) {
    if (blogId && blogData[blogId]) {
        createModal(blogData[blogId], document.getElementById('blog-modal-container'));
    }
}

// Export functions for use in main.js
window.ModalFunctions = {
    createModal,
    createContactModal,
    createAutoPopupModal,
    createBlogModal,
    programData,
    blogData
};
