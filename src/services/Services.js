import client from './Apollo';
import gql from 'graphql-tag';
import { utilsManager }  from '../utils/Utils';


export default class Services {
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
    static async registerDataCart(name, price, qtd){
        let total = qtd * price;
        await client.mutate({
            mutation: gql`
                mutation {
                    createCart (
                        price: ${price}
                        product: "${name}"
                        quantity: ${qtd}
                        profileId: "${utilsManager.isAuthenticated()}"
                        total: ${total}
                ){
                    id
                    quantity
                    product
                }
            }`
        });
    }
}


// class Services {
//     static _instance;


//     async getDataLogin() {
//         if(utilsManager.isAuthenticated()){
//             let data = [];
//             await client.query({
//                 query: gql`
//                 {
//                     Profile(id: "${utilsManager.isAuthenticated()}"){
//                     id,
//                     name,
//                     company
//                     }
//                 }
//                 `
//                 })
//             .then(result => data = result.data);
//             return data.Profile;
//         }
//     }
//     async getDataProduct() {
//         let data = [];
//         await client.query({
//             query: gql`
//                 {
//                     allProducts {
//                         id
//                         name
//                         price
//                         productId
//                     }
//                 }
//             `
//             })
//         .then(result => data = result.data);
//         return data;
//     }
//     async getDataQuantityCart() {
//         if(utilsManager.isAuthenticated()){
//             let data = [];
//             await client.query({
//                 query: gql`{
//                     Profile(id: "${utilsManager.isAuthenticated()}"){
//                         id,
//                         carts{
//                         quantity
//                         }
//                     }
//                     }
//                 `
//                 })
//             .then(result => data = result.data);
//             return data;
//         }
//     }
//     async checkDataDiscount(){
//         let data = [];
//         await client.query({
//             query: gql`
//             {
//             allDiscounts{
//                 id
//                 discount
//                 company
//                 quantity
//                 product
//             }
//             }
//             `
//             })
//         .then(result => data = result);
//         return data.data.allDiscounts;
//     }
//     async registerDataCart(name, price, qtd){
//             let total = qtd * price;
//             await client.mutate({
//                 mutation: gql`
//                     mutation {
//                         createCart (
//                             price: ${price}
//                             product: "${name}"
//                             quantity: ${qtd}
//                             profileId: "${utilsManager.isAuthenticated()}"
//                             total: ${total}
//                     ){
//                         id
//                         quantity
//                         product
//                     }
//                 }`
//             });
//         }

//     static get Instance() {
//         return this._instance || (this._instance = new this());
//     }   
// }

// export const services = Services.Instance;