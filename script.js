// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initMusicPlayer();
    initContactForm();
    initLoadingAnimation();
    initSearchForm();
    initBackToTop();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loading');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .music-card, .beat-card, .team-member').forEach(el => {
        observer.observe(el);
    });
}

// Music Player Functionality
function initMusicPlayer() {
    // Play button functionality
    document.querySelectorAll('.play-btn, .control-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active state from all buttons
            document.querySelectorAll('.play-btn, .control-btn').forEach(b => {
                b.classList.remove('playing');
                if (b.querySelector('i')) {
                    b.querySelector('i').classList.remove('fa-pause');
                    b.querySelector('i').classList.add('fa-play');
                }
            });
            
            // Toggle current button
            if (this.classList.contains('playing')) {
                this.classList.remove('playing');
                if (this.querySelector('i')) {
                    this.querySelector('i').classList.remove('fa-pause');
                    this.querySelector('i').classList.add('fa-play');
                }
            } else {
                this.classList.add('playing');
                if (this.querySelector('i')) {
                    this.querySelector('i').classList.remove('fa-play');
                    this.querySelector('i').classList.add('fa-pause');
                }
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Heart/Like button functionality
    document.querySelectorAll('.control-btn').forEach(btn => {
        if (btn.querySelector('.fa-heart')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const heartIcon = this.querySelector('.fa-heart');
                
                if (heartIcon.classList.contains('fas')) {
                    heartIcon.classList.remove('fas');
                    heartIcon.classList.add('far');
                    this.style.color = '#ffffff';
                } else {
                    heartIcon.classList.remove('far');
                    heartIcon.classList.add('fas');
                    this.style.color = '#ff6b6b';
                }
            });
        }
    });
    
    // Buy Now buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.textContent.includes('Buy Now') || btn.textContent.includes('Preview')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Add loading state
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                this.disabled = true;
                
                // Simulate processing
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // Show success message
                    showNotification(
                        originalText.includes('Buy') ? 'Purchase successful!' : 'Preview started!',
                        'success'
                    );
                }, 2000);
            });
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validate form
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00d4ff, #0099cc)' : 'linear-gradient(135deg, #ff6b6b, #ff5252)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading Animation
function initLoadingAnimation() {
    // Add loading class to elements as they come into view
    const elements = document.querySelectorAll('section, .music-card, .beat-card, .team-member');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loading');
        }, index * 100);
    });
}

