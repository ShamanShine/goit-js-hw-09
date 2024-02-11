document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылку на форму по классу
  const feedbackForm = document.querySelector(".feedback-form");
  // Функция для сохранения состояния формы в локальное хранилище
  function saveFormState() {
    // Получаем значения полей формы и сохраняем их в объект
    const formData = {
      email: feedbackForm.elements.email.value.trim(),
      message: feedbackForm.elements.message.value.trim(),
    };
    // Преобразуем объект в строку JSON и сохраняем в локальное хранилище
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
  }
  // Функция для загрузки состояния формы из локального хранилища
  function loadFormState() {
    // Получаем сохраненные данные из локального хранилища
    const savedFormData = localStorage.getItem("feedback-form-state");
    // Если данные есть, преобразуем строку JSON в объект и заполняем поля формы
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      feedbackForm.elements.email.value = parsedData.email;
      feedbackForm.elements.message.value = parsedData.message;
    }
  }
  // Слушаем изменения в полях формы и вызываем функцию сохранения состояния
  feedbackForm.addEventListener("input", function () {
    saveFormState();
  });
  // Слушаем событие отправки формы
  feedbackForm.addEventListener("submit", function (event) {
    // Отменим стандартное поведение формы
    event.preventDefault();
    // Получаем значения полей формы после отправки
    const emailValue = feedbackForm.elements.email.value.trim();
    const messageValue = feedbackForm.elements.message.value.trim();
    // Проверяем, заполнены ли оба поля
    if (emailValue && messageValue) {
      // Если да, выводим данные в консоль
      console.log({
        email: emailValue,
        message: messageValue,
      });
      // Очищаем локальное хранилище и поля формы
      localStorage.removeItem("feedback-form-state");
      feedbackForm.reset();
    }
  });
  // Загружаем состояние формы при загрузке страницы.если страница перезагрузиться то данные подставяться обратно в поля формы автоматически
  loadFormState();
});
