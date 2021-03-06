import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
//import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
//import User from "../shared/models/User";
//import Profile from "../userprofile/UserProfile";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout(id) {
      /**Transmits the id to the backend. The 404 should never occur, I just included it for completion's sake.**/
      localStorage.removeItem("token");
      fetch(`${getDomain()}/logout/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
          //body: JSON.stringify({
          //    username: "Blank", //this.state.username,
          //    password: "Blank", //this.state.password,
          //    birthday: "Blank",
          //    currdate: "Blank",
          //})
      })
          .then(response => response.json())
          .then(res => {
              if(res.status ===404){
                  window.alert("User Id (und damit der User) existiert nicht!");
              }else{
                  this.props.history.push("/login");
              }
          })
          .catch(err => {
                  alert(`Something went wrong during the logout: ${err.message}`);
          });
  }

  toProfile(user) {
      /**as it says: Go to generic User Profile Page which is filled with information from 'user'.**/
    this.props.history.push({
     pathname: `/UserProfile`,
        state: {displayUser: user}
    });
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(async users => {
        // delays continuous execution of an async operation for 0.8 seconds.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 800));

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
      /**Renders user names as buttons.**/
    return (
      <Container>
        <h2>You are logged in as {localStorage.getItem("loggedInAs")} </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                    <Container>
                      <ButtonContainer>
                        <Button
                            width="100%"
                            onClick={() => {
                                localStorage.setItem("userNameProfile", user.username)
                              this.toProfile(user);
                            }}
                        >{user.username}</Button>
                      </ButtonContainer>
                    </Container>
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout(localStorage.getItem("loggedInId"));
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
