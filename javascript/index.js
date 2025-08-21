window.addEventListener("DOMContentLoaded", function() {
    const user= JSON.parse(localStorage.getItem("currentUser")); 
    const nav= document.querySelector(".nav-buttons");

    if (user && nav) {
        
        nav.innerHTML=`
        <span>Xin chào, ${user.name}! </span>
        <button onclick="logout()"> Đăng Xuất </button>
        `;
    }
});
function logout() {
        localStorage.removeItem("currentUser"); 
        window.location.reload(); 
        localStorage.setItem("isLoggedIn", false);
        alert("Đăng Xuất Thành Công!");
    }
        
