class Api {
    constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
     // this._authorization = options.headers.authorization;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo() {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/users/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
    }
  
    getInitialCards() {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
    }
  
    setUserInfo(name, about) {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, about })
      })
      .then(this._checkResponse)
    }
  
    addNewCard(name, link) {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
        body: JSON.stringify({ name, link })
      })
      .then(this._checkResponse)
    }
  
    getLikes() {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/cards`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
    }
  
    deleteCard(cardId) {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
    }
  
    addLike(cardId) {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
    }
  
    deleteLike(cardId) {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(this._checkResponse)
    }
  
    changeAvatar(avatar) {
      const token = localStorage.getItem("token");
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
        },   
        body: JSON.stringify({avatar})
      })
      .then(this._checkResponse)
    }  
  }

const api = new Api({
    url: 'https://api.domainoksana.nomoredomainsrocks.ru'
    // url: 'http://localhost:3000'
});

export default api;