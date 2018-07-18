import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';

export default class Login extends React.Component  {
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
                    <FormGroup controlId="formBasicText">
                    <ControlLabel>E-mail</ControlLabel>
                    <FormControl type="email" placeholder="Email" />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm={12}>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Senha</ControlLabel>
                        <FormControl type="senha" placeholder="Senha" />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm={12}>
                    <FormGroup>                    
                    <Button type="submit">Entrar</Button>
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