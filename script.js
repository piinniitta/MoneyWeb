const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.pagination');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.style.transform = `translateX(${100 * (idx - index)}%)`;
  });

  currentSlide = index;
  updateDots(index);
  updateButtonVisibility();
  adjustSlideContainerHeight();
}

function updateDots(index) {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function updateButtonVisibility() {
  prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
  nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
}

dotsContainer.innerHTML = '';

slides.forEach((_, idx) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.addEventListener('click', () => showSlide(idx));
  dotsContainer.appendChild(dot);
});

prevButton.addEventListener('click', () => {
  showSlidePrev();
});

nextButton.addEventListener('click', () => {
  showSlideNext();
});

showSlide(currentSlide);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    showSlidePrev();
  } else if (event.key === 'ArrowRight') {
    showSlideNext();
  }
});

function showSlideNext() {
  currentSlide = (currentSlide + 1) % slides.length;
  if (currentSlide === 0) {
    if (confirmRestart) {
      currentSlide = 0;
      showSlide(currentSlide);
    }
  } else {
    showSlide(currentSlide);

    updateButtonVisibility();
  }
}

function showSlidePrev() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  updateButtonVisibility();
}

function adjustSlideContainerHeight() {
  const currentSlideHeight = slides[currentSlide].offsetHeight;
  document.querySelector('.slide-container').style.height = `${currentSlideHeight}px`;
}

window.addEventListener('load', () => {
  adjustSlideContainerHeight();

});

function startOver() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[0].classList.add("active");
  document.getElementById("popupOverlay").style.display = "none";
}