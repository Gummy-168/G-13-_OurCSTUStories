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

  // ล้างฟอร์มหลังจากส่งเสร็จ
  guestBookForm.reset();
});

// Fade-in
const paragraphs = document.querySelectorAll(".fade_in");

document.addEventListener("scroll", function () {
  paragraphs.forEach((paragraphs) => {
    if (isInviwe(paragraphs)) {
      paragraphs.classList.add("fade_in--visible");
    }
  });
});

function isInviwe(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}
