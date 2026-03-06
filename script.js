document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SPLASH SCREEN LOGIC ---
    const splash = document.getElementById('splash-screen');
    const helloText = document.querySelector('.hello-text');
    const greetings = ["Hello", "Hola", "Bonjour", "Konnichiwa", "Kamusta"];
    let index = 0;

    // Optional: Cycle through languages before fading out
    const greetingInterval = setInterval(() => {
        if (index < greetings.length) {
            helloText.textContent = greetings[index];
            index++;
        } else {
            clearInterval(greetingInterval);
        }
    }, 300);

    // Hide splash screen after 2.5 seconds
    setTimeout(() => {
        splash.classList.add('fade-out');
        // Allow scrolling once intro is done
        document.body.style.overflowY = "auto"; 
    }, 2500);


    // --- 2. SCROLL REVEAL LOGIC ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Stop observing once the element has appeared
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));


    // --- 3. STATS COUNTER ANIMATION ---
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target.querySelector('h2');
                const endValue = parseInt(target.innerText);
                animateValue(target, 0, endValue, 1500);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".stat-item").forEach((el) => statsObserver.observe(el));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});