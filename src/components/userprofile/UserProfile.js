import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import Profile from "../../views/Profile";
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
            isSameUser: false,
        };
    }
    goToEdit(user){
        this.props.history.push({
            pathname: `/EditProfile`,
            state: {displayUser: user}
        });
    }

    backToList() {
        this.props.history.push(`/game`);
    }

    render() {
        let isTHEUser = this.props.location.state.displayUser.token.toString()===localStorage.getItem("token").toString();
        let user =this.props.location.state.displayUser;
        return (
            <Container>
                <h2>Profile</h2>
                <p>:::::::::::::::{this.props.location.state.displayUser.username}:::::::::::::::::</p>
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
                            disabled={!isTHEUser}
                            width="40%"
                            onClick={() => {
                                this.goToEdit(user);
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
