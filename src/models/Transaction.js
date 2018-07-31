export class Transaction {
    constructor(product, price, productId, profile, quantity, total, totalDiscount) {
        this.product = product;
        this.price = price;
        this.productId = productId;
        this.profile = profile;
        this.quantity = quantity;
        this.total = this.getTotal();
        this.totalDiscount = totalDiscount;
    }

    getTotal(){
        return this.quantity * this.price
    }
}