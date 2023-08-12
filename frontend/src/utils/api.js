// VARIABLES
const BASE_URL = "https://api.mesto.ld-webdev.ru";

// MAKE REQUEST TO THE SERVER
function makeRequest(url, method, body) {
  const headers = { "Content-Type": "application/json" };
  const config = { method, headers, credentials: "include" };
  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, config).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  });
}

// REGISTRATION USER
export function register({ password, email }) {
  return makeRequest("/signup", "POST", { password, email });
}

// AUTHORIZATION USER
export function authorize({ password, email }) {
  return makeRequest("/signin", "POST", { password, email });
}

// LOGOUT USER
export function logout() {
  return makeRequest("/users/me", "DELETE");
}

// GET USER CONTENT FROM THE SERVER
export function getContent() {
  return makeRequest("/users/me", "GET");
}

// GET USER INFO
export function getUserInfo() {
  return makeRequest("/users/me", "GET");
}

// SEND USER INFO
export function setUserInfo({ name, about }) {
  return makeRequest("/users/me", "PATCH", { name, about });
}

// SET USER AVATAR
export function setUserAvatar({ avatar }) {
  return makeRequest("/users/me/avatar", "PATCH", { avatar });
}

// GET INITIAL CARDS
export function getInitialCards() {
  return makeRequest("/cards", "GET");
}

// SEND NEW CARD INFO
export function sendNewCardInfo({ name, link }) {
  return makeRequest("/cards", "POST", { name, link });
}

// DELETE CARD
export function deleteCard(id) {
  return makeRequest(`/cards/${id}`, "DELETE");
}

// CHANGE LIKE CARD STATUS
export function changeLikeCardStatus(id, isLiked) {
  let method;
  isLiked ? (method = "DELETE") : (method = "PUT");
  return makeRequest(`/cards/${id}/likes`, method);
}
