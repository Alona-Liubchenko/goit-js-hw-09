// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   formEl: document.querySelector('.form'),
//   delayEl: document.querySelector("[name='delay']"),
//   stepEl: document.querySelector("[name='step']"),
//   amountEl: document.querySelector("[name='amount']"),
//   submitBtn: document.querySelector("[type='submit']"),
// };
// refs.formEl.addEventListener('submit', createPromise);

// function createPromise(position, delay) {
//   refs.delayEl = Number();
//   refs.stepEl = Number();
//   refs.amountEl = Number();
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve(position);
//       } else {
//         // Reject
//         reject(position);
//       }
//     }, delay);
//   });
// }

// createPromise(position, totalDelay)
//   .then(({ position, delay }) => {
//     Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

// const makePromis = () => {
//   return new Promise((resolve, reject) => {
//     const passed = Math.random() > 0.5;
//     setTimeout(() => {
//       if (passed) {
//         resolve(' ku-ku');
//       }
//       reject('vse propalo');
//     }, 2000);
//   });
// };
// makePromis()
//   .then(result => console.log(result))
//   .catch(error => console.log(error));

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

// Form and its inputs

const form = document.querySelector('.form');

const firstDelayMs = document.querySelector('[name="delay"]');
const delayStepMs = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

// Event listener after submitting the form

form.addEventListener('submit', submitCreatePromises);

// Loop to create promises from function createPromise after event listener

function submitCreatePromises(e) {
  e.preventDefault();

  let delay = firstDelayMs.valueAsNumber;
  const delayStepMsVal = delayStepMs.valueAsNumber;
  const amountVal = amount.valueAsNumber;

  for (let i = 1; i <= amountVal; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
      });
    delay += delayStepMsVal;
  }
}

//function createPromise

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
