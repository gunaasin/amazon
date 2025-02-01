document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".homepage-slider .slide");
    let currentIndex = 0;
  
    function showNextSlide() {
      slides[currentIndex].classList.remove("active");
  
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }
  
    slides[currentIndex].classList.add("active");
  
    setInterval(showNextSlide, 5000);
  });
  