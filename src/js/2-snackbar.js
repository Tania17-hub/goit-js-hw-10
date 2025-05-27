import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

// Функция для отображения уведомления об ошибке
function showErrorMessage(message) {
  iziToast.warning({
    title: '⚠ Warning',
    message: message,
    position: 'topRight',
  });
}

function showSuccessMessage(delay) {
  iziToast.success({
    title: '✅ Success',
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
}

function showFailureMessage(delay) {
  iziToast.error({
    title: '❌ Error',
    message: `Rejected promise in ${delay}ms`,
    position: 'topRight',
  });
}

// Функция для проверки введенной задержки
function validateDelay(delay, callback) {
  if (!delay || delay <= 0) {
    callback('Please enter a valid delay in milliseconds.');
    return false;
  }
  return true;
}

// Функция для проверки выбранного состояния
function validateState(state, callback) {
  if (!state) {
    callback('Please select a promise state (fulfilled or rejected)');
    return false;
  }
  return true;
}

// Функция для создания промиса с заданной задержкой и состоянием
function createPromise(delay, state, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      callback(showSuccessMessage, delay);
    })
    .catch(delay => {
      callback(showFailureMessage, delay);
    });
}

// Функция для очистки формы
function clearForm() {
  delayInput.value = '';
  stateInputs.forEach(input => (input.checked = false));
}

// Основной обработчик отправки формы
form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayInput.value);
  const state = [...stateInputs].find(input => input.checked)?.value;
  clearForm();
  if (!validateDelay(delay, showErrorMessage)) return;
  if (!validateState(state, showErrorMessage)) return;
  createPromise(delay, state, (callback, delay) => callback(delay));
});
