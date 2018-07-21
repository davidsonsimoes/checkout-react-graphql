import React from 'react';
import { Row, Col, Button, Thumbnail, Badge, FormGroup, ControlLabel, Form, Label } from 'react-bootstrap';
import IconCheckout from './iconCheckout';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import client from '../services/Apollo'
import styled from 'styled-components';

const session = sessionStorage.getItem('loginId');

const Image = styled.img`
  max-width: 242px;
  width: 100%;
  display: block;
  height: auto;
  margin: 10px auto
`;
const ContentThumb = styled.div`
  text-align: center;
`;
const FormControl = styled.input`
  width: 50px;
  height: 35px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 0 10px
`;
const BoxDiscount = styled.div`
    position: absolute;
    top: 57px;
    width: 90%;
    background-color: #8a8a8a;
    color: #ffffff;
    padding: 10px 0;
    margin-left: -4%;
`;

export default class Product extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            data: [],
            isCheckoutVisible: false,
            qtd: 0
        };
    }
    formatReal = (int) => {
        let tmp = int+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
        return tmp;
    }
    async getQuantityCart() {
        let data = [];
        await client.query({
            query: gql`{
                Profile(id: "${session}"){
                  id,
                  carts{
                    quantity
                  }
                }
              }
            `
            })
        .then(result => data = result.data);
        var sum = 0;
         for (var i = 0; i < data.Profile.carts.length; i++) {
            sum += data.Profile.carts[i].quantity
        }   
        if(sum > 0){
            this.setState({
                isCheckoutVisible: true,
                qtd: sum
            });
        }
  }
    async registerCart(name, price, qtd){
        let total = qtd * price;
        await client.mutate({
            mutation: gql`
                mutation {
                    createCart (
                        price: ${price}
                        product: "${name}"
                        quantity: ${qtd}
                        profileId: "${session}"
                        total: ${total}
                ){
                    id
                    quantity
                    product
                }
            }`
          });
    }
    handleProduct(id, name, price){
        const element = document.querySelector(`#${id}`).value;
        if(element > 0){
            let qtd = this.state.qtd + parseInt(element.substring(element.length - 1));
            this.registerCart(name, price, element)
            this.setState({
                isCheckoutVisible: true,
                qtd: qtd
            });
        } else {
            swal("Ops!", "Escolha a quantidade do produto.", "error");
        }
    }
  async getDataProduct() {
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
        this.setState({data: data.allProducts})
  }
  checkDiscount(company) {
      if(!session){
          return
      }
      for (let i = 0; i < this.props.discount.length; i++) { 
        if(session && this.props.discount[i].product === company) {
            return true
        }
     }
  }
  componentWillMount() {
    this.getDataProduct();
    session ? this.getQuantityCart() : '';
  }
  render() {
    if(session && !this.props.discount) {
        return null
    }
    return (
        <div> 
            {this.state.data.map(({ id, name, price, productId }) => (
                <Col xs={6} md={4} key={id}>
                    <Thumbnail>
                        <Image src="/thumbnaildiv.png"  />
                        <ContentThumb>
                        <h3>{name}</h3>
                        {this.checkDiscount(productId) ? <BoxDiscount><Label bsStyle="danger">PROMOÇÃO</Label> especial para sua empresa</BoxDiscount> : ''}
                        <p>Preço: <Badge>${this.formatReal(price)}</Badge></p>
                        <hr />
                        <Form inline>
                        <Row>
                            <FormGroup controlId="formInlineName">
                                <Col xs={6} md={6}>
                                    <ControlLabel>QTD:</ControlLabel> 
                                    <FormControl type="number" id={id} placeholder="Ex: 1" />
                                </Col>
                                <Col xs={6} md={6}>
                                    <Button bsStyle="success" onClick={() => this.handleProduct(id, name, price)}>COMPRAR</Button>
                                </Col>
                            </FormGroup>
                        </Row>
                        </Form>
                        </ContentThumb>
                    </Thumbnail>
                </Col>
            ))}
            <IconCheckout isActive={this.state.isCheckoutVisible} qtd={this.state.qtd} />
        </div>
    );
  }
}