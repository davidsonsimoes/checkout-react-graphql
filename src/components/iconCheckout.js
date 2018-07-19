import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Glyphicon, Fade } from 'react-bootstrap';

const ContentIconCheckout = styled.div`
    background-color: #eee;
    height: 80px;
    width: 80px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 100%;
    text-align: center;
    line-height: 90px;
    vertical-align: center;
    font-size: 30px;
    border: 1px solid #d0d0d0
`;
const NumberQtd = styled.div`
    background-color: #d9534f;
    height: 20px;
    width: 20px;
    position: fixed;
    bottom: 60px;
    right: 30px;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
    font-size: 13px;
    color: #fff;
`;

export default class iconCheckout extends React.Component  {
  render() {
    return (
        <div>
            <Fade in={this.props.isActive}>
                <Link to="/login">
                    <ContentIconCheckout>
                        <NumberQtd>1</NumberQtd>
                        <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
                    </ContentIconCheckout>
                </Link>
            </Fade>
        </div>
    );
  }
}