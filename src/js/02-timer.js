import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
let userDate = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
    } else {
      userDate = selectedDates[0];
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.input, options);

const timer = {
  timerID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;

    this.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const time = convertMs(deltaTime);
      updateClockface(time);
      //   console.log('currentTime', currentTime);
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);
      if (deltaTime < 1000) {
        clearInterval(this.timerID);
        // this.isActive = false;
        refs.startBtn.disabled = true;
      }
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}
