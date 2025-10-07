// Formspree Configuration - REPLACE WITH YOUR ACTUAL FORMSPREE ENDPOINT
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id-here';

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

// Blog Content Data
const blogData = {
    science: {
        title: "The Science of Early Learning",
        subtitle: "How Preschool Shapes Brain Development",
        image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        content: `
            <p>The early years of a child's life are crucial for brain development. Research shows that 90% of brain development happens before age 5, making preschool education fundamentally important.</p>
            <h3>Key Developmental Areas:</h3>
            <ul>
                <li><strong>Cognitive Development:</strong> Problem-solving, memory, and logical thinking</li>
                <li><strong>Language Skills:</strong> Vocabulary building and communication</li>
                <li><strong>Social-Emotional Growth:</strong> Empathy, cooperation, and self-regulation</li>
                <li><strong>Motor Skills:</strong> Both fine and gross motor development</li>
            </ul>
            <p>At St. Vincent's, we incorporate evidence-based practices that align with childhood development research to ensure optimal learning outcomes.</p>
        `
    },
    social: {
        title: "Social Skills Development",
        subtitle: "Building Foundations for Relationships",
        image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        content: `
            <p>Preschool provides the first structured environment where children learn to interact with peers outside their family. This social foundation is critical for future success.</p>
            <h3>Essential Social Skills Developed:</h3>
            <ul>
                <li><strong>Sharing and Taking Turns:</strong> Learning patience and fairness</li>
                <li><strong>Conflict Resolution:</strong> Developing problem-solving skills</li>
                <li><strong>Empathy and Understanding:</strong> Recognizing others' feelings</li>
                <li><strong>Communication Skills:</strong> Expressing needs and listening</li>
            </ul>
            <p>Our teachers facilitate social learning through guided play, group activities, and positive reinforcement.</p>
        `
    },
    primary: {
        title: "Preparing for Primary School",
        subtitle: "Smooth Transition to Formal Education",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        content: `
            <p>The transition from preschool to primary school is a significant milestone. Proper preparation ensures children approach this change with confidence and enthusiasm.</p>
            <h3>Preparation Strategies:</h3>
            <ul>
                <li><strong>Academic Readiness:</strong> Foundational literacy and numeracy</li>
                <li><strong>Independence Skills:</strong> Self-care and organization</li>
                <li><strong>Following Instructions:</strong> Listening and task completion</li>
                <li><strong>Classroom Etiquette:</strong> Raising hands, taking turns, group participation</li>
            </ul>
            <p>Our UKG program specifically focuses on developing the skills and confidence needed for a successful transition to primary school.</p>
        `
    }
};

// Program Data
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
        curriculum: ["Phonics", "Pre-writing Skills", "Number Recognition", "Physical Development Activities", "Colors & Shapes", "Storytelling"], 
        color: "blue" 
    },
    lkg: { 
        title: "LKG", 
        hook: "Getting Ready for Big School!", 
        value: "Our LKG program focuses on developing foundational academic skills and preparing children for formal schooling.", 
        curriculum: ["Reading & Writing", "Basic Numeracy", "Physical Coordination", "EVS Concepts", "Logical Reasoning", "Creative Expression"], 
        color: "yellow" 
    },
    ukg: { 
        title: "UKG", 
        hook: "Advanced Preparation for Primary School!", 
        value: "Our UKG program ensures children are fully prepared for primary school with comprehensive skill development.", 
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

// Testimonials Data
const testimonials = [
    { 
        name: "Shravani K.", 
        text: "The best preschool in our area. The teachers are very caring and the curriculum is excellent. My son enjoys going to school every day and has developed so much confidence since joining." 
    }, 
    { 
        name: "Praveen G.", 
        text: "A perfect school for early learning. They have a good play area and the management is very responsive. My daughter's language skills have improved dramatically in just a few months." 
    }, 
    { 
        name: "Divya S.", 
        text: "Amazing school. The staff is professional and the environment is very clean and hygienic which was very important for me. The communication with parents is excellent." 
    },
    { 
        name: "Rajesh M.", 
        text: "My daughter has been attending St. Vincent's for the past year and we've seen remarkable improvement in her social skills and confidence. The teachers are wonderful!" 
    },
    { 
        name: "Priya N.", 
        text: "The facilities are excellent and the staff is very caring. My son looks forward to going to school every day. Highly recommended!" 
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
    
    // Auto-open contact modal after 5 seconds
    setTimeout(() => {
        createContactModal();
    }, 5000);
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
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextTestimonial);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevTestimonial);
    }
    
    // Auto-advance testimonials
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
            
            // Close all open FAQ items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });
            
            // Open clicked item if it wasn't already open
            if (!wasOpen) {
                parent.classList.add('open');
            }
        });
    });
}

