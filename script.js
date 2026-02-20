const projects = [
    {
        id: 1,
        title: "Hormoni",
        tags: ["Full-Stack Development", "Product Design", "Data Visualization"],
        description: "Building a PCOS wellness app with one partner. I personally designed and engineered the core cycle prediction engine and symptom tracking flow, focusing on turning complex health data into clear, actionable insights.",
        images: ["images/hormonisite.mp4"]
    },
    {
        id: 2,
        title: "MatrixMindz",
        tags: ["Data Analytics", "Growth Marketing", "Brand Identity"],
        description: "I led a top-to-bottom brand evolution for a financial consulting firm, standardizing their visual identity across all digital and sales assets. Pairing this with optimizing their content architecture and outreach funnels, I drove a 250% increase in engagement and a 35% lift in qualified leads.",
        images: ["images/mmf1.png", "images/mmf2.png", "images/mmf3.mp4", "images/mmf4.png", "images/mmf5.mp4", "images/mmf6.jpg", "images/mmf7.jpg"]
    },
    {
        id: 3,
        title: "SIFT",
        tags: ["Product Design", "UX Design", "User Research"],
        description: "I led design for an underground streetwear marketplace, working with one engineer to ship a scrolling feed web app and weekly email catalog. Our focus was spotlighting microbrands and independent designers before they hit the mainstream.",
        images: ["images/SIFT-inbox.png", "images/sift_feed1.png", "images/siftsocial.mp4",]
    },
    {
        id: 4,
        title: "OAKE",
        tags: ["Product Design", "Interaction Design", "Prototyping"],
        description: "I designed the MVP for an interactive hang tag experience, working with 2 engineers and another product designer. I designed the item onboarding flow and the post-scan interface that allowed shoppers to learn more about the history of a garment.",
        images: ["images/OAKEPrototype.mp4"]
    },
    {
        id: 5,
        title: "Ask Why I Run",
        tags: ["Brand Identity", "Social Design", "Graphic Design"],
        description: "I worked directly with the founders to execute a complete rebrand from scratch. I built the new visual identity and social media system to help scale their fundraising efforts.",
        images: ["images/awir1.png", "images/awir2.png", "images/awir3.jpg", "images/awir4.png"]
    },
    {
        id: 6,
        title: "Dodo Compositions",
        tags: ["Brand Identity", "Art Direction", "Social Design"],
        description: "I co-founded and designed a wellness brand for students, creating both physical goods (apparel, comfort objects) and the visual identity. I focused on art direction and graphic design to ensure a cohesive brand system.",
        images: ["images/dodo1.png", "images/dodo2.png", "images/dodo3.png", "images/dodo4.png", "images/dodo5.jpg", "images/dodo6.jpg", "images/dodo7.png", "images/dodo8.jpg"]
    }
];

// DOM Elements
const projectList = document.getElementById('projectList');
const projectDisplay = document.getElementById('projectDisplay');
const mobileOverlay = document.getElementById('mobileOverlay');
const overlayContent = document.getElementById('overlayContent');
const closeOverlayBtn = document.getElementById('closeOverlay');

// Global State
let activeProjectId = null;

// Initialize
function init() {
    renderProjectList();
    // Default right column is already static HTML (Intro View), so no action needed there initially
}

// Render the list of projects in the left column
function renderProjectList() {
    projects.forEach(project => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = 'project-btn';
        btn.textContent = project.title;
        btn.onclick = () => handleProjectClick(project.id);
        li.appendChild(btn);
        projectList.appendChild(li);
    });
}

// Handle project selection
function handleProjectClick(id) {
    activeProjectId = id;

    // Update active state in list
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === projects.find(p => p.id === id).title) {
            btn.classList.add('active');
        }
    });

    const project = projects.find(p => p.id === id);
    const htmlContent = generateProjectHTML(project);

    // Check viewport width to decide where to render
    if (window.innerWidth <= 1024) {
        // Mobile: Show Overlay
        overlayContent.innerHTML = htmlContent;
        openMobileOverlay();
    } else {
        // Desktop: Update Right Column
        projectDisplay.innerHTML = htmlContent;
        // Show static close button on desktop
        const btn = document.getElementById('static-close-btn');
        if (btn) btn.style.display = 'block';
    }
}

// Generate the HTML for a project detail view
function generateProjectHTML(project) {
    const imagesHTML = project.images.map(img => {
        if (img.endsWith('.mp4')) {
            return `
                <div class="carousel-item">
                    <video autoplay loop muted playsinline>
                        <source src="${img}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        }
        return `
            <div class="carousel-item">
                <img src="${img}" alt="${project.title} screenshot" loading="lazy">
            </div>
        `;
    }).join('');

    return `
        <article class="project-detail">
            <header class="project-header">
                <h2 class="project-title">${project.title}</h2>
                <div class="tag-container">
                    ${(project.tags || [project.category]).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </header>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="carousel">
                ${imagesHTML}
            </div>
        </article>
    `;
}

function resetToHome() {
    activeProjectId = null;

    // Reset active buttons
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.classList.remove('active');
        // Reset transform/color if handled via CSS transition on .active removal
    });

    // Restore Welcome Message
    if (window.innerWidth > 1024) {
        projectDisplay.innerHTML = `
            <div class="intro-view">
                <div class="welcome-msg">
                    <h3>Welcome.</h3>
                    <p>Select a project from the left to view details.</p>
                </div>
            </div>
        `;
        // Hide static close button
        const btn = document.getElementById('static-close-btn');
        if (btn) btn.style.display = 'none';
    } else {
        closeMobileOverlay();
    }
}

// Mobile Overlay Logic
function openMobileOverlay() {
    mobileOverlay.classList.remove('hidden'); // Ensure it's display block (css handles this based on active class usually, but let's be safe)
    // Small delay to allow transition if using class-based transition
    requestAnimationFrame(() => {
        mobileOverlay.classList.add('active');
    });
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileOverlay() {
    mobileOverlay.classList.remove('active');
    document.querySelectorAll('.project-btn').forEach(btn => btn.classList.remove('active'));
    setTimeout(() => {
        // Optional: clear content or set hidden if using display:none
        document.body.style.overflow = '';
    }, 300); // Match CSS transition duration
}

closeOverlayBtn.addEventListener('click', closeMobileOverlay);

// Handle resize events to reset view if needed
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && activeProjectId) {
        // If resizing to desktop and a project is active, ensure it's shown in right column
        // And close overlay if open
        const project = projects.find(p => p.id === activeProjectId);
        if (projectDisplay.innerHTML.includes('intro-view') && project) {
            projectDisplay.innerHTML = generateProjectHTML(project);
        }
        if (mobileOverlay.classList.contains('active')) {
            closeMobileOverlay();
        }
    }
});


init();
