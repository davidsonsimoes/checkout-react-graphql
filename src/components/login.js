import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';
import swal from 'sweetalert';
import Services from '../services/Services';
import Utils  from '../utils/Utils';

export default class Login extends React.Component  {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
    }
  async login() {
        let data = await Services.getLogin(this.state.email);
        if(!data.data.Profile) {
            swal("Ops!", "Email não cadastrado.", "error");
            this.setState({ isLoading: false });
        } else if(data.data.Profile.password !== this.state.password) {
            swal("Ops!", "Senha incorreta.", "error");
            this.setState({ isLoading: false });
        } else {
            this.setState({ isLoading: false });
            sessionStorage.setItem('loginId', data.data.Profile.id);
            window.location.href = '/';
        }
  }
  
  checkValidationForm() {
    if(this.state.email !== '',
    this.state.password !== '',
    Utils.validateEmail(this.state.email)){ return true }
}
submitRegister() {
    this.setState({ isLoading: true });
    this.login();
}
getValidationState(e) {
    e.preventDefault();
    Utils.validateEmail(this.state.email) ? '' : swal("Ops!", "Preencha um email válido.", "error");
    this.state.password === '' ? swal("Ops!", "Preencha sua senha.", "error") : '';
    this.state.email === '' ? swal("Ops!", "Preencha seu e-mail.", "error") : '';
    this.checkValidationForm() ? this.submitRegister() : '';
}
  handleChange(e) {
    switch (e.target.id) {
        case "loginEmail":
            this.setState({ email: e.target.value });
            break;
        case "loginPassword":
            this.setState({ password: e.target.value });
            break;
        default:
            break;
    }
 }
  render() {
    const { isLoading } = this.state;
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
                    <FormControl type="email" placeholder="Email" id="loginEmail" value={this.state.email} onChange={this.handleChange} />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm={12}>
                    <FormGroup>
                        <ControlLabel>Senha</ControlLabel>
                        <FormControl type="password" placeholder="Senha" id="loginPassword" value={this.state.password} onChange={this.handleChange} />
                    </FormGroup>
                </Col>
                </Row>
                <Row>
                <Col sm={12}>
                    <FormGroup>                    
                        <Button type="submit" disabled={isLoading} onClick={(e) => this.getValidationState(e)}>
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
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