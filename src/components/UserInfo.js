export default class UserInfo {
    constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._userAvatar = document.querySelector(avatarSelector);
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
        this._userAvatar.src = userData.avatar;
    }

    setUserAvatar(avatarData) {
        this._userAvatar.src = avatarData.avatar;
    }
}