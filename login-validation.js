// Validate login
function validate_login() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let input_response = document.querySelector(".input-response");

    if (username.value === "admin" && password.value === "admin") {
        input_response.innerHTML = "<p style='color:green;'>Login successful!</p>";
        setTimeout(() => {
            window.location.href = "manual.html";
        }, 1000);
    } else {
        input_response.innerHTML = "<p style='color:red;'>Wrong username or password</p>";
    }
}

// Global state
let logData = [];
let currentPage = 1;
const itemsPerPage = 4;

// Handle file upload
function handleUpload() {
    const fileInput = document.getElementById("fileUpload");
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const lines = e.target.result.split("\n").filter(l => l.trim() !== "");
            logData = lines; // store raw lines
            currentPage = 1;
            renderCards();
            renderPagination();
        };
        reader.readAsText(fileInput.files[0]);
    }
}

// Render cards
function renderCards() {
    const logCards = document.getElementById("logCards");
    logCards.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = logData.slice(start, end);

    pageData.forEach((line, index) => {
        const card = document.createElement("div");
        card.className = "json-card";
        card.innerHTML = `
            <span style="color:lightgray;">Line ${start + index + 1}:</span>
            <pre>${line}</pre>
        `;
        logCards.appendChild(card);
    });
}

// Pagination
function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(logData.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.onclick = () => {
            currentPage = i;
            renderCards();
        };
        pagination.appendChild(btn);
    }
}

// Search
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", () => {
            const query = searchBar.value.toLowerCase();
            const filtered = logData.filter(line =>
                line.toLowerCase().includes(query)
            );
            const logCards = document.getElementById("logCards");
            logCards.innerHTML = "";

            filtered.forEach((line, index) => {
                const card = document.createElement("div");
                card.className = "json-card";
                card.innerHTML = `
                    <span style="color:lightgray;">Match ${index + 1}:</span>
                    <pre>${line}</pre>
                `;
                logCards.appendChild(card);
            });
        });
    }
});

