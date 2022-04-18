import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

const formData = {};

function onFormData(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
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


(function dataFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  if (data) {
    email.value = data.email;
    message.value = data.message;
  }
})();


console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
e.currentTarget.reset();
localStorage.removeItem('feedback-form-state');}