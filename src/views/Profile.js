import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../helpers/layout";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const CurrDate = styled.div`
  font-weight: bold;
  margin-left: 5px;
  color: #e6ca1f;
`;

const OtherStyle = styled.div`
  font-weight: bold;
  margin-left: 5px;
  color: #16ca1f;
`;


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Profile = ({ user }) => {
    //if(localStorage.getItem("token")===user.token.toString()){

    //}
    return (
        <BaseContainer>
            <FormContainer>
                <Form>
                    <Container>
                        <UserName>Username: {user.username}</UserName>
                    </Container>
                    <Container>
                        <CurrDate>Date of registration: {user.currdate}</CurrDate>
                    </Container>
                    <Container>
                        <CurrDate>Date of birth: {user.birthday}</CurrDate>
                    </Container>
                    <Container>
                        <OtherStyle>Status: {user.status}</OtherStyle>
                    </Container>

                </Form>
            </FormContainer>
        </BaseContainer>
    );
};

export default Profile;
