import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';
import swal from 'sweetalert';
import gql from 'graphql-tag';
import client from '../services/Apollo'

export default class register extends React.Component  {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            name: '',
            company: '',
            email: '',
            password: '',
            rePassword: '',
            isLoading: false
        };
    }
    async registration() {
      try {
        let response = await client.mutate({
            mutation: gql`
              mutation {
                result: createProfile(
                    company: "${this.state.company}"
                    email: "${this.state.email}"
                    name: "${this.state.name}"
                    password: "${this.state.password}"
                ) {
                    id,
                    company,
                    name
                }
              }
            `
          });
          const addedCompany = response.data;
          this.setState({ isLoading: false });
          if(addedCompany.result.company.toUpperCase() == 'UNILEVER' ||
                addedCompany.result.company.toUpperCase() == 'APPLE' ||
                addedCompany.result.company.toUpperCase() == 'NIKE' ||
                addedCompany.result.company.toUpperCase() == 'FORD'){
            swal("Cadastro Realizado!", `Bom saber que você é da ${addedCompany.result.company}, separamos um desconto especial para sua empresa.`, "success", { button: "Conferir" }).then(()=>{
                window.location.href = '/';
            });
        } else {
            swal("Cadastro Realizado!", "Confira nossa lista de anúncios.", "success", { button: "Conferir" }).then(()=>{
                window.location.href = '/';
            });
          }
        } catch (error) {
            error = error.toString();
            error.includes("Details: Field name = email") ? swal("Ops!", "Email já registrado.", "error") : '';
            this.setState({ isLoading: false });
        } 
    }
    checkValidationForm() {
        if(this.state.company != '',
        this.state.name != '',
        this.validateEmail(this.state.email),
        (this.state.rePassword != '' && this.state.password == this.state.rePassword)) { return true }
    }
    validateEmail(email){
        let re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }
    submitRegister() {
        this.setState({ isLoading: true });
        this.registration();
    }
    getValidationState(e) {
        e.preventDefault();
        this.state.rePassword !== this.state.password ? swal("Ops!", "As senhas não conferem.", "error") : '' ;
        this.validateEmail(this.state.email) ? '' : swal("Ops!", "Preencha um email válido.", "error");
        this.state.rePassword == '' ? swal("Ops!", "Repita sua senha.", "error") : '';
        this.state.password == '' ? swal("Ops!", "Preencha sua senha.", "error") : '';
        this.state.email == '' ? swal("Ops!", "Preencha seu e-mail.", "error") : '';
        this.state.company == '' ? swal("Ops!", "Preencha sua empresa.", "error") : '';
        this.state.name == '' ? swal("Ops!", "Preencha seu nome.", "error") : '';

        this.checkValidationForm() ? this.submitRegister() : '';
    }
    
    handleChange(e) {
        switch (e.target.id) {
            case "name":
                this.setState({ name: e.target.value });
                break;
            case "company":
                this.setState({ company: e.target.value });
                break;
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            case "rePassword":
                this.setState({ rePassword: e.target.value });
                break;
        }
    }
  render() {
    const { isLoading } = this.state;

    return (
        <Panel bsStyle="info">
            <Panel.Heading>
                <Panel.Title componentClass="h3">CADASTRO</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <Form>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <ControlLabel>Nome</ControlLabel>
                            <FormControl type="nome" placeholder="Nome" id="name" value={this.state.name} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <ControlLabel>Empresa</ControlLabel>
                            <FormControl type="empresa" placeholder="Empresa" id="company" value={this.state.company} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <ControlLabel>E-mail</ControlLabel>
                            <FormControl type="email" placeholder="Email" id="email" value={this.state.email} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <ControlLabel>Senha</ControlLabel>
                            <FormControl type="password" placeholder="Senha" id="password" value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <ControlLabel>Repetir Senha</ControlLabel>
                            <FormControl type="password" placeholder="Repetir Senha" id="rePassword" value={this.state.rePassword} onChange={this.handleChange} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button type="submit" disabled={isLoading} onClick={(e) => this.getValidationState(e)}>
                            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </Col>
                </Row>
                </Form>
            </Panel.Body>
        </Panel>
    );
  }
}