import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const delayEl = document.querySelector('[name="delay"]');
const stepEl = document.querySelector('[name="step"]');
const amountEl = document.querySelector('[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let delayVal = Number(delayEl.value);
  const stepVal = Number(stepEl.value);
  const amountVal = Number(amountEl.value);

  for (let position = 1; position <= amountVal; position += 1) {
    createPromise(position, delayVal)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayVal += stepVal;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
