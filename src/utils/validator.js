export const emailValidator = (emailAddress) => {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(emailAddress);
};

export const phoneValidator = (phoneNumber) => {
  if (phoneNumber.length === 10 && Number(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidator = (password) => {
  if (password.length < 6) {
    return false;
  }

  return true;
};
