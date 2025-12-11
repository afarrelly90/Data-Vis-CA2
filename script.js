document.addEventListener("DOMContentLoaded", function() {
    // greeting based on time of day
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    let greetingText = 'Hello,';

    if (hour < 12) {
        greetingText = 'Good Morning,';
    } else if (hour < 18) {
        greetingText = 'Good Afternoon,';
    } else {
        greetingText = 'Good Evening,';
    }
    
    if (greeting) {
        greeting.innerText = greetingText;
    }
    // navbar scroll functionality
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const brandLink = document.querySelector(".navbar-brand");
    const updateScroll =() => {
        const scrollPos = window.scrollY + 120;
        let currentSectionId = "home"; 
        sections.forEach((sec) => {
            const top = sec.offsetTop - 140; 
            const bottom = top + sec.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        const pageHeight = document.body.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        if (window.scrollY + viewportHeight >= pageHeight - 5) {
            currentSectionId = 'contact';
        }

        if (window.scrollY < 10) { 
             currentSectionId = 'home';
        }
        navLinks.forEach(link => { link.classList.remove("active"); });
        brandLink.classList.remove("active"); 

        if (currentSectionId === 'home') {
            brandLink.classList.add('active'); 
        } else {
            navLinks.forEach((link) => {
                if (link.getAttribute("href") === `#${currentSectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    };
    // scroll reveal functionality
    window.addEventListener("scroll", updateScroll);
    window.dispatchEvent(new Event("scroll")); 
    const observerOptions = {
        root: null,
        rootMargin:'0px',
        threshold:.2
    };
    const observer = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const scrollObserver = new IntersectionObserver(observer,observerOptions);
    document.querySelectorAll('.scroll-reveal').forEach(element =>{
        scrollObserver.observe(element);
    });
});