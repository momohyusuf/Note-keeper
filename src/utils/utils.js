const checkName = (args) => {
  const nameTesting = /^[A-Za-z0-9]{3,16}$/;
  return nameTesting.test(args);
};
const passwordLength = (args) => {
  const pattern = /(?=^.{8,}$)/;
  return pattern.test(args);
};
const passwordContainUppercase = (args) => {
  const pattern = /(?=.*[A-Z])/;
  return pattern.test(args);
};
const passwordContainNumber = (args) => {
  const pattern = /(?=.*[0-9])/;
  return pattern.test(args);
};
const passwordContainSpecialCharacter = (args) => {
  const pattern = /(?=.*[^A-Za-z0-9])/;
  return pattern.test(args);
};
const passwordContainLowercase = (args) => {
  const pattern = /(?=.*[a-z])/;
  return pattern.test(args);
};
function checkEmailAddress(args) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(args); // returns a boolean
}

const showPassword = (arg) => {
  if (arg.current.type === 'password') {
    arg.current.type = 'text';
  } else {
    arg.current.type = 'password';
  }
};
export {
  checkName,
  passwordLength,
  passwordContainLowercase,
  passwordContainNumber,
  passwordContainUppercase,
  passwordContainSpecialCharacter,
  checkEmailAddress,
  showPassword,
};
