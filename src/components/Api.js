export default class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    //получить ответ
    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
  //получаем данные пользователя
    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', { 
            method: 'GET',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    //получаем массив карточек
    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    //метод добавления карточки
    addNewCard(newCard) {
        return fetch(this._baseUrl + '/cards/', {
            method: 'POST',
            header: this._headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            }),
        })
        .then(this._handleResponse)
    }

    //метод удаления карточки
    deleteCard(cadrId) {
        return fetch(this._baseUrl + '/cards/' + `${cadrId}`, {
          method: `DELETE`,
          header: this._headers
        })
        .then(this._handleResponse)
    }

    //редактирование данных профайла
    patchUserInfo(userInfo) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            header: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            }),
        })
        .then(this._handleResponse)
    }

    //редактирование аватара
    pathUserAvatar(userAvatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            header: this._headers,
            body: JSON.stringify({
                avatar: userAvatar.avatar
            }),
        })
        .then(this._handleResponse)
    }

    //поставить лайк
    handleLikeCard(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + `${cardId}`, {
            method: 'PUT',
            header: this._headers,
        })
        .then(this._handleResponse)
    }

    //убрать лайк
    handleDislikeCard(cardId) {
        return fetch(this._baseUrl + '/cards/likes/' + `${cardId}`, {
            method: 'DELETE',
            header: this._headers,
        })
        .then(this._handleResponse)
    }
}

    /*getInitialData() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }*/