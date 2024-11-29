// ดึงฟอร์มและส่วนแสดงคอมเมนต์
const guestBookForm = document.getElementById("guestBookForm");
const commentsGrid = document.getElementById("commentsGrid");

// สีที่ใช้ในวงกลมโปรไฟล์ (Avatar)
const avatarColors = ["#FF4C4C", "#4C6EFF", "#4CE55A", "#FFC107"]; // แดง, น้ำเงิน, เขียว, เหลือง
let currentColorIndex = 0; // ตัวนับสีเริ่มต้น

// ฟังก์ชันสำหรับบันทึกความคิดเห็นลง Local Storage
function saveCommentsToLocalStorage(comments) {
  localStorage.setItem("comments", JSON.stringify(comments));
}

// ฟังก์ชันสำหรับดึงความคิดเห็นจาก Local Storage
function getCommentsFromLocalStorage() {
  const comments = localStorage.getItem("comments");
  return comments ? JSON.parse(comments) : [];
}

// ฟังก์ชันสำหรับแสดงความคิดเห็น
function renderComments(comments) {
  commentsGrid.innerHTML = ""; // ล้างข้อมูลเดิมใน commentsGrid
  comments.forEach((comment, index) => {
    const commentCard = document.createElement("div");
    commentCard.classList.add("comment-card");

    // สลับสีของ Avatar
    const avatarColor = avatarColors[index % avatarColors.length]; // เลือกสีจาก Array

    commentCard.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar" style="background: ${avatarColor};"></div> <!-- สีวงกลม -->
                <p class="comment-name">${comment.name}</p>
            </div>
            <p class="comment-message">${comment.message}</p>
            <div class="comment-stars">${"⭐".repeat(comment.rating)}</div>
        `;
    commentsGrid.appendChild(commentCard);
  });
}

// โหลดความคิดเห็นจาก Local Storage เมื่อเปิดหน้าเว็บ
let comments = getCommentsFromLocalStorage();
renderComments(comments);

// เมื่อฟอร์มถูก submit
guestBookForm.addEventListener("submit", function (event) {
  event.preventDefault(); // ป้องกันการรีเฟรชหน้า

  // ดึงค่าจากฟอร์ม
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("comment").value.trim();
  const rating = document.getElementById("rating").value;

  // ตรวจสอบว่ากรอกข้อมูลครบหรือยัง
  if (!name || !message || !rating) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  // เพิ่มความคิดเห็นใหม่ใน Array
  const newComment = {
    name,
    message,
    rating,
    color: avatarColors[currentColorIndex],
  };
  comments.push(newComment);

  // อัปเดตสีให้วนไปสีถัดไป
  currentColorIndex = (currentColorIndex + 1) % avatarColors.length; // วนกลับเมื่อครบชุดสี

  // บันทึกความคิดเห็นลง Local Storage
  saveCommentsToLocalStorage(comments);

  // แสดงความคิดเห็นใหม่
  renderComments(comments);

  guestBookForm.reset();
});

// Fade-in
function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

window.addEventListener("scroll", function () {
  const fadeElements = document.querySelectorAll(".fade_in");

  fadeElements.forEach((el) => {
    if (isElementInView(el)) {
      el.classList.add("fade_in--visible");
    }
  });

  const scrollTop = window.pageYOffset;
  const parallaxContent = document.querySelector(".parallax-content");
  if (parallaxContent) {
    parallaxContent.style.transform = `translateY(${scrollTop * 0.3}px)`;
  }
});

// Moon mod
const toggleThemeButton = document.getElementById("toggleTheme");
console.log("Toggle Theme Button:", toggleThemeButton);

if (toggleThemeButton) {
  toggleThemeButton.addEventListener("click", () => {
    console.log("Theme Toggle Clicked!");
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    console.log("Body Classes After Toggle:", document.body.classList);

    if (document.body.classList.contains("dark-mode")) {
      toggleThemeButton.textContent = "☀️";
    } else {
      toggleThemeButton.textContent = "🌙";
    }
  });

  console.log("Initial Body Classes:", document.body.classList);
  document.body.classList.add("light-mode");
} else {
  console.error("ไม่พบปุ่ม toggleTheme ใน DOM");
}

// Parallax
window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset;

  const parallaxSection = document.querySelector(".parallax-section");
  if (parallaxSection) {
    parallaxSection.style.backgroundPositionY = `${scrollTop * 0.5}px`;
  }

  const icons = document.querySelectorAll(".icons img");
  icons.forEach((icon, index) => {
    const speed = 0.3 + index * 0.1;
    icon.style.transform = `translateY(${scrollTop * speed}px)`;
  });
});

// ควบคุวเพลง
const musicToggleButton = document.getElementById("toggleMusic");
const backgroundMusic = document.getElementById("backgroundMusic");
const volumeControl = document.getElementById("volumeControl");

let isMusicPlaying = false;

musicToggleButton.addEventListener("click", () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggleButton.textContent = "🎵";
  } else {
    backgroundMusic.play();
    musicToggleButton.textContent = "🔇";
  }
  isMusicPlaying = !isMusicPlaying;
});

volumeControl.addEventListener("input", (event) => {
  backgroundMusic.volume = event.target.value;
});

window.addEventListener("load", () => {
  backgroundMusic.pause();
  backgroundMusic.volume = 0.5;
  musicToggleButton.textContent = "🎵";
});
