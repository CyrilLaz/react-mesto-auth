const {REACT_APP_BASE_URL='http://localhost:3000'} = process.env;

export const register = (password, email) => {
  return fetch(`${REACT_APP_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    return response.json();
  });
};

export const login = (password, email) => {
  return fetch(`${REACT_APP_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials : 'include',
    body: JSON.stringify({ password, email }),
  }).then((response) => {
    return response.json();
  });
};

export const logout = () => {
  return fetch(`${REACT_APP_BASE_URL}/signout`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((response) => response.json());
};
