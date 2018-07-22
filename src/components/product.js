import React from 'react';
import { Row, Col, Button, Thumbnail, Badge, FormGroup, ControlLabel, Form, Label } from 'react-bootstrap';
import IconCheckout from './IconCheckout';
import swal from 'sweetalert';
import styled from 'styled-components';
import Utils, { SessionManager }  from '../utils/Utils';
import Services from '../services/Services';

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
            qtd: 0,
            isAuthenticated: SessionManager.getSessionID()
        };
    }
    async getQuantityCart() {
        let data = await Services.getDataQuantityCart();
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
    handleProduct(id, name, price, productId){
        const element = document.querySelector(`#${id}`).value;
        if(element > 0){
            let qtd = this.state.qtd + parseInt(element.substring(element.length - 1), 10);
            
            if(SessionManager.getSessionID()){Services.registerDataCart(name, price, element, productId)};

            this.setState({
                isCheckoutVisible: true,
                qtd: qtd
            });
        } else {
            swal("Ops!", "Escolha a quantidade do produto.", "error");
        }
    }
  async getProduct() {
    let data = await Services.getDataProduct();
    this.setState({data: data.allProducts})
  }
  checkDiscount(company) {
      if(!this.state.isAuthenticated){
          return
      }
      for (let i = 0; i < this.props.discount.length; i++) { 
        if(this.state.isAuthenticated && this.props.discount[i].product === company) {
            return true
        }
     }
  }
  componentWillMount() {
    this.getProduct();
    if(this.state.isAuthenticated){this.getQuantityCart()};
  }
  render() {
    if(this.state.isAuthenticated && !this.props.discount) {
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
                        <p>Preço: <Badge>${Utils.formatReal(price)}</Badge></p>
                        <hr />
                        <Form inline>
                        <Row>
                            <FormGroup controlId="formInlineName">
                                <Col xs={6} md={6}>
                                    <ControlLabel>QTD:</ControlLabel> 
                                    <FormControl type="number" id={id} placeholder="Ex: 1" />
                                </Col>
                                <Col xs={6} md={6}>
                                    <Button bsStyle="success" onClick={() => this.handleProduct(id, name, price, productId)}>COMPRAR</Button>
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