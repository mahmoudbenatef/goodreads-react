import session from "./ENUM";
const setSessionToken = (tokenId, token) => {
  sessionStorage.setItem(tokenId, JSON.stringify(token));
};
const getSessionToken = (tokenId) => {
  return JSON.parse(sessionStorage.getItem(tokenId));
};
const removeSessionToken = () => {
  sessionStorage.removeItem(session.token);
};
const setSessionUser = (userId, user) => {
  sessionStorage.setItem(userId, JSON.stringify(user));
};
const getSessionUser = (userId) => {
  return JSON.parse(sessionStorage.getItem(userId));
};
const removeSessionUser = () => {
  sessionStorage.removeItem(session.currentUser);
};
const setToken = (token) => {
  setSessionToken(session.token, token);
};
const getToken = () => getSessionToken(session.token);
const removeToken = () => removeSessionToken();


const setCurrentUser = (user) => {
  setSessionUser(session.currentUser, user);
};
const removeCurrentUser = () => removeSessionUser();
const getCurrentUser = () => getSessionUser(session.currentUser);

export  const mySessionStorage =  {
  setToken,
  getToken,
  removeToken,
  setCurrentUser,
  getCurrentUser,
  removeCurrentUser
};
