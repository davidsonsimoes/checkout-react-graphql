export class Transaction {
    constructor(product, price, productId, profile, quantity, total, totalDiscount) {
        this._product = product;
        this._price = price;
        this._productId = productId;
        this._profile = profile;
        this._quantity = quantity;
        this._total = this.total();
        this._totalDiscount = totalDiscount;
    }
    getName(){
        return this._product
    }
    getPrice(){
        return this._price
    }
    getProductId(){
        return this._productId
    }
    getProfile(){
        return this._profile
    }
    getQuantity(){
        return this._quantity
    }
    getTotal(){
        return this._total
    }
    total(){
        return this._quantity * this._price
    }
}