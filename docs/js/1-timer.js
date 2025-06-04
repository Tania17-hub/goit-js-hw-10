import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

let timerId = null;
let userSelectedDate = null;

const options = {
  locale: {
    firstDayOfWeek: 1,
  },
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = selectedDates[0];

    if (validateDate(pickedDate)) {
      userSelectedDate = pickedDate;
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
    }
  },
};
flatpickr(input, options);

function validateDate(selectedDate) {
  const now = new Date();
  if (selectedDate <= now) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    return false;
  }
  return true;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer() {
  const ms = userSelectedDate - new Date();

  if (ms <= 0) {
    stopTimer();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(ms);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function startTimer() {
  startBtn.disabled = true;
  input.disabled = true;
  timerId = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  startBtn.disabled = true;
  input.disabled = false;
}

startBtn.addEventListener('click', startTimer);
