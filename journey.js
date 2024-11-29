// Fade-in
const paragraphs = document.querySelectorAll(".fade_in");

document.addEventListener("scroll", function () {
  paragraphs.forEach((paragraph) => {
    if (isInView(paragraph)) {
      paragraph.classList.add("fade_in--visible");
    }
  });
});

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom > 0 &&
    rect.top <
      (window.innerHeight - 150 || document.documentElement.clientHeight - 150)
  );
}

// Moon mod
const toggleThemeButton = document.getElementById("toggleTheme");
console.log("Toggle Theme Button:", toggleThemeButton); // ✅ ตรวจสอบการเชื่อมโยง

if (toggleThemeButton) {
  // เพิ่ม Event Listener เมื่อคลิกปุ่ม
  toggleThemeButton.addEventListener("click", () => {
    console.log("Theme Toggle Clicked!"); // ✅ ตรวจสอบว่าปุ่มถูกคลิก
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    console.log("Body Classes After Toggle:", document.body.classList); // ✅ ตรวจสอบการเปลี่ยนคลาส

    // เปลี่ยนไอคอน 🌙/☀️
    if (document.body.classList.contains("dark-mode")) {
      toggleThemeButton.textContent = "☀️";
    } else {
      toggleThemeButton.textContent = "🌙";
    }
  });

  // ตั้งค่าเริ่มต้นเป็น Light Mode
  console.log("Initial Body Classes:", document.body.classList); // ✅ ตรวจสอบสถานะเริ่มต้น
  document.body.classList.add("light-mode");
} else {
  console.error("ไม่พบปุ่ม toggleTheme ใน DOM");
}