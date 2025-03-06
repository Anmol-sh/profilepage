
// Tab switching functionality
document.addEventListener('DOMContentLoaded', function () {
    // Video background handling
    const video = document.getElementById('background-video');
    
    // Ensure video plays even if autoplay fails
    if (video) {
        video.play().catch(error => {
            console.log("Video autoplay failed:", error);
            // Add a play button as fallback if needed
        });
        
        // Pause video when not visible to save resources
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                video.pause();
            } else {
                video.play().catch(e => console.log("Could not resume video:", e));
            }
        });
    }
    
    const tabs = document.querySelectorAll('.section-tab');
    const sections = document.querySelectorAll('.section-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-section');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show correct section
            sections.forEach(section => {
                if (section.id === target) {
                    section.classList.add('active');
                    
                    // Auto-play achievements video when Achievements section is opened
                    if (target === 'achievements') {
                        const achievementsVideo = document.querySelector('.achievements-video video');
                        if (achievementsVideo) {
                            achievementsVideo.play().catch(error => {
                                console.log("Achievements video autoplay failed:", error);
                            });
                        }
                    }
                } else {
                    section.classList.remove('active');
                    
                    // Pause video when section is not visible
                    if (section.id === 'achievements') {
                        const achievementsVideo = document.querySelector('.achievements-video video');
                        if (achievementsVideo) {
                            achievementsVideo.pause();
                        }
                    }
                }
            });
        });
    });

    // Skills filtering
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillTags = document.querySelectorAll('.skill-tag');

    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const target = category.getAttribute('data-category');

            // Update active category
            skillCategories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');

            // Filter skills
            skillTags.forEach(tag => {
                if (target === 'all' || tag.getAttribute('data-category') === target) {
                    tag.style.display = 'inline-block';
                } else {
                    tag.style.display = 'none';
                }
            });
        });
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check
    checkScroll();

    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});
