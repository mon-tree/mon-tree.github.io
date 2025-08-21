document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const loginInput = document.querySelector("input[placeholder='Nhập Email']").value.trim();
    const password = document.querySelector("input[placeholder='Nhập Mật Khẩu']").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    let foundUser = null;

    for (let username in users) {
        const user = users[username];
        if (user.email === loginInput && user.password === password) {
            foundUser = user;   
            break;
        }
    }

    if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        localStorage.setItem('isLoggedIn', 'true');
        alert("Đăng Nhập Thành Công!");
        window.location.href = "index.html";
    } else {
        const isRegister = confirm("Tài khoản không tồn tại hoặc sai mật khẩu.\nBạn có muốn đăng ký tài khoản mới không?");
        if (isRegister) {
            window.location.href = "register.html";
        }
    }
});
