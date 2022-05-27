export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userNameSelector = document.querySelector(userNameSelector);
        this._userInfoSelector = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameSelector.textContent,
            info: this._userInfoSelector.textContent
        };
    }

    setUserInfo(userData) {
        this._userNameSelector.textContent = userData.firstname;
        this._userInfoSelector.textContent = userData.about;
    }
}