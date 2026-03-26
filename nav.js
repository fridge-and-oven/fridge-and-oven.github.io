function addNavTool() {
    const navHTML = `
<nav class="top-brand-bar">
        <div class="container">
            <a href="index.html" class="nav-brand-logo">FRIDGE AND OVEN</a>
            <div class="nav-links">
                <a href="index.html">HOME</a>
                <a href="our-cakes-edited.html">CAKESS</a>
                <a href="workshop.html">WORKSHOPS</a>
            </div>
        </div>
    </nav>
    `;
    
    const navElement = document.getElementById('navtool');
    if (navElement) {
        navElement.innerHTML = navHTML;
        
        // ตรวจสอบหน้าปัจจุบันเพื่อเติม class 'active'
        const currentPage = window.location.pathname;
        if (currentPage.includes("instructors.html")) {
            document.getElementById("nav-instructors").classList.add("active");
        }
    }
}