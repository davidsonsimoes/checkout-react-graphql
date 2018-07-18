import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';

export default class register extends React.Component  {
  render() {
    return (
        <Panel bsStyle="info">
            <Panel.Heading>
                <Panel.Title componentClass="h3">CADASTRO</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <Form>
                <Row>
                    <Col sm={6}>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Nome</ControlLabel>
                        <FormControl type="nome" placeholder="Nome" />
                    </FormGroup>
                    </Col>
                    <Col sm={6}>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Empresa</ControlLabel>
                        <FormControl type="empresa" placeholder="Empresa" />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>E-mail</ControlLabel>
                        <FormControl type="email" placeholder="Email" />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Senha</ControlLabel>
                        <FormControl type="password" placeholder="Senha" />
                    </FormGroup>
                    </Col>
                    <Col sm={6}>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Repetir Senha</ControlLabel>
                        <FormControl type="password" placeholder="Repetir Senha" />
                    </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                    <FormGroup>
                        <Button type="submit">Cadastrar</Button>
                    </FormGroup>
                    </Col>
                </Row>
                </Form>
            </Panel.Body>
        </Panel>
    );
  }
}