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

const musicToggleButton = document.getElementById("toggleMusic");
const backgroundMusic = document.getElementById("backgroundMusic");
const volumeControl = document.getElementById("volumeControl");

let isMusicPlaying = true;

window.addEventListener("load", () => {
  backgroundMusic.volume = 0.5;
  backgroundMusic.play().catch((error) => {
    console.warn("Autoplay failed. User interaction required.", error);
    musicToggleButton.textContent = "🔇";
    isMusicPlaying = false;
  });
  musicToggleButton.textContent = "🎵";
});

musicToggleButton.addEventListener("click", () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggleButton.textContent = "🔇";
  } else {
    backgroundMusic.play().catch((error) => {
      console.warn("Playback error:", error);
    });
    musicToggleButton.textContent = "🎵";
  }
  isMusicPlaying = !isMusicPlaying;
});

volumeControl.addEventListener("input", (event) => {
  backgroundMusic.volume = event.target.value;
});

// Typing Animation และ Rhythms (Visualizer)
const typingTextElement = document.getElementById("typing-text");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");
const audio = document.getElementById("backgroundMusic");

// ** ตั้งค่าขนาดของ Canvas **
function resizeCanvas() {
  canvas.width = window.innerWidth * 0.8; // 80% ของความกว้างหน้าจอ
  canvas.height = 200; // ความสูงคงที่
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ** ฟังก์ชัน Typing Animation **
const messages = [
  "Welcome to Our CSTU Story",
  "Explore the Journey Together",
  "We plan for the next four years.",
];
let currentMessageIndex = 0;

function startTypingAnimation() {
  const message = messages[currentMessageIndex];
  let charIndex = 0;

  function typeCharacter() {
    if (charIndex < message.length) {
      typingTextElement.textContent += message[charIndex]; // เพิ่มตัวอักษรทีละตัว
      charIndex++;
      setTimeout(typeCharacter, 100); // ความเร็วในการพิมพ์ (100ms ต่ออักษร)
    } else {
      // รอ 2 วินาทีก่อนเปลี่ยนข้อความถัดไป
      setTimeout(() => {
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        typingTextElement.textContent = ""; // ลบข้อความเก่า
        startTypingAnimation(); // เริ่มข้อความใหม่
      }, 2000);
    }
  }

  typeCharacter();
}
startTypingAnimation();

// ** ฟังก์ชัน Rhythms Visualizer **
audio.addEventListener("play", () => {
  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();

  analyser.smoothingTimeConstant = 0.7;
  analyser.fftSize = 256;

  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  let previousValues = new Array(analyser.frequencyBinCount).fill(0);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let x = 0;

    analyser.getByteFrequencyData(dataArray);
    dataArray.forEach((value, index) => {
      let smoothedValue = previousValues[index] * 0.8 + value * 0.2;
      previousValues[index] = smoothedValue;

      if (index < 5) {
        smoothedValue = smoothedValue * 0.5;
      }

      const barHeight = Math.log10(1 + smoothedValue) * 50;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `rgba(165, 42, 42, 1)`);
      gradient.addColorStop(1, `rgba(210, 105, 30, 0.8)`);

      // ใช้ roundRect สำหรับขอบมน
      ctx.beginPath();
      if (ctx.roundRect) {
        // ใช้ roundRect ถ้ารองรับ
        ctx.roundRect(
          x, // ตำแหน่ง X
          canvas.height - barHeight, // ความสูง
          barWidth - 2, // ความกว้าง
          barHeight, // ความสูงของแท่ง
          10 // รัศมีความมน
        );
      } else {
        ctx.moveTo(x, canvas.height);
        ctx.arc(
          x + (barWidth - 2) / 2,
          canvas.height - barHeight,
          (barWidth - 2) / 2,
          Math.PI,
          0
        );
        ctx.lineTo(x + barWidth - 2, canvas.height);
        ctx.lineTo(x, canvas.height);
      }
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.closePath();

      x += barWidth;
    });

    requestAnimationFrame(draw);
  }

  draw();
});
