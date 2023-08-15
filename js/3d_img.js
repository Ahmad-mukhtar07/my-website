const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 80; // Adjust the range for a more pronounced effect

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
  cards.style.transform = `rotateX(${lastTransformY}deg) rotateY(${lastTransformX}deg)`;
  [].forEach.call(images, (image) => {
    image.style.transform = `translateX(${-lastTransformX}px) translateY(${lastTransformY}px)`;
  });
  [].forEach.call(backgrounds, (background) => {
    background.style.backgroundPosition = `${lastTransformX * 0.45}px ${-lastTransformY * 0.45}px`;
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

cards.addEventListener('mouseleave', () => {
  reset3DEffect();
});
