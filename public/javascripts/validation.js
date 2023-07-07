function validate() {
  // only do this if we're in the "new" route
  if (window.location.href.includes('/new')) {
    let validForm = false;
    let validUser = false;
    let validMessage = false;

    const submitButton = document.querySelector('.submit');
    submitButton.disabled = !validForm;

    const setValidationMessage = () => {
      const validationMessage = document.querySelector('.validation-message');
      if (validForm) {
        validationMessage.textContent = 'Good to go!';
      } else if (validMessage && !validUser) {
        validationMessage.textContent = 'Name required';
      } else if (!validMessage && validUser) {
        validationMessage.textContent = 'Message required';
      } else {
        validationMessage.textContent = 'All fields required';
      }
    };

    const validateMessage = (event) => {
      const { valid } = event.target.validity;
      validMessage = valid;
      validForm = validMessage && validUser;
      submitButton.disabled = !validForm;
      setValidationMessage();
    };

    const validateUser = (event) => {
      const { valid } = event.target.validity;
      validUser = valid;
      validForm = validMessage && validUser;
      submitButton.disabled = !validForm;
      setValidationMessage();
    };

    const messageText = document.querySelector('#message');
    const userName = document.querySelector('#user');

    messageText.addEventListener('input', validateMessage);
    userName.addEventListener('input', validateUser);
  }
}

validate();
