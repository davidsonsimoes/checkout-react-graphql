import React from 'react';
import { Link } from 'react-router-dom';
import Product from './components/Product';
import { Grid, Row, Col, Jumbotron, Alert } from 'react-bootstrap';
import client from './services/Apollo';
import { ApolloProvider } from "react-apollo";
import styled from 'styled-components';
import Utils, { SessionManager }  from './utils/Utils';
import Services from './services/Services';

const Header = styled.div`
  height: 60px;
  width: 100%;
  display: block;
  color: #ffffff;
  background-color: #000000;
  z-index: 2;
  margin-bottom: 20px
`;
const TitleName = styled.h2`
  text-align: left;
  padding: 12px 0 0 20px;
  margin: 0 0 0 0;
`;
const LinkExit = styled.a`
  color: #ffffff;
  position: absolute;
  top: 16px;
  right: 18px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
`;

export default class Home extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
        isAuthenticated: SessionManager.getSessionID(),
        isLoading: true,
        discount: null,
        data: []
    };
  }
  componentWillMount() {
    this.loginSession();
  }
  async checkDiscount(company) {
    let data = await Services.checkDataDiscount();
    var countries = data.filter(function (discount, index, array) {
      if(discount.company.toUpperCase() == company.toUpperCase()){
        return discount; 
      } 
    });
    this.setState({
      discount: countries
    })
  }
  async getData() {
    let data = await Services.getDataLogin();
    if(data){
      this.checkDiscount(data.company);
      this.setState({
        isAuthenticated: true,
        data: data,
        isLoading: false
      }) 
    } else {
      Utils.logout()
    }
}
  loginSession() {
    if(this.state.isAuthenticated) {
      this.getData();
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  render() {
    return (
      <div className="App">
        {this.state.isLoading ? 
        <div>Carregando...</div> : 
        <div>
          {this.state.isAuthenticated ? 
            <Header>
              <TitleName>{this.state.data.company}</TitleName>
              <LinkExit onClick={() => Utils.logout()}>Sair</LinkExit>
            </Header> : ''}
          <Grid>
            <Row>
              <Col xs={3} md={1}></Col>
              <Col xs={6} md={10}>
                {this.state.isAuthenticated ? 
                  <div>
                    <Alert bsStyle="info">
                      <strong>Bem vindo {this.state.data.name}</strong>!<br/> Veja a lista de produtos abaixo e ecolha quais e a quantidade que melhor lhe atende.
                    </Alert>
                    <ApolloProvider client={client}>
                      <Product discount={this.state.discount} />
                    </ApolloProvider>
                  </div>  : 
                <div><br/>
                <Jumbotron>
                    <h1>Venda de anúncios GDP</h1>
                    <p>
                      Veja a lista de produtos abaixo e ecolha quais e a quantidade que melhor lhe atende, caso nao esteja logado será solicitado o login ou <Link to="/login">entre agora</Link> com seus dados.
                    </p>
                  </Jumbotron>
                  <ApolloProvider client={client}>
                    <Product />
                  </ApolloProvider>
                </div>
                }
              </Col>
              <Col xs={3} md={1}></Col>
            </Row>
          </Grid>
          </div>
        }
      </div>
    );
  }
}