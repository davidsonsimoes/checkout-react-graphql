import React from 'react';
import { Link } from 'react-router-dom';
import Product from './components/product';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

import client from './services/Apollo';
import { ApolloProvider } from "react-apollo";

export default class Home extends React.Component  {
  render() {
    return (
      <div className="App">
      <br/>
        <Grid>
          <Row>
            <Col xs={3} md={1}></Col>
            <Col xs={6} md={10}>
              <Jumbotron>
                <h1>Venda de anúncios GDP</h1>
                <p>
                  Veja a lista de produtos abaixo e ecolha quais e a quantidade que melhor lhe atende, caso nao esteja logado será solicitado o login ou <Link to="/login">entre agora</Link> com seus dados.
                </p>
              </Jumbotron>

              <ApolloProvider client={client}>
                <Product />
              </ApolloProvider>
            </Col>
            <Col xs={3} md={1}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}