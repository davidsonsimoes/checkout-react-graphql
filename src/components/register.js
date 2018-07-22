import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';
import swal from 'sweetalert';
import Services from '../services/Services';
import staticUtils  from '../utils/Utils';

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
        let response = await Services.sendRegistration(this.state.email, this.state.name, this.state.password, this.state.company);
          const addedCompany = response.data;
          this.setState({ isLoading: false });
            if(addedCompany.result.company.toUpperCase() === 'UNILEVER' ||
                addedCompany.result.company.toUpperCase() === 'APPLE' ||
                addedCompany.result.company.toUpperCase() === 'NIKE' ||
                addedCompany.result.company.toUpperCase() === 'FORD'){
                swal("Cadastro Realizado!", `Bom saber que você é da ${addedCompany.result.company}, separamos um desconto especial para sua empresa.`, "success", { button: "Conferir" }).then(()=>{
                sessionStorage.setItem('loginId', addedCompany.result.id);
                window.location.href = '/';
            });
            } else {
                swal("Cadastro Realizado!", "Confira nossa lista de anúncios.", "success", { button: "Conferir" }).then(()=>{
                    sessionStorage.setItem('loginId', addedCompany.result.id);
                    window.location.href = '/';
                });
            }
        } catch (error) {
            let errorStr = error.toString();
            this.setState({ isLoading: false });
            return errorStr.includes("Details: Field name = email") ? swal("Ops!", "Email já registrado.", "error") : '';
        } 
    }
    checkValidationForm() {
        if(this.state.company !== '',
        this.state.name !== '',
        staticUtils.validateEmail(this.state.email),
        (this.state.rePassword !== '' && this.state.password === this.state.rePassword)) { return true }
    }
    submitRegister() {
        this.setState({ isLoading: true });
        this.registration();
    }
    getValidationState(e) {
        e.preventDefault();
        this.state.rePassword !== this.state.password ? swal("Ops!", "As senhas não conferem.", "error") : '';
        staticUtils.validateEmail(this.state.email) ? '' : swal("Ops!", "Preencha um email válido.", "error");
        this.state.rePassword === '' ? swal("Ops!", "Repita sua senha.", "error") : '';
        this.state.password === '' ? swal("Ops!", "Preencha sua senha.", "error") : '';
        this.state.email === '' ? swal("Ops!", "Preencha seu e-mail.", "error") : '';
        this.state.company === '' ? swal("Ops!", "Preencha sua empresa.", "error") : '';
        this.state.name === '' ? swal("Ops!", "Preencha seu nome.", "error") : '';
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
            default:
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