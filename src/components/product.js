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
    state = { 
        data: [],
        isCheckoutVisible: false,
        qtd: 0
    };
    formatReal = (int) => {
        let tmp = int+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
        return tmp;
    }

    handleProduct = (id) => {
        const element = document.querySelector(`#${id}`).value;
        if(element > 0){
            let qtd = this.state.qtd + parseInt(element.substring(element.length - 1), 10);
            this.setState({
                isCheckoutVisible: true,
                qtd: qtd
            })
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
                    }
                }
            `
            })
        .then(result => data = result.data);
        console.log(data, this.props.discount);
        this.setState({data: data.allProducts})
  }
  checkDiscount(id) {
      if(!session){
          return
      }
      console.log(this.props.discount);
        for (let i = 0; i < this.props.discount.length; i++) { 
            console.log(this.props.discount[i].product.id);
            if(session && this.props.discount[i].product.id === id) {
                return true
            }
        }
  }
  componentWillMount() {
    this.getDataProduct();
  }
  render() {
    if(session && !this.props.discount) {
        return null
    }
    return (
        <div> 
            {this.state.data.map(({ id, name, price }) => (
                <Col xs={6} md={4} key={id}>
                    <Thumbnail>
                        <Image src="/thumbnaildiv.png"  />
                        <ContentThumb>
                        <h3>{name}</h3>
                        {/* {this.checkDiscount(id) ? <BoxDiscount><Label bsStyle="danger">PROMOÇÃO</Label> especial para sua empresa</BoxDiscount> : ''} */}
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
                                    <Button bsStyle="success" onClick={() => this.handleProduct(id)}>COMPRAR</Button>
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