// Canvas Drawing
function initializeCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set up canvas
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);
        
        // Set drawing properties
        ctx.lineCap = 'round'; 
        ctx.lineJoin = 'round'; 
        ctx.lineWidth = appState.canvasState.brushSize;
        ctx.strokeStyle = appState.canvasState.currentColor;
        ctx.fillStyle = appState.canvasState.currentColor;
        
        // Draw background and grid
        drawCanvasBackground();
        
        // Reset drawing settings
        ctx.lineWidth = appState.canvasState.brushSize;
        ctx.strokeStyle = appState.canvasState.currentColor;
        ctx.fillStyle = appState.canvasState.currentColor;
    }
    
    function drawCanvasBackground() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(0,0,0,0.05)';
        ctx.lineWidth = 1;
        const gridSize = 20;
        
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
    
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const evt = e.touches ? e.touches[0] : e;
        return { 
            x: evt.clientX - rect.left, 
            y: evt.clientY - rect.top 
        };
    }
    
    function startDrawing(e) { 
        appState.canvasState.isDrawing = true; 
        const {x, y} = getPos(e); 
        
        if (appState.canvasState.currentTool === 'brush') {
            ctx.beginPath(); 
            ctx.moveTo(x, y); 
        } else if (appState.canvasState.currentTool === 'fill') {
            // Simple flood fill implementation
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const targetColor = getPixelColor(imageData, x, y);
            floodFill(imageData, x, y, targetColor, hexToRgb(appState.canvasState.currentColor));
            ctx.putImageData(imageData, 0, 0);
        }
    }
    
    function draw(e) { 
        if (!appState.canvasState.isDrawing || appState.canvasState.currentTool !== 'brush') return; 
        e.preventDefault(); 
        const {x, y} = getPos(e); 
        ctx.lineTo(x, y); 
        ctx.stroke(); 
    }
    
    function stopDrawing() { 
        appState.canvasState.isDrawing = false; 
        if (appState.canvasState.currentTool === 'brush') {
            ctx.closePath(); 
        }
    }
    
    // Flood fill algorithm helpers
    function getPixelColor(imageData, x, y) {
        const index = (y * imageData.width + x) * 4;
        return {
            r: imageData.data[index],
            g: imageData.data[index + 1],
            b: imageData.data[index + 2],
            a: imageData.data[index + 3]
        };
    }
    
    function setPixelColor(imageData, x, y, color) {
        const index = (y * imageData.width + x) * 4;
        imageData.data[index] = color.r;
        imageData.data[index + 1] = color.g;
        imageData.data[index + 2] = color.b;
        imageData.data[index + 3] = color.a || 255;
    }
    
    function colorsMatch(a, b, tolerance = 1) {
        return Math.abs(a.r - b.r) <= tolerance &&
               Math.abs(a.g - b.g) <= tolerance &&
               Math.abs(a.b - b.b) <= tolerance &&
               Math.abs(a.a - (b.a || 255)) <= tolerance;
    }
    
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {r: 0, g: 0, b: 0};
    }
    
    function floodFill(imageData, x, y, targetColor, replacementColor) {
        const stack = [[x, y]];
        const width = imageData.width;
        const height = imageData.height;
        
        while (stack.length > 0) {
            const [currentX, currentY] = stack.pop();
            
            if (currentX < 0 || currentX >= width || currentY < 0 || currentY >= height) {
                continue;
            }
            
            const currentColor = getPixelColor(imageData, currentX, currentY);
            
            if (!colorsMatch(currentColor, targetColor)) {
                continue;
            }
            
            setPixelColor(imageData, currentX, currentY, replacementColor);
            
            stack.push([currentX + 1, currentY]);
            stack.push([currentX - 1, currentY]);
            stack.push([currentX, currentY + 1]);
            stack.push([currentX, currentY - 1]);
        }
    }
    
    // Event listeners for drawing
    ['mousedown', 'touchstart'].forEach(e => canvas.addEventListener(e, startDrawing));
    ['mousemove', 'touchmove'].forEach(e => canvas.addEventListener(e, draw));
    ['mouseup', 'mouseleave', 'touchend'].forEach(e => canvas.addEventListener(e, stopDrawing));
    
    // Color selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            appState.canvasState.currentColor = e.target.dataset.color;
            document.querySelector('.color-btn.active').classList.remove('active');
            e.target.classList.add('active');
            ctx.strokeStyle = appState.canvasState.currentColor;
            ctx.fillStyle = appState.canvasState.currentColor;
            
            // Update brush preview
            document.getElementById('brush-preview').style.backgroundColor = appState.canvasState.currentColor;
        });
    });
    
    // Tool selection
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            appState.canvasState.currentTool = e.currentTarget.dataset.tool;
            document.querySelector('.tool-btn.active').classList.remove('active');
            e.currentTarget.classList.add('active');
            
            if (appState.canvasState.currentTool === 'eraser') {
                ctx.strokeStyle = 'white';
                ctx.fillStyle = 'white';
            } else {
                ctx.strokeStyle = appState.canvasState.currentColor;
                ctx.fillStyle = appState.canvasState.currentColor;
            }
        });
    });
    
    // Brush size control
    const brushSizeControl = document.getElementById('brush-size');
    const brushPreview = document.getElementById('brush-preview');
    
    if (brushSizeControl) {
        brushSizeControl.addEventListener('input', (e) => {
            appState.canvasState.brushSize = parseInt(e.target.value);
            ctx.lineWidth = appState.canvasState.brushSize;
            
            // Update brush preview size
            const size = Math.max(5, appState.canvasState.brushSize / 2);
            brushPreview.style.width = `${size}px`;
            brushPreview.style.height = `${size}px`;
        });
    }
    
    // Clear canvas
    const clearCanvasBtn = document.getElementById('clear-canvas-btn');
    if (clearCanvasBtn) {
        clearCanvasBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the canvas?')) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                resizeCanvas(); // Redraw grid
            }
        });
    }
    
    // Save canvas
    const saveCanvasBtn = document.getElementById('save-canvas-btn');
    if (saveCanvasBtn) {
        saveCanvasBtn.addEventListener('click', () => {
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'st-vincents-drawing.png';
            link.href = dataURL;
            link.click();
        });
    }
    
    // Random color
    const randomColorBtn = document.getElementById('random-color-btn');
    if (randomColorBtn) {
        randomColorBtn.addEventListener('click', () => {
            const colors = ['#ef4444', '#3b82f6', '#22c55e', '#facc15', '#a855f7', '#ec4899', '#f97316', '#14b8a6'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            appState.canvasState.currentColor = randomColor;
            
            // Update active color button
            document.querySelector('.color-btn.active').classList.remove('active');
            const colorBtn = document.querySelector(`.color-btn[data-color="${randomColor}"]`);
            if (colorBtn) {
                colorBtn.classList.add('active');
            }
            
            ctx.strokeStyle = appState.canvasState.currentColor;
            ctx.fillStyle = appState.canvasState.currentColor;
            
            // Update brush preview
            document.getElementById('brush-preview').style.backgroundColor = appState.canvasState.currentColor;
        });
    }
    
    // Initialize canvas
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Set initial brush preview
    if (brushPreview) {
        brushPreview.style.width = `${appState.canvasState.brushSize/2}px`;
        brushPreview.style.height = `${appState.canvasState.brushSize/2}px`;
    }
}

