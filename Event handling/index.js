const regexChecks = [
  { regex: /(?=.*\d)/, message: "Password must contain at least one digit." },
  { regex: /(?=.*[a-z])/, message: "Password must contain at least one lowercase letter." },
  { regex: /(?=.*[A-Z])/, message: "Password must contain at least one uppercase letter." },
  { regex: /.{8,}/, message: "Password must be at least 8 characters long." }
];

const generateErrorMessage = (value) => {
  for (const check of regexChecks) {
    if (!check.regex.test(value)) {
      return check.message;  
    }
  }
  return ""; 
}

const validateOptions = [    
  {
    attribute: 'data-pass-repeat',
    isValid: input => input.value === password,
    errorMessage: (input, label) => `${label.textContent} should match password`,
  },
  {
    attribute: 'pattern',
    isValid: input => {
      const regex = new RegExp(input.getAttribute('pattern'));
      return regex.test(input.value);
    },
    errorMessage: (input, label) => input.type === 'email'? `${label.textContent} should match example "xyz@gmail.com" ` : generateErrorMessage(input.value)
  },
  {
    attribute: 'minlength',
    isValid: input => input.value.trim().length >= input.getAttribute('minlength'),
    errorMessage: (input, label) => `${label.textContent} should be at least ${input.getAttribute('minlength')} characters long`
  },
  {
    attribute: 'required',
    isValid: input => input.value.trim() !== '',
    errorMessage: (input, label) => `${label.textContent} is required`
  },
]

const applyUIEffects = (valid, formField, message) => {
  const displayError = formField.querySelector('.display-error');
  const input = formField.querySelector('input');
  if (valid) {
    displayError.classList.remove('show');
    input.classList.add('green');
    if (input.id === 'password'){
      password = input.value;
    }
  } else {
    displayError.textContent = message;
    displayError.classList.add('show');
    input.classList.remove('green');
    
  }
}

const validateInput = formField => {
  const input = formField.querySelector('input');
  const label = formField.querySelector('label');
  let isValid = true;

  for (const option of validateOptions) {
    if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
      applyUIEffects(false, formField, option.errorMessage(input, label));
      isValid = false;
      break; 
    }
  }
  
  if (isValid) {
    applyUIEffects(true, formField, '');
  }
  
  return isValid;
}

let password = '';
const allFormFields = Array.from(form.querySelectorAll('.form-field'));

const validateForm = formId => {
  const form = document.getElementById(formId);
  // temporary, remove after finish
  form.setAttribute('novalidate', '')    

  form.addEventListener('submit', e => {
    e.preventDefault();
    let submit = false;
    allFormFields.forEach(formField => submit = validateInput(formField));
    return submit && console.log('submited');
  })
}

allFormFields.forEach(field => field.querySelector('input').onblur = () => validateInput(field));
allFormFields.forEach(field => field.querySelector('input').onfocus = () => {
  field.querySelector('.display-error').innerHTML = '';
});

validateForm('form');


