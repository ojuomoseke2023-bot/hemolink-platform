document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Mobile Navigation System Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
            const icon = mobileMenuBtn.querySelector("i");
            if (mobileMenu.classList.contains("hidden")) {
                icon.setAttribute("data-lucide", "menu");
            } else {
                icon.setAttribute("data-lucide", "x");
            }
            lucide.createIcons();
        });
    }

    // 3. Scroll Reveal Engine
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.88;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger instantly on layout paint

    // 4. Smooth Counter Statistics Animation
    const counters = document.querySelectorAll(".counter");
    let counterTriggered = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const duration = 2000; // Total count up milliseconds
            const increment = target / (duration / 16); // ~60fps smooth step calculation

            const updateCount = () => {
                const current = +counter.innerText;
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 16);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    };

    // Trigger counters when dashboard section rolls into view
    const dashboardSection = document.getElementById("dashboard");
    if (dashboardSection) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counterTriggered) {
                counterTriggered = true;
                startCounters();
            }
        }, { threshold: 0.2 });
        obs.observe(dashboardSection);
    }

    // 5. Simulated Real-time AI Matching Log Feed Ticker
    const aiLogBox = document.getElementById("ai-logs");
    if (aiLogBox) {
        const mockLogSequences = [
            { text: "[OPTIMIZATION] System vector re-calculating geometric load...", color: "text-gray-500" },
            { text: "[NODE-UPDATE] St. Jude Center reports O+ storage capacity at 92%", color: "text-gray-400" },
            { text: "[AI MATCH] Cross-compatibility correlation matrix verification active...", color: "text-emerald-400" },
            { text: "[DISPATCH] Route parameters assigned to cold-chain delivery drone Group B", color: "text-medRed" },
            { text: "[INVENTORY] Autonomous updates complete for region coordinate (40.7, -74.0)", color: "text-white" }
        ];

        setInterval(() => {
            const randomLog = mockLogSequences[Math.floor(Math.random() * mockLogSequences.length)];
            const logElement = document.createElement("div");
            logElement.className = `${randomLog.color} transform translate-y-2 opacity-0 transition-all duration-300`;
            logElement.innerText = randomLog.text;
            
            aiLogBox.appendChild(logElement);
            if (aiLogBox.children.length > 6) {
                aiLogBox.removeChild(aiLogBox.children[0]);
            }

            setTimeout(() => {
                logElement.classList.remove("opacity-0", "translate-y-2");
            }, 50);
        }, 3200);
    }

    // 6. Interactive FAQ Accordion Mechanism
    const faqToggles = document.querySelectorAll(".faq-toggle");
    faqToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const container = toggle.parentElement;
            const content = container.querySelector(".faq-content");
            const icon = toggle.querySelector("i");
            
            if (content.style.maxHeight && content.style.maxHeight !== "0px") {
                content.style.maxHeight = "0px";
                icon.style.transform = "rotate(0deg)";
                icon.setAttribute("data-lucide", "plus");
            } else {
                // Close others
                document.querySelectorAll(".faq-content").forEach(c => c.style.maxHeight = "0px");
                document.querySelectorAll(".faq-toggle i").forEach(i => {
                    i.style.transform = "rotate(0deg)";
                    i.setAttribute("data-lucide", "plus");
                });

                content.style.maxHeight = content.scrollHeight + "px";
                icon.style.transform = "rotate(45deg)";
                icon.setAttribute("data-lucide", "plus");
            }
            lucide.createIcons();
        });
    });

    // 7. Simulated Portal Submissions (Donor, Requests & Contact)
    const handleFormSubmit = (formId, successMessage) => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                alert(`[SECURE PIPELINE DISPATCH]: ${successMessage}`);
                form.reset();
            });
        }
    };

    handleFormSubmit("donor-form", "Donor registration securely ingested into HIPAA encrypted ledger node.");
    handleFormSubmit("request-form", "Emergency operational request dispatched to matching vector matrix. Tracking sequence live.");
    handleFormSubmit("contact-form", "Infrastructure deployment inquiry routed to technical systems team.");
});
                               
