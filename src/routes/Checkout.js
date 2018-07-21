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

export default class Login extends React.Component  {
    constructor(props, context) {
        super(props, context);

        this.state = {
            email: '',
            password: '',
            data: []
        };
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
                  }
                }
              }
            `
            })
        .then(result => data = result.data); 
        this.setState({
          data: data.Profile.carts
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
              }
              }
            }
          }`
      });
      this.setState({
        data: response.data.removeFromProfileOnCart.profileProfile.carts
      })
  }
  componentWillMount(){
    if(session){
      this.getCartItems();
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
                  <th width="150">Preço</th>
                  <th width="200">Total</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(({ id, quantity, price, product }) => (
                  <tr key={id}>
                    <td>
                      <LinkRemove onClick={() => this.removeItemCart(id)}><Glyphicon glyph="glyphicon glyphicon-trash" /></LinkRemove>
                    </td>
                    <td>{product}</td>
                    <td>{quantity}</td>
                    <td>{price}</td>
                    <td>$969.99</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3"></td>
                  <td><br/><h4>Subtotal: 5.343</h4></td>
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