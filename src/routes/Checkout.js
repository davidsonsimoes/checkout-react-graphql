import React from 'react';
import { Grid, Row, Col, Form, FormGroup, PageHeader, Breadcrumb, Alert, Table, Button, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import gql from 'graphql-tag';
import client from '../services/Apollo'

const session = sessionStorage.getItem('loginId');

const Footercheckout = styled.div`
  text-align: right
`;
const LinkRemove = styled.a`
  text-align: center;
  display: table;
  margin: 0 auto;
`;

export default class Checkout extends React.Component  {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            email: '',
            password: '',
            data: [],
            totalPrice: 0
        };
    }
    formatReal = (int) => {
      let tmp = int+'';
      tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
      if( tmp.length > 6 )
              tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
      return tmp;
    }
    async getCartItems() {
        let data = [];
        await client.query({
            query: gql`{
                Profile(id: "${session}"){
                  id,
                  carts{
                    id
                    quantity
                    price
                    product
                    total
                  }
                }
              }
            `
            })
        .then(result => data = result.data); 
        console.log(data);
        this.setState({
          data: data.Profile.carts
        })
        this.totalPrice();
  }
  totalPrice(){
    var sum = 0;
    for (var i = 0; i < this.state.data.length; i++) {
        sum += this.state.data[i].total
    }
    this.setState({
      totalPrice: sum
    })
  }
  async removeItemCart(id){
    let response = await client.mutate({
        mutation: gql`
          mutation {
            removeFromProfileOnCart(
              cartsCartId: "${id}", 
              profileProfileId: "${session}"){
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
      this.setState({
        data: response.data.removeFromProfileOnCart.profileProfile.carts
      })
      this.totalPrice()
      window.location.href = '/checkout'
  }
  componentDidMount(){
    if(session){
      this.getCartItems();
      // window.location.href = '/checkout'
    } else {
      window.location.href = "/login"
    }
  }
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={3} md={1}></Col>
            <Col xs={6} md={10}>
              <PageHeader>
                Checkout GDP
              </PageHeader>
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col xs={3} md={1}></Col>
          </Row>
          <Row className="show-grid">
            <Col md={1}></Col>
            <Col xs={10} md={10}>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th width="170">Preço Unidade</th>
                  <th width="200">Total</th>
                  <th width="200">Total com desconto</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(({ id, quantity, price, product, total }) => (
                  <tr key={id}>
                    <td>
                      <LinkRemove onClick={() => this.removeItemCart(id)}><Glyphicon glyph="glyphicon glyphicon-trash" /></LinkRemove>
                    </td>
                    <td>{product}</td>
                    <td>{quantity}</td>
                    <td>${this.formatReal(price)}</td>
                    <td>${this.formatReal(total)}</td>
                    <td>${this.formatReal(total)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4"></td>
                  <td><br/><h4>Subtotal: ${this.state.totalPrice > 0 ? this.formatReal(this.state.totalPrice) : ''}</h4></td>
                  <td><h2>Total: 4.343</h2></td>
                </tr>
              </tbody>
            </Table>
            <Footercheckout>
              <Button bsStyle="success" bsSize="large">
                FINALIZAR
              </Button>
            </Footercheckout>
            </Col>
            <Col md={1}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}