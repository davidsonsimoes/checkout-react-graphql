import React from 'react';
import { Row, Col, Button, Thumbnail, Badge, FormGroup, ControlLabel, Form } from 'react-bootstrap';

import { Query } from "react-apollo";
import gql from 'graphql-tag';

import styled from 'styled-components';

const Image = styled.img`
  width: 242px;
  display: block;
  height: 200px;
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

const validateQtd = (int) => {
    console.log('teste')
}

const ProductItem = () => (
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
      {({ loading, error, data }) => {
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
                        <FormGroup controlId="formInlineName" validationState={validateQtd()}>
                            <Col xs={6} md={6}>
                                <ControlLabel>QTD:</ControlLabel> 
                                <FormControl type="number" placeholder="Ex: 1" />
                            </Col>
                            <Col xs={6} md={6}>
                                <Button bsStyle="success">COMPRAR</Button>
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
  validateQtd() {
      console.log('teste')
  }
  render() {
      console.log(this.props);
    return (
        <Row>
            <ProductItem  />
        </Row>
    );
  }
}