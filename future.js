// Fade-in functionality
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

  const scrollTop = window.scrollY;
  const parallaxContent = document.querySelector(".parallax-content");
  if (parallaxContent) {
    parallaxContent.style.transform = `translateY(${scrollTop * 0.3}px)`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const chatSections = document.querySelectorAll(".chat");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  chatSections.forEach((section) => {
    observer.observe(section);
  });
});

// Moon mod
const toggleThemeButton = document.getElementById("toggleTheme");
const lightVideo = document.getElementById("lightVideo");
const darkVideo = document.getElementById("darkVideo");

if (toggleThemeButton && lightVideo && darkVideo) {
  document.body.classList.add("light-mode");

  toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("dark-mode")) {
      toggleThemeButton.textContent = "☀️";
      lightVideo.style.display = "none";
      darkVideo.style.display = "block";
    } else {
      toggleThemeButton.textContent = "🌙";
      lightVideo.style.display = "block";
      darkVideo.style.display = "none";
    }
  });
} else {
  console.error("ไม่พบ toggleThemeButton, lightVideo หรือ darkVideo ใน DOM");
}

// ควบคุวเพลง
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

// text animation
document.addEventListener("DOMContentLoaded", () => {
  const flyingTexts = document.querySelectorAll(".text-animate");

  flyingTexts.forEach((text, index) => {
    text.classList.add("text-fly-curve"); // เพิ่มคลาสเพื่อเรียกใช้แอนิเมชัน
    text.style.animationDelay = `${index * 0.3}s`; // เรียงแอนิเมชันทีละตัว
  });
});
