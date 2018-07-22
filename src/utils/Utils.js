class Session {

    static _instance;

    constructor() {
        this.session = sessionStorage.getItem('loginId');
        this.getSessionID();
    }

    getSessionID() {
        if(this.session){
            return this.session
        }
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
export const SessionManager = Session.Instance;

export default class Utils {
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
    static validateEmail(email){
        let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }
    static checkDiscountCompany(company){
        console.log(company);
    }
}