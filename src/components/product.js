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

// Fetch GraphQL data with a Query component
const ExchangeRates = () => (
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
                    <p>Preço: <Badge>{price}</Badge></p>
                    <hr />
                    <Form inline>
                    <Row>
                        <Col xs={6} md={6}>
                        <FormGroup controlId="formInlineName">
                            <ControlLabel>QTD:</ControlLabel> 
                            <FormControl type="number" placeholder="Ex: 1" />
                        </FormGroup>
                        </Col>
                        <Col xs={6} md={6}>
                        <Button bsStyle="success">COMPRAR</Button>
                        </Col>
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
      console.log(this.props);
    return (
        <Row>
            <ExchangeRates />
        </Row>
    );
  }
}