import React from 'react';
import { Row, Col, Button, Thumbnail, Badge, FormGroup, ControlLabel, Form } from 'react-bootstrap';

import styled from 'styled-components';

const Image = styled.img`
  width: 242px;
  display: block;
  height: 200px;
  margin: 10px auto
`;
const ContentThumb = styled.div`
  text-align: center;
`;
const FormControl = styled.input`
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 10px
`;

export default class Product extends React.Component  {
  render() {
    return (
        <Row>
        <Col xs={6} md={4}>
          <Thumbnail>
            <Image src="/thumbnaildiv.png"  />
            <ContentThumb>
              <h3>Classic Ad</h3>
              <p>Preço: <Badge>$289.99</Badge></p>
              <hr />
              <Form inline>
              <Row>
                <Col xs={6} md={6}>
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>QTD:</ControlLabel> 
                    <FormControl type="number" placeholder="Ex: 1" />
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <Button bsStyle="default">COMPRAR</Button>
                </Col>
              </Row>
              </Form>
            </ContentThumb>
          </Thumbnail>
        </Col>
        <Col xs={6} md={4}>
          <Thumbnail>
            <Image src="/thumbnaildiv.png"  />
            <ContentThumb>
              <h3>Standout Ad</h3>
              <p>Preço: <Badge>$289.99</Badge></p>
              <hr />
              <Form inline>
              <Row>
                <Col xs={6} md={6}>
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>QTD:</ControlLabel> 
                    <FormControl type="number" placeholder="Ex: 1" />
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <Button bsStyle="default">COMPRAR</Button>
                </Col>
              </Row>
              </Form>
            </ContentThumb>
          </Thumbnail>
        </Col>
        <Col xs={6} md={4}>
          <Thumbnail>
            <Image src="/thumbnaildiv.png"  />
            <ContentThumb>
              <h3>Premium Ad</h3>
              <p>Preço: <Badge>$289.99</Badge></p>
              <hr />
              <Form inline>
              <Row>
                <Col xs={6} md={6}>
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>QTD:</ControlLabel> 
                    <FormControl type="number" placeholder="Ex: 1" />
                  </FormGroup>
                </Col>
                <Col xs={6} md={6}>
                  <Button bsStyle="default">COMPRAR</Button>
                </Col>
              </Row>
              </Form>
            </ContentThumb>
          </Thumbnail>
        </Col>
      </Row>
    );
  }
}