document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); 
    

    const name= document.getElementById("name").value.trim();
    const email= document.getElementById("Email").value.trim();
    const password=document.getElementById("password").value;
    const confirm=document.getElementById("confirm").value;

    if(! name|| !email || !password || !confirm) {
        alert("Chưa Điền Đầy Đủ Thông Tin! Vui lòng đầy đủ thông tin.");
        return;
    }

    if(password !== confirm) {
        alert("Mật Khẩu Không Khớp! Mời Nhập Lại!");
        return;
    }
    const users=JSON.parse(localStorage.getItem("users")||"[]");


const emailExists = users.some(user => user.email === email);
if (emailExists) {
    alert("Email này đã được đăng ký.");
    return;
}
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng Ký Thành Công!");
    window.location.href="login.html";

});;