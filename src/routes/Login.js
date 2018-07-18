import React from 'react';
import { Grid, Row, Col, PageHeader, Alert, Breadcrumb } from 'react-bootstrap';
import Login from   '../components/login';
import Register from   '../components/register';

export default class Example extends React.Component  {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={3} md={1}></Col>
            <Col xs={6} md={10}>
              <PageHeader>
                Venda de anúncios GDP
              </PageHeader>
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Login</Breadcrumb.Item>
                </Breadcrumb>
              <Alert bsStyle="warning">
                <strong>Entre</strong> com seu login ou <strong>cadastre-se</strong> caso nao tenha acesso.
              </Alert>
            </Col>
            <Col xs={3} md={1}></Col>
          </Row>
          <Row className="show-grid">
            <Col md={1}></Col>
            <Col xs={6} md={4}>
              <Login />
            </Col>
            <Col xs={6} md={6}>
              <Register />
            </Col>
            <Col md={1}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}