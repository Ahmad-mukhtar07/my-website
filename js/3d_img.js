const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1);

let timeout;
let lastTransformX = 0;
let lastTransformY = 0;

function update3DEffect(x, y) {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  const yValue = calcValue(y, window.innerHeight);
  const xValue = calcValue(x, window.innerWidth);

  cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;
  lastTransformX = xValue;
  lastTransformY = yValue;

  [].forEach.call(images, (image) => {
    image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
  });

  [].forEach.call(backgrounds, (background) => {
    background.style.backgroundPosition = `${xValue * 0.45}px ${-yValue * 0.45}px`;
  });

  timeout = window.requestAnimationFrame(() => {
    clearTimeout(timeout);
  });
}

function reset3DEffect() {
  if (timeout) {
    clearTimeout(timeout);
  }
  cards.style.transform = `rotateX(0deg) rotateY(0deg)`; // Reset rotation to initial position
  [].forEach.call(images, (image) => {
    image.style.transform = '';
  });
  [].forEach.call(backgrounds, (background) => {
    background.style.backgroundPosition = '';
  });
}

function handleOrientationChange() {
  if (screen.orientation) {
    const orientation = screen.orientation.angle;
    update3DEffect(orientation, 0); // Only consider orientation angle for X axis
  }
}

window.addEventListener('deviceorientation', (e) => {
  const { beta, gamma } = e;
  const tiltY = beta * 2;
  const tiltX = gamma * 2;
  update3DEffect(tiltX, tiltY);
});

window.addEventListener('orientationchange', handleOrientationChange);
handleOrientationChange(); // Initial orientation

if (/Mobi|Android/i.test(navigator.userAgent)) {
  // Apply tilting effect only for mobile screens
  reset3DEffect(); // Set default straight position on mobile
  // cards.removeEventListener('mousemove', update3DEffect);
} else {
  // Apply hovering effect for desktop screens
  document.addEventListener('mousemove', ({ x, y }) => {
    update3DEffect(x, y);
  });
}
