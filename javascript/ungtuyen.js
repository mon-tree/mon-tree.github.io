document.getElementById('btnChooseCV').addEventListener('click', function () {
    document.getElementById('cvFile').click();
});

document.getElementById('cvFile').addEventListener('change', function () {
    let fileName = this.files.length ? this.files[0].name : "";
    document.getElementById('fileName').textContent = fileName ? `Đã chọn: ${fileName}` : "";
});

document.getElementById('cvForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để nộp hồ sơ!");
        window.location.href = "login.html";
        return;
    }

    let fullname = document.getElementById('fullname').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let cvFile = document.getElementById('cvFile').files.length;

    if (!fullname || !email || !phone || !cvFile) {
        alert("Vui lòng nhập đầy đủ thông tin và chọn CV!");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get("job");
    let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    if (!appliedJobs.includes(jobTitle)) {
        appliedJobs.push(jobTitle);
        localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    }

    localStorage.setItem("cvSubmitted", "true");

    alert("Ứng tuyển thành công!");
    window.location.href = "index.html";
    document.getElementById("submitBtn").textContent = "Đã nộp hồ sơ";
    document.getElementById("submitBtn").disabled = true;

});


window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("cvSubmitted") === "true") {
        let submitBtn = document.getElementById("submitBtn");
        submitBtn.textContent = "Đã nộp hồ sơ";
        submitBtn.disabled = true;
    }
});
