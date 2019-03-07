import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Profile from "../../views/Profile";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
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

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,

        };
    }

    backToList() {
        this.props.history.push(`/game`);
    }

    render() {
        /*
        this.state.users.map(user =>{
            if (user.username === localStorage.getItem("userNameProfile")){
                if(localStorage.getItem("token")===user.token.toString()){
                    //User greift auf sein eigenes Profil zu

                }else{

                }
            }
        })*/
        return (
            <Container>
                <h2>Profile</h2>
                <p>:::::::::::::::{this.props.location.state.displayUser.username.toString()}:::::::::::::::::</p>
                    <div>
                        <Users>
                            <PlayerContainer key={this.props.location.state.displayUser.id}>
                                <Profile user={this.props.location.state.displayUser}/>
                            </PlayerContainer>
                        </Users>
                        <Button
                            width="40%"
                            onClick={() => {
                                this.backToList();
                            }}
                        >
                            Back to user list
                        </Button>
                        <Button

                            width="40%"
                            onClick={() => {
                                this.backToList();
                            }}
                        >
                            Edit Profile
                        </Button>
                    </div>
            </Container>
        );
    }
}

export default withRouter(UserProfile);
