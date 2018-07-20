import React from 'react';
import { Link } from 'react-router-dom';
import Product from './components/product';
import { Grid, Row, Col, Jumbotron, Alert } from 'react-bootstrap';
import client from './services/Apollo';
import { ApolloProvider } from "react-apollo";
import gql from 'graphql-tag';
import styled from 'styled-components';

const session = sessionStorage.getItem('loginId');

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
        name: '',
        id: '',
        company: '',
        isAuthenticated: false,
        isLoading: true
    };
}
  logout(e) {
    e.preventDefault();
    sessionStorage.removeItem('loginId');
    window.location.href = '/';
  }
  componentWillMount() {
    this.loginSession();
  }
  async getData() {
    let data = [];
    await client.query({
        query: gql`
        {
            Profile(id: "${session}"){
              id,
              name,
              company
            }
          }
        `
        })
    .then(result => data = result);
    if(data.data.Profile.id){
      this.setState({
        isAuthenticated: true,
        name: data.data.Profile.name,
        id: data.data.Profile.id,
        company: data.data.Profile.company,
        isLoading: false
      })
    }
}
  loginSession() {
    if(session) {
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
              <TitleName>{this.state.company}</TitleName>
              <LinkExit onClick={(e) => this.logout(e)}>Sair</LinkExit>
            </Header> : ''}
          <Grid>
            <Row>
              <Col xs={3} md={1}></Col>
              <Col xs={6} md={10}>
                {this.state.isAuthenticated ? 
                  <Alert bsStyle="info">
                  <strong>Bem vindo {this.state.name}</strong>!<br/> Veja a lista de produtos abaixo e ecolha quais e a quantidade que melhor lhe atende.
                </Alert> : 
                <div><br/>
                <Jumbotron>
                    <h1>Venda de anúncios GDP</h1>
                    <p>
                      Veja a lista de produtos abaixo e ecolha quais e a quantidade que melhor lhe atende, caso nao esteja logado será solicitado o login ou <Link to="/login">entre agora</Link> com seus dados.
                    </p>
                  </Jumbotron>
                </div>
                }
                <ApolloProvider client={client}>
                  <Product />
                </ApolloProvider>
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