// Hàm xóa dấu tiếng Việt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}



const jobData = [
  { title: "Lập trình viên Frontend", province: "Hồ Chí Minh", career: "IT", salary: 20000000 },
  { title: "Kế toán viên", province: "Hà Nội", career: "Kế toán", salary: 9000000 },
  { title: "Giáo viên Toán", province: "Đà Nẵng", career: "Giáo dục", salary: 8500000 },
  { title: "Chuyên viên Marketing", province: "Hồ Chí Minh", career: "Marketing", salary: 32000000 },
  { title: "Kỹ sư xây dựng", province: "Cần Thơ", career: "Xây dựng", salary: 22000000 },
  { title: "Backend Developer", province: "Hồ Chí Minh", career: "IT", salary: 20000000 },
  { title: "Luật sư tư vấn", province: "Hà Nội", career: "Luật", salary: 35000000 },
  { title: "Y tá điều dưỡng", province: "Đà Nẵng", career: "Y tế", salary: 14000000 },
  { title: "Chuyên viên Nhân sự", province: "Hồ Chí Minh", career: "Nhân sự", salary: 16000000 },
  { title: "Giao dịch viên", province: "Cần Thơ", career: "Ngân hàng", salary: 17000000 },
  { title: "Lập trình viên Mobile", province: "Hà Nội", career: "IT", salary: 20000000 },
  { title: "Kế toán trưởng", province: "Đà Nẵng", career: "Kế toán", salary: 31000000 },
  { title: "Giáo viên Tiếng Anh", province: "Cần Thơ", career: "Giáo dục", salary: 8000000 },
  { title: "Kỹ sư giám sát", province: "Hồ Chí Minh", career: "Xây dựng", salary: 22000000 },
  { title: "Chuyên viên pháp chế", province: "Đà Nẵng", career: "Luật", salary: 35000000 },
  { title: "Bác sĩ đa khoa", province: "Hồ Chí Minh", career: "Y tế", salary: 30000000 },
  { title: "Trưởng phòng Nhân sự", province: "Hà Nội", career: "Nhân sự", salary: 34000000 },
  { title: "Nhân viên tín dụng", province: "Đà Nẵng", career: "Ngân hàng", salary: 9500000 },
  { title: "DevOps Engineer", province: "Cần Thơ", career: "IT", salary: 36000000 },
];

let selectedCareer = null;

function searchJobs() {
  const province = (document.getElementById("provinceSelect") || {}).value || "Tất cả";
  const keywordRaw = (document.getElementById("jobInput") || {}).value || "";
  const keyword = removeVietnameseTones(keywordRaw.toLowerCase());

  const salaryEl = document.getElementById("salarySelect");
  const salaryValue = salaryEl ? salaryEl.value : "Tất cả";

  let minSalary = 0;
  let maxSalary = Infinity;

  // Chuyển option thành khoảng lương
  if (salaryValue === "Dưới 10 triệu") {
    minSalary = 0; maxSalary = 10000000;
  } else if (salaryValue === "Từ 10 - 20 triệu") {
    minSalary = 10000000; maxSalary = 20000000;
  } else if (salaryValue === "Từ 20 - 30 triệu") {
    minSalary = 20000000; maxSalary = 30000000;
  } else if (salaryValue === "Trên 30 triệu") {
    minSalary = 30000000; maxSalary = Infinity;
  }

  const results = jobData.filter((job) => {
    const jobTitle = removeVietnameseTones(job.title.toLowerCase());
    const matchKeyword = jobTitle.includes(keyword);
    const matchProvince = province === "Tất cả" || job.province === province;
    const matchCareer =
      selectedCareer === null || selectedCareer === "Tất cả"
        ? true
        : job.career === selectedCareer;

    const matchSalary = job.salary >= minSalary && job.salary <= maxSalary;
    return matchKeyword && matchProvince && matchCareer && matchSalary;
  });

  displayResults(results);
  saveSearchHistory(keywordRaw);
}

function selectCareer(career) {
  selectedCareer = career;

  const items = document.querySelectorAll(".career-item");
  items.forEach(item => item.classList.remove("active"));

  const selected = Array.from(items).find(i => i.textContent.trim() === career);
  if (selected) selected.classList.add("active");

  searchJobs();
}

function displayResults(jobs) {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) return;
  resultsDiv.innerHTML = "";

  if (!Array.isArray(jobs) || jobs.length === 0) {
    resultsDiv.innerHTML = "<p>Không tìm thấy công việc phù hợp.</p>";
    return;
  }

  const uniqueJobs = jobs.filter((job, index, self) =>
    index === self.findIndex((j) =>
      String(j.title) === String(job.title) &&
      String(j.province) === String(job.province) &&
      String(j.career) === String(job.career)
    )
  );

  const jobListDiv = document.createElement("div");
  jobListDiv.className = "job-list";

  uniqueJobs.forEach((job) => {
    const jobDiv = document.createElement("div");
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    let isApplied = appliedJobs.includes(job.title);
    jobDiv.className = "job-item";
    jobDiv.innerHTML = `
  <div class="job-info">
    <strong>${escapeHtml(job.title)}</strong><br>
    <em>${escapeHtml(job.province)} - ${escapeHtml(job.career)}</em><br>
    <span>Lương: ${job.salary.toLocaleString()} VNĐ</span>
  </div>`;
   const btn = document.createElement("button");
    btn.className = "apply-btn";
    btn.textContent = isApplied ? "Đã nộp hồ sơ" : "Ứng tuyển";
    btn.disabled = isApplied;
    btn.addEventListener("click", () => {
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để nộp hồ sơ!");
        window.location.href = "login.html";
        return
      }
    window.location.href = `ungtuyen.html?job=${encodeURIComponent(job.title)}`;
    });
    jobDiv.appendChild(btn);
    jobListDiv.appendChild(jobDiv);
  });

  resultsDiv.appendChild(jobListDiv);
}

function saveSearchHistory(keyword) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!keyword) return;
  if (history[0] !== keyword) {
    history.unshift(keyword);
    if (history.length > 5) history.pop();
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
  showSearchHistory();
}

function showSearchHistory() {
  const historyDiv = document.getElementById("searchHistory");
  if (!historyDiv) return;
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (history.length === 0) {
    historyDiv.innerHTML = "<p>Chưa có lịch sử tìm kiếm.</p>";
    return;
  }
  historyDiv.innerHTML =
    "<strong>Lịch sử tìm kiếm gần đây:</strong>" +
    history
      .map((item) => `<div class="history-item" onclick="searchFromHistory('${item}</div>`)
      .join("");
}

function searchFromHistory(keyword) {
  const input = document.getElementById("jobInput");
  if (input) input.value = keyword;
  searchJobs();
}

function toggleHistory() {
  const historyDiv = document.getElementById("searchHistory");
  if (!historyDiv) return;
  historyDiv.style.display = historyDiv.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".infind");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      searchJobs(); 
    });
  }
  showSearchHistory();

});