// Image Slider
function initializeImageSlider() {
    const imageSlider = document.getElementById('image-slider');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    if (!imageSlider) return;
    
    function updateImageSlider() {
        imageSlider.style.transform = `translateX(-${appState.currentImageSlideIndex * 100}%)`;
        
        // Update active dot
        sliderDots.forEach((dot, index) => {
            if (index === appState.currentImageSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        appState.currentImageSlideIndex = (appState.currentImageSlideIndex + 1) % sliderDots.length;
        updateImageSlider();
    }
    
    function prevSlide() {
        appState.currentImageSlideIndex = (appState.currentImageSlideIndex - 1 + sliderDots.length) % sliderDots.length;
        updateImageSlider();
    }
    
    // Initialize slider navigation
    const nextBtn = document.getElementById('slider-next');
    const prevBtn = document.getElementById('slider-prev');
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Add click events to dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            appState.currentImageSlideIndex = index;
            updateImageSlider();
        });
    });
    
    // Auto-advance slides
    setInterval(nextSlide, 4000);
}

// Modal System
function initializeModals() {
    // Program modals
    document.querySelectorAll('.program-card').forEach(card => { 
        card.addEventListener('click', () => createProgramModal(card.dataset.program)); 
    });
    
    // Blog modals
    document.querySelectorAll('.open-blog-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const blogId = btn.getAttribute('data-blog');
            createBlogModal(blogId);
        });
    });
    
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

