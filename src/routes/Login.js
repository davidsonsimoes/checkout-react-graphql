import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
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