const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1); // thanks @alice-mx

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

document.addEventListener('mousemove', ({ x, y }) => {
  update3DEffect(x, y);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  update3DEffect(touch.clientX, touch.clientY);
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  update3DEffect(touch.clientX, touch.clientY);
});

document.addEventListener('touchend', () => {
  reset3DEffect();
});

cards.addEventListener('mouseleave', () => {
  reset3DEffect();
});
