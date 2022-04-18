import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);
const FORM_DATA_NAME = 'feedback-form-state';

populateIntupFeilds(form);

function populateIntupFeilds(form) {
  const storageValue = localStorage.getItem(FORM_DATA_NAME);
  const dataReceived = JSON.parse(storageValue);
  if (storageValue) {
    form.elements.email.value = dataReceived.email;
    form.elements.message.value = dataReceived.message;
  }
}

function onFormData() {
  const data = { email: form.email.value, message: form.message.value };
  localStorage.setItem(FORM_DATA_NAME, JSON.stringify(data));
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

e.currentTarget.reset();
localStorage.removeItem(FORM_DATA_NAME);
}
