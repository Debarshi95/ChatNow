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
