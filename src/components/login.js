import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';
import gql from 'graphql-tag';
// import swal from 'sweetalert';
import client from '../services/Apollo'

export default class Login extends React.Component  {
    state = { 
        email: "davidson.simoes22@gmail.com"
    };
  async checkUser(e) {
      e.preventDefault();
        let data = [];
        await client.query({
            query: gql`
            {
                Profile(email: "${this.state.email}"){
                  name,
                  email,
                  password
                }
              }
            `
            })
        .then(result => data = result);
        console.log(data)
  }
  render() {
    return (
      <div className="App">
        <Panel bsStyle="info">
            <Panel.Heading>
            <Panel.Title componentClass="h3">LOGIN</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
            <Form>
                <Row>
                <Col sm={12}>
                    <FormGroup>
                    <ControlLabel>E-mail</ControlLabel>
                    <FormControl type="email" placeholder="Email" />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm={12}>
                    <FormGroup>
                        <ControlLabel>Senha</ControlLabel>
                        <FormControl type="senha" placeholder="Senha" />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm={12}>
                    <FormGroup>                    
                    <Button type="submit" onClick={(e) => this.checkUser(e)}>Entrar</Button>
                    </FormGroup>
                </Col>
                </Row>
            </Form>
            </Panel.Body>
        </Panel>
      </div>
    );
  }
}