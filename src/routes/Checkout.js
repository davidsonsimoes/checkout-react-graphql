import React from 'react';
import { Grid, Row, Col, Form, FormGroup, PageHeader, Breadcrumb, Alert, Table, Button, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import staticUtils, { utilsManager }  from '../utils/Utils';
import Services from '../services/Services';

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
            totalPrice: 0,
            discount: []
        };
    }
  async getCartItems() {
      let data = await Services.getDataCart();
      this.setState({
        data: data.Profile.carts
      })
      this.totalPrice();
  }
  calcDiscount(id, quantity, price, product, total, productId){
    for (let i = 0; i < this.state.discount.length; i++) { 
        if(this.state.discount[i].product === productId) {
          console.log(productId, price, quantity)
          return staticUtils.formatReal(29899);
        } else {
          return staticUtils.formatReal(total)
        }
    }
  }
  async checkDiscount(company) {
    let data = await Services.checkDataDiscount();
    var countries = data.filter(function (discount, index, array) {
      if(discount.company.toUpperCase() == company.toUpperCase()){
        return discount; 
      } 
    });
    this.setState({discount: countries})
    // this.calcDiscount(countries);
  }
  async getDataProfile() {
    let data = await Services.getDataLogin();
    if(data){
      this.checkDiscount(data.company);
    } else {
      staticUtils.logout()
    }
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
    let response = await Services.removeDataItemCart(id);
      this.setState({
        data: response.data.removeFromProfileOnCart.profileProfile.carts
      })
      this.totalPrice()
      window.location.href = '/checkout'
    
  }
  componentDidMount(){
    if(utilsManager.isAuthenticated()){
      this.getCartItems();
      this.getDataProfile();
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
                {this.state.data.map(({ id, quantity, price, product, total, productId}) => (
                  <tr key={id}>
                    <td>
                      <LinkRemove onClick={() => this.removeItemCart(id)}><Glyphicon glyph="glyphicon glyphicon-trash" /></LinkRemove>
                    </td>
                    <td>{product}</td>
                    <td>{quantity}</td>
                    <td>${staticUtils.formatReal(price)}</td>
                    <td>${staticUtils.formatReal(total)}</td>
                    <td>${this.calcDiscount(id, quantity, price, product, total, productId)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4"></td>
                  <td><br/><h4>Subtotal: ${this.state.totalPrice > 0 ? staticUtils.formatReal(this.state.totalPrice) : ''}</h4></td>
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