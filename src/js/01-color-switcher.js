function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data - start]'),
  stopBtn: document.querySelector('button[data - stop]'),
  bodyRef: document.body,
};
refs.startBtn.addEventListener('click', onstartBtn);
refs.stopBtn.addEventListener('click', onstopBtn);
let timerId = null;
function onstartBtn() {}

function onstopBtn() {}
