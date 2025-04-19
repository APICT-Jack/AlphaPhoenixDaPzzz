// Portfolio Data
const portfolioItems = [
    {
        id: 1,
        title: "E-commerce Website",
        category: "web",
        description: "Complete online store with product management",
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 2,
        title: "Business Portfolio",
        category: "web",
        description: "Professional showcase for your work",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 3,
        title: "Urban Streetwear Collection",
        category: "clothing",
        description: "Modern urban clothing designs",
        price: "$29.99 - $59.99",
        image: "grls.png"
    },
    {
        id: 4,
        title: "Corporate Branding Package",
        category: "branding",
        description: "Complete brand identity solution",
        price: "$199.99",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
        id: 5,
        title: "Print T-Shirt Designs",
        category: "print",
        description: "Personalized t-shirt printing",
        price: "R124.99",
        image: "box.png"
    },
    {
        id: 7,
        title: "Print Cap Designs",
        category: "print",
        description: "Personalized t-shirt printing",
        price: "R124.99",
        image: "cap.png"
    },
    {
        id: 6,
        title: "Business Jeans Designs",
        category: "print",
        description: "Premium print templates",
        price: "$49.99",
        image: "jeans.png"
    },
    {
        id: 6,
        title: "Print Your owne Designs",
        category: "print",
        description: "Premium print templates",
        price: "$49.99",
        image: "ts-edited.jpg"
    },
    {
        id: 6,
        title: "Paint DM Jackat Designs",
        category: "print",
        description: "Premium print templates",
        price: "$49.99",
        image: "dj.jpg"
    },
    {
        id: 6,
        title: "Paint T-Shirt Designs",
        category: "print",
        description: "Premium print templates",
        price: "$49.99",
        image: "sbb.jpg"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load portfolio items
    loadPortfolioItems();
    
    // Panel navigation
    setupPanelNavigation();
    
    // Filter functionality
    setupFilters();
    
    // AI Assistant functionality
    setupAIAssistant();
    
    // Seller forms
    setupSellerForms();
    
    // Initialize animations
    initAnimations();
});

// Load portfolio items
function loadPortfolioItems(filter = 'all') {
    const grid = document.querySelector('.portfolio-grid');
    grid.innerHTML = '';
    
    const filteredItems = filter === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === filter);
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'portfolio-item animated';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-img">
            <div class="portfolio-info">
                <span class="category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="price">${item.price}</div>
                <a href="#" class="btn">View Details</a>
            </div>
        `;
        grid.appendChild(itemElement);
    });
}

// Panel navigation
function setupPanelNavigation() {
    document.querySelectorAll('.panel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.hasAttribute('data-section')) {
                // Remove active class from all buttons
                document.querySelectorAll('.panel-btn').forEach(b => b.classList.remove('active'));
                // Add active to clicked button
                this.classList.add('active');
                
                // Hide all sections
                document.querySelectorAll('.section-content').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show selected section
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).style.display = 'block';
            }
        });
    });
    
    // Activate the default section
    document.querySelector('.panel-btn.active').click();
}

// Filter functionality
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadPortfolioItems(this.dataset.filter);
        });
    });
}

// AI Assistant functionality
function setupAIAssistant() {
    const aiOptions = document.querySelectorAll('.ai-option');
    const chatMessages = document.getElementById('aiChatMessages');
    const userInput = document.getElementById('aiUserInput');
    const sendBtn = document.getElementById('aiSendBtn');
    const fileUpload = document.getElementById('fileUpload');
    
    let currentService = null;
    
    // Service selection
    aiOptions.forEach(option => {
        option.addEventListener('click', function() {
            aiOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentService = this.dataset.service;
            
            // Add service selection message
            addBotMessage(`Great! You've selected <strong>${this.querySelector('h3').textContent}</strong> assistance. How can I help you with this?`);
        });
    });
    
    // File upload
    document.querySelector('.attachment-btn').addEventListener('click', function() {
        fileUpload.click();
    });
    
    fileUpload.addEventListener('change', function() {
        if (this.files.length > 0) {
            addUserMessage(`Attachment: ${this.files[0].name}`);
            // In a real app, you would upload the file here
            setTimeout(() => {
                addBotMessage("I've received your file. How would you like me to use it?");
            }, 1000);
        }
    });
    
    // Send message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                if (!currentService) {
                    addBotMessage("Please select a service first so I can better assist you!");
                } else {
                    addBotMessage(getAIResponse(message, currentService));
                }
            }, 1000);
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Helper functions
    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollChatToBottom();
    }
    
    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        scrollChatToBottom();
    }
    
    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getAIResponse(message, service) {
        const responses = {
            'web-design': [
                "For website design, I recommend starting with a wireframe. Would you like me to generate some layout ideas?",
                "What's the primary goal of your website? (e.g., showcase work, sell products, generate leads)",
                "I can suggest color schemes based on your brand identity. Do you have existing brand colors?"
            ],
            'clothing-design': [
                "For clothing design, should we focus on t-shirts, hoodies, or other apparel?",
                "What style are you aiming for? (Streetwear, formal, casual, sporty)",
                "I can generate pattern ideas based on your preferences. What themes inspire you?"
            ],
            'branding': [
                "For branding, let's start with your company values and target audience.",
                "Would you like to see some logo concept ideas?",
                "What adjectives describe how you want your brand to be perceived?"
            ],
            'print': [
                "For print materials, what type of items do you need? (Business cards, flyers, banners)",
                "What's the primary message you want to communicate?",
                "Should we focus on minimalistic or bold designs for your print materials?"
            ]
        };
        
        const defaultResponses = [
            "I understand. Can you elaborate more on your requirements?",
            "That's an interesting approach. What specific features are important to you?",
            "Let me think about how we can implement that. Do you have any examples you like?"
        ];
        
        const serviceResponses = responses[service] || defaultResponses;
        return serviceResponses[Math.floor(Math.random() * serviceResponses.length)];
    }
}

// Seller forms
function setupSellerForms() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            authForms.forEach(form => form.style.display = 'none');
            document.getElementById(`${this.dataset.tab}Form`).style.display = 'block';
        });
    });
    
    // Form submission
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Registration submitted! We will review your application soon.');
        this.reset();
    });
    
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login successful! Redirecting to your dashboard...');
        this.reset();
    });
    
    // Google auth button
    document.querySelectorAll('.google-auth').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('In a real implementation, this would connect to Google OAuth');
        });
    });
}

// Initialize animations
function initAnimations() {
    document.querySelectorAll('.animated').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function animateOnScroll() {
        const elements = document.querySelectorAll('.animated:not(.visible)');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
}