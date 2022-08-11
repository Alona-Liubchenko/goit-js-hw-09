function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  colorBody: document.querySelector('body'),
};
refs.startBtn.addEventListener('click', onstartBtn);
refs.stopBtn.addEventListener('click', onstopBtn);
let timerId = null;

function onstartBtn() {
  timerId = setInterval(() => {
    refs.colorBody.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
  console.log(refs.startBtn);
}

function onstopBtn() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  console.log(refs.stopBtn);
}
