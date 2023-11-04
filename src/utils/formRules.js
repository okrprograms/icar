const requiredRule = {
  value: true,
  message: "This is required!",
};

const emailPatternRule = {
  value: /\S+@\S+\.\S+/,
  message: "Enter value is not the email format!",
};

//password with special character, number, one Capital and minimum length 6
const passPatternRule = {
  value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!*_])[^<>'" \n\t]{6,}$/,
  message:
    "Please enter at least one capital case character, one number and one special character!",
};

const passMinLenRule = {
  value: 6,
  message: "Minimum 6 characters!",
};

const passMaxLenRule = {
  value: 20,
  message: "Maximum 20 characters!",
};

export {
  requiredRule,
  emailPatternRule,
  passPatternRule,
  passMinLenRule,
  passMaxLenRule,
};
