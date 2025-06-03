import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateInputs = form.querySelectorAll('input[name="state"]');

function showErrorMessage(message) {
  iziToast.warning({
    title: '⚠ Warning',
    message: message,
    position: 'topRight',
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = parseInt(delayInput.value);
  const selectedState = [...stateInputs].find(input => input.checked)?.value;

  if (!delay || isNaN(delay)) {
    showErrorMessage('Please enter a valid delay.');
    return;
  }

  if (!selectedState) {
    showErrorMessage('Please select promise state (fulfilled or rejected).');
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === 'fulfilled') {
        resolve(`✅ Fulfilled in ${delay}ms`);
      } else {
        reject(`❌ Rejected in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(message => {
      iziToast.success({
        title: 'Success',
        message: message,
        position: 'topRight',
      });
    })
    .catch(message => {
      iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
      });
    });
});
