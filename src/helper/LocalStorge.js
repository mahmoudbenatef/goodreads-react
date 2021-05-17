import session from "./ENUM";
const setSessionToken = (tokenId, token) => {
  sessionStorage.setItem(tokenId, JSON.stringify(token));
};
const getSessionToken = (tokenId) => {
  return JSON.parse(sessionStorage.getItem(tokenId));
};
const removeSessionToken = (tokenId) => {
  sessionStorage.removeItem(tokenId);
};
const setSessionUser = (userId, user) => {
  sessionStorage.setItem(userId, JSON.stringify(user));
};
const getSessionUser = (userId) => {
  return JSON.parse(sessionStorage.getItem(userId));
};
const removeSessionUser = (userId) => {
  sessionStorage.removeItem(userId);
};
const setToken = (token) => {
  setSessionToken(session.token, token);
};
const getToken = () => getSessionToken(session.token);

const removeToken = () => removeSessionToken();

const setCurrentUser = (user) => {
  setSessionUser(session.currentUser, user);
};

const removeCurrenUser = () => removeSessionUser();

const getCurrentUser = () => getSessionUser(session.currentUser);

export  const mySessionStorage =  {
  setToken,
  getToken,
  removeToken,
  setCurrentUser,
  getCurrentUser,
  removeCurrenUser
};
