import React from 'react';
import { Row, Col, Button, Thumbnail, Badge, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import IconCheckout from './iconCheckout';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import swal from 'sweetalert';

import styled from 'styled-components';

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
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 10px
`;

const formatReal = (int) => {
    let tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ".$1");
    if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1.$2");
    return tmp;
}

const handleProduct = (id) => {
    const element = document.querySelector(`#${id}`);

    if(element.value > 0){
        console.log(IconCheckout);
    } else {
        swal("Ops!", "Escolha a quantidade do produto.", "error");
    }

}

const ProductItem = (props) => (
    <Query
      query={gql`
        {
          allProducts {
              id
              name
              price
          }
        }
      `}
    >   
        
      {({ loading, error, data, props }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.allProducts.map(({ id, name, price }) => (
            <Col xs={6} md={4} key={id}>
                <Thumbnail>
                    <Image src="/thumbnaildiv.png"  />
                    <ContentThumb>
                    <h3>{name}</h3>
                    <p>Preço: <Badge>${formatReal(price)}</Badge></p>
                    <hr />
                    <Form inline>
                    <Row>
                        <FormGroup controlId="formInlineName">
                            <Col xs={6} md={6}>
                                <ControlLabel>QTD:</ControlLabel> 
                                <FormControl type="number" id={id} placeholder="Ex: 1" />
                            </Col>
                            <Col xs={6} md={6}>
                                <Button bsStyle="success" onClick={() => handleProduct(id)}>COMPRAR</Button>
                            </Col>
                        </FormGroup>
                    </Row>
                    </Form>
                    </ContentThumb>
                </Thumbnail>
            </Col>
        ));
      }}
    </Query>
  );

export default class Product extends React.Component {
  render() {
    return (
        <Row>
            <ProductItem />
            <IconCheckout isActive={false} />
        </Row>
    );
  }
}