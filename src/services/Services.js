import client from './Apollo';
import gql from 'graphql-tag';
import { utilsManager }  from '../utils/Utils';

export default class Services {
    static async checkProfileDiscount(price, quantity, productId){

        let discount = await this.checkDataDiscount();
        let loginData = await this.getDataLogin();

            for (let i = 0; i < discount.length; i++) {                 
                if(discount[i].product === productId && discount[i].company === loginData.company.toUpperCase()) {
                  
                  let discountValue = discount[i].discount;
                  let discountQuantity = discount[i].quantity;

                  if(quantity >= discountQuantity) {
                    let numbers = Math.floor(quantity/discountQuantity);
                    return price * quantity - discountValue*numbers;
                  } 
        
                } 
            }
    }
    static async getDataLogin() {
        if(utilsManager.isAuthenticated()){
            let data = [];
            await client.query({
                query: gql`
                {
                    Profile(id: "${utilsManager.isAuthenticated()}"){
                    id,
                    name,
                    company
                    }
                }
                `
                })
            .then(result => data = result.data);
            return data.Profile;
        }
    }
    static async getDataProduct() {
        let data = [];
        await client.query({
            query: gql`
                {
                    allProducts {
                        id
                        name
                        price
                        productId
                    }
                }
            `
            })
        .then(result => data = result.data);
        return data;
    }
    static async getDataQuantityCart() {
        if(utilsManager.isAuthenticated()){
            let data = [];
            await client.query({
                query: gql`{
                    Profile(id: "${utilsManager.isAuthenticated()}"){
                        id,
                        carts{
                        quantity
                        }
                    }
                    }
                `
                })
            .then(result => data = result.data);
            return data;
        }
    }
    static async checkDataDiscount(){
        let data = [];
        await client.query({
            query: gql`
            {
            allDiscounts{
                id
                discount
                company
                quantity
                product
            }
            }
            `
            })
        .then(result => data = result);
        return data.data.allDiscounts;
    }
    static async registerDataCart(name, price, qtd, productId){
        let total = qtd * price;
        let totalDiscount = await this.checkProfileDiscount(price, qtd, productId)
        await client.mutate({
            mutation: gql`
                mutation {
                    createCart (
                        price: ${price}
                        product: "${name}"
                        productId: "${productId}"
                        quantity: ${qtd}
                        profileId: "${utilsManager.isAuthenticated()}"
                        total: ${total}
                        totalDiscount: ${totalDiscount ? totalDiscount : total}
                ){
                    id
                    quantity
                    product
                    productId
                }
            }`
        });
    }
    static async getLogin(email) {
        let data = [];
        await client.query({
            query: gql`
            {
                Profile(email: "${email}"){
                  id,
                  name,
                  email,
                  password
                }
              }
            `
            })
        .then(result => data = result);
        return data
   }
   static async sendRegistration(email, name, password, company){
        let data = await client.mutate({
            mutation: gql`
              mutation {
                result: createProfile(
                    email: "${email}"
                    name: "${name}"
                    password: "${password}"
                    company: "${company}"
                ) {
                    id,
                    name,
                    company
                }
              }
            `
          });
        return data;
   }
   static async getDataCart() {
        if(utilsManager.isAuthenticated()){
            let data = [];
            await client.query({
                query: gql`{
                    Profile(id: "${utilsManager.isAuthenticated()}"){
                    id,
                    carts{
                        id
                        quantity
                        price
                        product
                        total
                        productId
                        totalDiscount
                    }
                    }
                }
                `
                })
            .then(result => data = result.data); 
            return data;
        }
    }
    static async removeDataItemCart(id){
        let data = await client.mutate({
            mutation: gql`
              mutation {
                removeFromProfileOnCart(
                  cartsCartId: "${id}", 
                  profileProfileId: "${utilsManager.isAuthenticated()}"){
                    profileProfile {
                      id
                      carts {
                      quantity
                      price
                      product
                      total
                    }
                  }
                }
              }`
          });
        return data;
    }
}
