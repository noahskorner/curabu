const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const accessTokenExpiration = 1800; //seconds = 15 minutes
const refreshTokenExpiration = 15; //days

module.exports = {
  emailRegex,
  accessTokenExpiration,
  refreshTokenExpiration,
};
