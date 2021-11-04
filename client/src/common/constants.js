const usernameRegex = /^[a-z0-9-_.]+$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const alertTypes = {
  error: 0,
  success: 1,
  info: 2,
  warning: 3,
};
export { usernameRegex, emailRegex, alertTypes };
