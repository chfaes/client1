import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const UserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;

const CurrDate = styled.div`
  font-weight: bold;
  color: #e6ca1f;
`;

const OtherStyle = styled.div`
  font-weight: bold;
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
    if(localStorage.getItem("token")===user.token.toString()){

    }
    return (
        <Container>
            <UserName>Username: {user.username}</UserName>
            <CurrDate>Date of registration: {user.currdate}</CurrDate>
            <CurrDate>Date of birth: {user.birthday}</CurrDate>
            <OtherStyle>Status: {user.status}</OtherStyle>
        </Container>
    );
};

export default Profile;
