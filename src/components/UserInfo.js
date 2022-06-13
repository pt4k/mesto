export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            info: this._userInfo.textContent,
        };
    }

    setUserInfo(userData) {
        this._userName.textContent = userData.firstname;
        this._userInfo.textContent = userData.about;
    }

    setUserInfo(avatarData) {
        this._avatarSelector.src = avatarData.avatar;
    }
}