// Search Form Functionality
function initSearchForm() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    // Sample data for search
    const searchData = [
        { type: 'beat', title: 'Hip Hop Beat #1', artist: 'DJ MixMaster', category: 'Hip Hop', price: '$29.99' },
        { type: 'beat', title: 'Trap Beat #2', artist: 'BeatMaker Pro', category: 'Trap', price: '$24.99' },
        { type: 'beat', title: 'R&B Vibes', artist: 'SoulBeats', category: 'R&B', price: '$19.99' },
        { type: 'beat', title: 'Premium Hip Hop Beat', artist: 'Urban Sounds', category: 'Hip Hop', price: '$29.99' },
        { type: 'beat', title: 'Melodic Trap Beat', artist: 'MelodyMaker', category: 'Trap', price: '$24.99' },
        { type: 'beat', title: 'Chill Lo-Fi Beat', artist: 'ChillVibes', category: 'Lo-Fi', price: '$19.99' },
        { type: 'artist', title: 'DJ MixMaster', artist: 'Producer', category: 'Hip Hop Specialist', price: '' },
        { type: 'artist', title: 'BeatMaker Pro', artist: 'Producer', category: 'Trap & Hip Hop', price: '' },
        { type: 'artist', title: 'SoulBeats', artist: 'Producer', category: 'R&B & Soul', price: '' },
        { type: 'genre', title: 'Hip Hop', artist: '15 beats available', category: 'Genre', price: '' },
        { type: 'genre', title: 'Trap', artist: '12 beats available', category: 'Genre', price: '' },
        { type: 'genre', title: 'R&B', artist: '8 beats available', category: 'Genre', price: '' },
        { type: 'genre', title: 'Lo-Fi', artist: '6 beats available', category: 'Genre', price: '' }
    ];
    
    if (searchForm && searchInput && searchResults) {
        // Search input event listener
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length === 0) {
                hideSearchResults();
                return;
            }
            
            if (query.length >= 2) {
                performSearch(query, searchData);
            }
        });
        
        // Form submit handler
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                showNotification(`Searching for "${query}"...`, 'success');
                searchInput.blur();
            }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchForm.contains(e.target)) {
                hideSearchResults();
            }
        });
    }
    
    function performSearch(query, data) {
        const results = data.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.artist.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
        
        displaySearchResults(results, query);
    }
    
    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search" style="margin-bottom: 10px; font-size: 2rem; color: #666;"></i>
                    <p>No results found for "${query}"</p>
                    <p style="font-size: 0.8rem; margin-top: 5px;">Try searching for beats, artists, or genres</p>
                </div>
            `;
        } else {
            // Group results by type
            const groupedResults = {
                beats: results.filter(r => r.type === 'beat'),
                artists: results.filter(r => r.type === 'artist'),
                genres: results.filter(r => r.type === 'genre')
            };
            
            let html = '';
            
            // Display beats
            if (groupedResults.beats.length > 0) {
                html += '<div class="search-category">Beats</div>';
                groupedResults.beats.forEach(item => {
                    html += createSearchResultItem(item, 'fa-music');
                });
            }
            
            // Display artists
            if (groupedResults.artists.length > 0) {
                html += '<div class="search-category">Artists</div>';
                groupedResults.artists.forEach(item => {
                    html += createSearchResultItem(item, 'fa-user');
                });
            }
            
            // Display genres
            if (groupedResults.genres.length > 0) {
                html += '<div class="search-category">Genres</div>';
                groupedResults.genres.forEach(item => {
                    html += createSearchResultItem(item, 'fa-tags');
                });
            }
            
            searchResults.innerHTML = html;
            
            // Add click handlers to results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const title = this.querySelector('h4').textContent;
                    const type = this.dataset.type;
                    
                    searchInput.value = title;
                    hideSearchResults();
                    
                    // Show action based on type
                    if (type === 'beat') {
                        showNotification(`Opening "${title}"...`, 'success');
                        setTimeout(() => {
                            document.querySelector('#buy').scrollIntoView({ behavior: 'smooth' });
                        }, 1000);
                    } else if (type === 'artist') {
                        showNotification(`Viewing ${title}'s profile...`, 'success');
                        setTimeout(() => {
                            document.querySelector('#team').scrollIntoView({ behavior: 'smooth' });
                        }, 1000);
                    } else if (type === 'genre') {
                        showNotification(`Browsing ${title} beats...`, 'success');
                        setTimeout(() => {
                            document.querySelector('#stream').scrollIntoView({ behavior: 'smooth' });
                        }, 1000);
                    }
                });
            });
        }
        
        showSearchResults();
    }
    
    function createSearchResultItem(item, iconClass) {
        return `
            <div class="search-result-item" data-type="${item.type}">
                <div class="search-result-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="search-result-info">
                    <h4>${item.title}</h4>
                    <p>${item.artist}${item.price ? ' • ' + item.price : ''}</p>
                </div>
            </div>
        `;
    }
    
    function showSearchResults() {
        searchResults.classList.add('show');
    }
    
    function hideSearchResults() {
        searchResults.classList.remove('show');
    }
}

// Back to Top Button Functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'translateY(-2px) scale(0.95)';
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset button transform
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Optional: Show notification
            showNotification('Scrolled to top!', 'success');
        });
        
        // Add keyboard support (Enter and Space)
        backToTopBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus styles for accessibility
        backToTopBtn.addEventListener('focus', function() {
            this.style.outline = '2px solid #00d4ff';
            this.style.outlineOffset = '2px';
        });
        
        backToTopBtn.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    }
}

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95))';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #1a1a2e, #16213e)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Active Navigation Link
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Music Wave Animation Enhancement
function enhanceMusicWave() {
    const waveBars = document.querySelectorAll('.wave-bar');
    
    setInterval(() => {
        waveBars.forEach((bar, index) => {
            const randomHeight = Math.random() * 150 + 50;
            bar.style.height = randomHeight + 'px';
        });
    }, 1500);
}

// Initialize enhanced music wave after DOM load
setTimeout(enhanceMusicWave, 1000);

// Preload Images (if any are added later)
function preloadImages() {
    const imageUrls = [
        // Add any image URLs here when images are added
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Call preload function
preloadImages();