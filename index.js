        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const mainNav = document.getElementById('mainNav');
        
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Course Filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                courseCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // Animated Counter for Stats
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        };
        
        // Fade-in Animation on Scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const checkFade = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };
        
        // Stats Counter Trigger
        let statsAnimated = false;
        
        const checkStats = () => {
            const statsSection = document.querySelector('.stats');
            const statsTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (!statsAnimated && statsTop < windowHeight - 100) {
                statNumbers.forEach(animateCounter);
                statsAnimated = true;
            }
        };
        
        // Initialize on load
        window.addEventListener('load', () => {
            checkFade();
            checkStats();
        });
        
        // Listen for scroll events
        window.addEventListener('scroll', () => {
            checkFade();
            checkStats();
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });