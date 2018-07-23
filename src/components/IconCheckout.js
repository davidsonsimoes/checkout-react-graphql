import React from 'react';
import styled from 'styled-components';
import { Glyphicon, Fade } from 'react-bootstrap';
import { SessionManager }  from '../utils/Utils';

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
const LinkTo = styled.a`
    cursor: pointer
`;
export default class IconCheckout extends React.Component  {
    linkTo(){
        if(SessionManager.getSessionID()){
            window.location.href = '/checkout';
        } else {
            window.location.href = '/login';
        }
    }
  render() {
    return (
        <div>
            <Fade in={this.props.isActive}>
                <LinkTo onClick={() => this.linkTo()}>
                    <ContentIconCheckout>
                        <NumberQtd>{this.props.qtd}</NumberQtd>
                        <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
                    </ContentIconCheckout>
                </LinkTo>
            </Fade>
        </div>
    );
  }
}
