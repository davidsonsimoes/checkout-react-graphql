import React from 'react';
import { Grid, Row, Col, Tooltip, OverlayTrigger, PageHeader, Breadcrumb, Table, Button, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import Utils, { SessionManager }  from '../utils/Utils';
import Services from '../services/Services';

const Footercheckout = styled.div`
  text-align: right
`;
const LinkRemove = styled.a`
  text-align: center;
  display: table;
  margin: 0 auto;
`;

const tooltip = (
  <Tooltip id="tooltip">
    <strong>Chega né?</strong> isso é só um teste =P
  </Tooltip>
);

export default class Checkout extends React.Component  {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            email: '',
            password: '',
            data: [],
            totalPrice: 0,
            discount: [],
            totalDiscount: 0
        };
    }
  async getCartItems() {
      let data = await Services.getDataCart();
      this.setState({
        data: data.Profile.carts
      })
      this.totalPrice();
  }

  async checkDiscount(company) {
    let data = await Services.checkDataDiscount();
    var countries = data.filter(function (discount, index, array) {
      if(discount.company.toUpperCase() == company.toUpperCase()){
        return discount; 
      } 
    });
    this.setState({discount: countries})
  }
  async getDataProfile() {
    let data = await Services.getDataLogin();
    if(data){
      this.checkDiscount(data.company);
    } else {
      Utils.logout()
    }
}
  totalPrice(){
    let total = 0;
    let totalDiscount = 0;
    for (var i = 0; i < this.state.data.length; i++) {
        total += this.state.data[i].total
        totalDiscount += this.state.data[i].totalDiscount
    }
    this.setState({
      totalPrice: total,
      totalDiscount: totalDiscount
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
    if(SessionManager.getSessionID()){
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
                  <th width="220">Total com desconto</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(({ id, quantity, price, product, total, totalDiscount}) => (
                  <tr key={id}>
                    <td>
                      <LinkRemove onClick={() => this.removeItemCart(id)}><Glyphicon glyph="glyphicon glyphicon-trash" /></LinkRemove>
                    </td>
                    <td>{product}</td>
                    <td>{quantity}</td>
                    <td>${Utils.formatReal(price)}</td>
                    <td>${Utils.formatReal(total)}</td>
                    <td>${Utils.formatReal(totalDiscount)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4"></td>
                  <td><br/><h4>Subtotal: ${this.state.totalPrice > 0 ? Utils.formatReal(this.state.totalPrice) : ''}</h4></td>
                  <td><h2>Total: ${this.state.totalDiscount > 0 ? Utils.formatReal(this.state.totalDiscount) : ''}</h2></td>
                </tr>
              </tbody>
            </Table>
            <Footercheckout>
              <OverlayTrigger placement="top" overlay={tooltip}>
                <Button bsStyle="success" bsSize="large">
                  FINALIZAR
                </Button>
              </OverlayTrigger>
              
            </Footercheckout>
            </Col>
            <Col md={1}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}