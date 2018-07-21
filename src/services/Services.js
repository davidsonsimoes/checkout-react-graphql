import client from './Apollo';
import gql from 'graphql-tag';

export default class Services {
    static async getDataLogin(token) {
        if(token){
            let data = [];
            await client.query({
                query: gql`
                {
                    Profile(id: "${token}"){
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
}