function createProgramModal(programId) {
    const data = programData[programId];
    if (!data) return;
    
    const modalHTML = `
        <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0">
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
    
    const container = document.getElementById('modal-container');
    container.innerHTML = modalHTML;
    showModal(container.querySelector('.modal-overlay'));
    
    // Add event listeners for the new modal
    const overlay = container.querySelector('.modal-overlay');
    const closeBtn = container.querySelector('.close-modal-btn');
    const contactBtn = container.querySelector('.open-contact-modal-from-program');
    
    closeBtn.addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
    
    contactBtn.addEventListener('click', () => {
        closeModal(overlay);
        setTimeout(createContactModal, 300);
    });
    
    lucide.createIcons();
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
                            <label for="parentName" class="font-medium text-gray-700">Parent's Name</label>
                            <input type="text" id="parentName" name="parentName" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="phone" class="font-medium text-gray-700">Phone Number</label>
                            <input type="tel" id="phone" name="phone" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="childAge" class="font-medium text-gray-700">Child's Age</label>
                            <input type="number" id="childAge" name="childAge" min="1" max="8" class="w-full mt-1 p-3 crayon-border text-xl" required>
                        </div>
                        <div class="text-2xl">
                            <label for="program" class="font-medium text-gray-700">Program Interested In</label>
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
                        <p id="contact-form-status" class="text-center font-semibold hidden text-xl"></p>
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
        
        // Show loading state
        submitText.classList.add('hidden');
        submitSpinner.classList.remove('hidden');
        statusMessage.classList.add('hidden');
        
        // Prepare form data for Formspree
        const formData = new FormData();
        formData.append('parentName', document.getElementById('parentName').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('childAge', document.getElementById('childAge').value);
        formData.append('program', document.getElementById('program').value);
        formData.append('message', document.getElementById('message').value);
        formData.append('_subject', 'New Preschool Inquiry from Website');
        
        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                statusMessage.textContent = 'Thank you! We will contact you soon to schedule your visit.';
                statusMessage.className = 'text-center font-semibold text-xl form-success crayon-border p-4';
                form.reset();
                
                // Auto-close and show review modal after success
                setTimeout(() => {
                    closeModal(overlay);
                    setTimeout(createReviewModal, 300);
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Error handling
            statusMessage.textContent = 'Sorry, there was an error submitting your form. Please call us directly at 091009 99312.';
            statusMessage.className = 'text-center font-semibold text-xl form-error crayon-border p-4';
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitText.classList.remove('hidden');
            submitSpinner.classList.add('hidden');
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

function createReviewModal() {
    const modalHTML = `
        <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0">
            <div class="modal-content bg-paper crayon-border w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-95">
                <div class="p-8 text-center">
                    <div class="flex justify-between items-start mb-6">
                        <div class="w-full">
                            <h2 class="text-5xl font-bold text-gray-800">Thank You!</h2>
                            <p class="text-xl text-gray-600 mt-2">We appreciate your interest in St. Vincent's Preschool.</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <div class="bg-yellow-100 p-6 crayon-border mb-6">
                        <i data-lucide="star" class="w-16 h-16 text-yellow-500 mx-auto mb-4"></i>
                        <h3 class="text-3xl font-bold text-gray-800 mb-4">Help Other Parents Discover Us</h3>
                        <p class="font-body text-gray-600 mb-6">Would you like to share your experience with other parents by leaving a Google review?</p>
                        <a href="https://g.page/r/CbNp6tq5qJ7-EB0/review" target="_blank" class="crayon-button bg-green-500 text-white font-bold px-8 py-4 text-xl inline-flex items-center gap-2">
                            <i data-lucide="star" class="w-6 h-6"></i> Leave a Google Review
                        </a>
                    </div>
                    <button class="close-review-modal crayon-button bg-gray-400 text-white font-bold px-8 py-4 text-xl">Maybe Later</button>
                </div>
            </div>
        </div>`;
    
    const container = document.getElementById('review-modal-container');
    container.innerHTML = modalHTML;
    const overlay = container.querySelector('.modal-overlay');
    showModal(overlay);
    
    // Close modal handlers
    const closeBtn = container.querySelector('.close-modal-btn');
    const laterBtn = container.querySelector('.close-review-modal');
    
    closeBtn.addEventListener('click', () => closeModal(overlay));
    laterBtn.addEventListener('click', () => closeModal(overlay));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal(overlay);
    });
    
    lucide.createIcons();
}

function createBlogModal(blogId) {
    const data = blogData[blogId];
    if (!data) return;
    
    const color = blogId === 'science' ? 'blue' : blogId === 'social' ? 'green' : 'purple';
    
    const modalHTML = `
        <div class="modal-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 opacity-0">
            <div class="modal-content bg-paper crayon-border w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-95 blog-modal-content">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <div>
                            <h2 class="text-5xl font-bold text-gray-800">${data.title}</h2>
                            <p class="text-xl text-${color}-600 font-semibold mt-1">${data.subtitle}</p>
                        </div>
                        <button class="close-modal-btn p-1">
                            <i data-lucide="x" class="w-8 h-8 text-gray-500"></i>
                        </button>
                    </div>
                    <div class="flex flex-col md:flex-row gap-8 mb-8">
                        <div class="md:w-2/5">
                            <img src="${data.image}" alt="${data.title}" class="w-full h-64 object-cover crayon-border">
                        </div>
                        <div class="md:w-3/5">
                            <div class="prose max-w-none font-body text-gray-700">
                                ${data.content}
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-8">
                        <button class="close-blog-modal crayon-button bg-red-400 text-white font-bold px-8 py-4 text-xl">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    
    const container = document.getElementById('blog-modal-container');
    container.innerHTML = modalHTML;
    const overlay = container.querySelector('.modal-overlay');
    showModal(overlay);
    
    // Close modal handlers
    const closeBtn = container.querySelector('.close-modal-btn');
    const closeBlogBtn = container.querySelector('.close-blog-modal');
    
    closeBtn.addEventListener('click', () => closeModal(overlay));
    closeBlogBtn.addEventListener('click', () => closeModal(overlay));
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
