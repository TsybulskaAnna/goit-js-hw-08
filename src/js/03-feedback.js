import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);
const FORM_DATA_NAME = 'feedback-form-state';
const data = { email: '', message: '' };

populateIntupFeilds(form);

function populateIntupFeilds(form) {
  if (localStorage.getItem(FORM_DATA_NAME)) {
    const dataReceived = JSON.parse(localStorage.getItem(FORM_DATA_NAME));

    form.elements.email.value = dataReceived.email;
    form.elements.message.value = dataReceived.message;
  }
}
function onFormData({event}) {
  localStorage.setItem(FORM_DATA_NAME, updateData(event));
}

function updateData(event) {
  if (event.target.name === 'email') {
    data.email = event.target.value;
  }
  if (event.target.name === 'message') {
    data.message = event.target.value;
  }
  return data;
}

function onSubmitForm(e) {
  e.preventDefault();
  if (!e.currentTarget.elements.email.value || !e.currentTarget.elements.message.value) {
    Notify.failure('Заполните все поля', {
      timeout: 2000,
      position: 'center-top',
    });
    return;
  
}

console.log( updateData(event));
event.currentTarget.reset();
localStorage.removeItem(FORM_DATA_NAME);
}
