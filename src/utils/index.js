export const getChatUserEmail = (authUserEmail, users = []) => {
  return users.filter((email) => email !== authUserEmail);
};

export const formatDate = (timeStamp) => {
  let date;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  if (timeStamp) {
    date = timeStamp.toDate();
  } else {
    date = new Date();
  }
  return date.toLocaleString('en-US', options);
};

export const makeClasses = (initialClass, ...rest) => {
  const defaultClass = 'font-poppins';
  if (!initialClass) {
    throw Error('Initial class is required');
  }
  return `${defaultClass} ${initialClass} ${rest.join(' ')}`;
};

export const formatFirebaseError = (error) => {
  if (error.includes('user-not-found')) {
    return 'User not found!';
  }
  if (error.includes('wrong-password')) {
    return 'Email or password incorrect!';
  }
  return 'Some error occurred';
};
