document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Floating Navigation
    const nav = document.querySelector('.floating-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Café Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-rotate slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = [
        { category: 'web', title: 'E-commerce Website', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { category: 'brand', title: 'Coffee Brand', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { category: 'apparel', title: 'Streetwear Collection', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { category: 'print', title: 'Business Cards', image: 'https://images.unsplash.com/photo-1544931170-3ca1337cce88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { category: 'web', title: 'Portfolio Website', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
        { category: 'brand', title: 'Restaurant Branding', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' }
    ];
    
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function loadPortfolioItems(filter = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);
        
        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="portfolio-img">
                <div class="portfolio-overlay">
                    <h3 class="portfolio-title">${item.title}</h3>
                    <span class="portfolio-category">${item.category}</span>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadPortfolioItems(this.dataset.filter);
        });
    });
    
    // Load initial portfolio items
    loadPortfolioItems();

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        console.log({ name, email, service, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .section-header, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .section-header, .portfolio-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});
// Add to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Chatbot elements
    const robotHead = document.getElementById('robotHead');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.querySelector('.close-chat');
    const chatMessages = document.getElementById('chatMessages');
    const userMessageInput = document.getElementById('userMessage');
    const sendMessageBtn = document.getElementById('sendMessage');
    
    // Toggle chat visibility
    robotHead.addEventListener('click', function() {
        chatContainer.style.display = 'flex';
        this.style.transform = 'scale(0)';
        setTimeout(() => {
            this.style.display = 'none';
        }, 300);
    });
    
    closeChat.addEventListener('click', function() {
        chatContainer.style.display = 'none';
        robotHead.style.display = 'flex';
        setTimeout(() => {
            robotHead.style.transform = 'scale(1)';
        }, 10);
    });
    
    // Ollama API integration
    async function sendMessageToOllama(message) {
        try {
            // Replace with your Ollama API endpoint
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'your-model-name', // e.g., 'llama2', 'mistral'
                    messages: [
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    stream: false
                })
            });
            
            const data = await response.json();
            return data.message.content;
        } catch (error) {
            console.error('Error communicating with Ollama:', error);
            return "Sorry, I'm having trouble connecting to the AI service.";
        }
    }
    
    // Add message to chat
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Send message handler
    async function handleSendMessage() {
        const message = userMessageInput.value.trim();
        if (message) {
            addMessage(message, true);
            userMessageInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot-message');
            typingIndicator.textContent = '...';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Get AI response
            const aiResponse = await sendMessageToOllama(message);
            
            // Remove typing indicator and show response
            chatMessages.removeChild(typingIndicator);
            addMessage(aiResponse, false);
        }
    }
    
    // Event listeners for sending messages
    sendMessageBtn.addEventListener('click', handleSendMessage);
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Initial greeting
    setTimeout(() => {
        addMessage("Hello! I'm DaPzzz AI Assistant. How can I help you today?", false);
    }, 1000);
});
// Enhanced robot head behavior
const robotHead = document.getElementById('robotHead');

// Show "Click Me" permanently after 5 seconds
setTimeout(() => {
    robotHead.classList.add('loaded');
}, 5000);

// Make head more animated when chat is available
robotHead.addEventListener('mouseenter', () => {
    robotHead.classList.add('active');
});

robotHead.addEventListener('mouseleave', () => {
    robotHead.classList.remove('active');
});

// Add this to your existing chat toggle code
robotHead.addEventListener('click', function() {
    this.classList.remove('active');
    // ... rest of your existing click handler
});