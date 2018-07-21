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
    static formatReal (int) {
        let tmp = int+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
        return tmp;
    }
}