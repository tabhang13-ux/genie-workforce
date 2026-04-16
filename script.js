// 1. Data Store
const hotWishes = [
    { title: "Pune Cyclothon 2026", location: "pune", role: "NEED 100 BOYS & GIRLS", date: "12-04-2026" },
    { title: "India Fastener Show", location: "Pune", role: "Registration", date: "09-04-2026" },
    { title: "Tech Expo Mumbai", location: "Mumbai", role: "Stall Helper", date: "15-04-2026" }
];

const WHATSAPP_LINK = "https://chat.whatsapp.com/HD8u974mB4TLuOBROBMsWw";
let isLoggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    loadWishes('wishes-container', hotWishes);
    setupNavigation();
    setupSearch();
    setupPostForm();
});

// 2. Navigation Logic
function showSection(sectionId) {
    const sections = ['home-view', 'search-view', 'how-view', 'faq-view', 'login-view', 'admin-view'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === sectionId) ? 'block' : 'none';
    });
    window.scrollTo(0, 0);
}

function setupNavigation() {
    document.querySelectorAll('.nav-links a, .btn-login').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.innerText.toLowerCase();
            
            if (text.includes('home')) showSection('home-view');
            else if (text.includes('how')) showSection('how-view');
            else if (text.includes('faq')) showSection('faq-view');
            else if (text.includes('login')) {
                // Redirect to Admin panel if already logged in, otherwise show login
                isLoggedIn ? showSection('admin-view') : showSection('login-view');
            }
        });
    });
    document.querySelector('.logo').onclick = () => showSection('home-view');
}

// 3. Login Simulation
// Function to handle the login button
function handleLogin(event) {
    event.preventDefault();

    const user = document.getElementById('loginUser').value;
    const mobile = document.getElementById('loginMobile').value;
    const pass = document.getElementById('loginPass').value;

    // Validate mobile number length
    if (mobile.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // If valid, "Log in" the user
    isLoggedIn = true;
    alert(`Welcome ${user}! You can now post new wishes.`);
    
    // Switch to the Post Wish form (admin-view)
    showSection('admin-view');
}

// Function to handle adding the wish to the list
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postWishForm');
    if (postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Create new wish object
            const newWish = {
                title: document.getElementById('wishTitle').value,
                location: document.getElementById('wishLocation').value,
                role: document.getElementById('wishRole').value,
                date: document.getElementById('wishDate').value
            };

            // 1. Add to the data array
            hotWishes.unshift(newWish);

            // 2. Update the UI on the home page
            loadWishes('wishes-container', hotWishes);

            // 3. Reset and redirect
            postForm.reset();
            alert("Wish posted successfully!");
            showSection('home-view');
        });
    }
});

// 4. Posting Logic (The "Add into hotWishes" part)
function setupPostForm() {
    const form = document.getElementById('postWishForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capture Form Data
        const newWish = {
            title: document.getElementById('wishTitle').value,
            location: document.getElementById('wishLocation').value,
            role: document.getElementById('wishRole').value,
            date: document.getElementById('wishDate').value
        };

        // Add to Array
        hotWishes.unshift(newWish); // unshift adds to the beginning

        // Refresh UI
        loadWishes('wishes-container', hotWishes);
        
        // Reset Form and Redirect
        form.reset();
        alert("Wish Posted Successfully!");
        showSection('home-view');
    });
}

// 5. Core Display Functions
function loadWishes(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    data.forEach((wish) => {
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
            <div>
                <h4>${wish.title || "Untitled Event"}</h4>
                <p><strong>Role:</strong> ${wish.role}</p>
                <p>${wish.location} | ${wish.date}</p>
            </div>
            <button onclick="openInterestModal('${wish.title}')">Show Interest</button>
        `;
        container.appendChild(card);
    });
}

function setupSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = hotWishes.filter(w => 
            w.title.toLowerCase().includes(query) || 
            w.location.toLowerCase().includes(query)
        );
        loadWishes('search-results', filtered);
    });
}

function openInterestModal(title) {
    let modal = document.getElementById('interestModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'interestModal';
        modal.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:10000;";
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = `
        <div style="background:white; padding:30px; border-radius:10px; text-align:center; max-width:400px; color: #333;">
            <h3>Interested in ${title}?</h3>
            <p>Join our coordination group to get selected.</p>
            <a href="${WHATSAPP_LINK}" target="_blank" style="display:block; background:#25D366; color:white; padding:12px; margin:15px 0; text-decoration:none; font-weight:bold; border-radius:5px;">Join WhatsApp Group</a>
            <button onclick="document.getElementById('interestModal').style.display='none'" style="background:#eee; border:none; padding:10px; cursor:pointer; width:100%;">Cancel</button>
        </div>
    `;
    modal.style.display = 'flex';
}