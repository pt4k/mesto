export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent
        };
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.firstname;
        this._userInfo.textContent = userData.about;
    }
}