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

fu;
