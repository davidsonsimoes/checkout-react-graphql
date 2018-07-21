class Utils {

    static _instance;

    constructor() {
        this.session = sessionStorage.getItem('loginId');
        this.isAuthenticated();
    }

    isAuthenticated() {
        if(this.session){
            return this.session
        }
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
export const utilsManager = Utils.Instance;

export default class staticUtils {
    static logout() {
        sessionStorage.removeItem('loginId');
        window.location.href = '/'
    }
}