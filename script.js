// ดึงฟอร์มและส่วนแสดงคอมเมนต์
const guestBookForm = document.getElementById("guestBookForm");
const commentsGrid = document.getElementById("commentsGrid");

// ฟังก์ชันสำหรับบันทึกความคิดเห็นลง Local Storage
function saveCommentsToLocalStorage(comments) {
  localStorage.setItem("comments", JSON.stringify(comments)); // แปลง Array เป็น JSON และบันทึก
}

// ฟังก์ชันสำหรับดึงความคิดเห็นจาก Local Storage
function getCommentsFromLocalStorage() {
  const comments = localStorage.getItem("comments"); // ดึงข้อมูล JSON
  return comments ? JSON.parse(comments) : []; // แปลง JSON กลับเป็น Array
}

// ฟังก์ชันสำหรับแสดงความคิดเห็น
function renderComments(comments) {
  commentsGrid.innerHTML = ""; // ล้างข้อมูลเดิมใน commentsGrid
  comments.forEach((comment) => {
    const commentCard = document.createElement("div");
    commentCard.classList.add("comment-card");
    commentCard.innerHTML = `
            <div class="comment-header">
                <div class="comment-avatar"></div> <!-- รูปโปรไฟล์ -->
                <p class="comment-name">${comment.name}</p> <!-- ชื่อ -->
            </div>
            <p class="comment-message">${comment.message}</p> <!-- ข้อความ -->
            <div class="comment-stars">${"⭐".repeat(
              comment.rating
            )}</div> <!-- ดาว -->
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
  const newComment = { name, message, rating };
  comments.push(newComment);

  // บันทึกความคิดเห็นลง Local Storage
  saveCommentsToLocalStorage(comments);

  // แสดงความคิดเห็นใหม่
  renderComments(comments);

  // ล้างฟอร์มหลังจากส่งเสร็จ
  guestBookForm.reset();
});
