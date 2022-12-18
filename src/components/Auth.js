export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  console.log(password, '########', email);
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .catch(console.log);
};

export function checkLog(password, email) {
  console.log(password, '########', email);
}

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .catch(console.log);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`,{
    method:'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
  } 
  })
  .then(res => res.json())
  .then(({data})=>data)
  .catch(console.log);
}