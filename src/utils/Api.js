class Api {
  constructor({ baseUrl, headers, options }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.options = options;
  }

  _checkResponce() {
    return (res) => {
      if (res.ok) {
        return res.json().then(({ data }) => data);
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
      ...this.options,
    }).then(this._checkResponce());
  }

  changeUserInfo(values) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      ...this.options,
      body: JSON.stringify({
        ...values,
      }),
    }).then(this._checkResponce());
  }

  addNewCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      ...this.options,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponce());
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      ...this.options,
    }).then(this._checkResponce());
  }

  changeLikeCardStatus(cardId, condition) {
    return condition ? this._addLike(cardId) : this._removeLike(cardId);
  }

  _addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers,
      ...this.options,
    }).then(this._checkResponce());
  }

  _removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      ...this.options,
    }).then(this._checkResponce());
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
      ...this.options,
    }).then(this._checkResponce());
  }

  changeAvatar(url) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      ...this.options,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponce());
  }
}

export default Api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  options: { credentials: 'include' },
});
