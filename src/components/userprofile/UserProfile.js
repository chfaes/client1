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
            users: null
        };
    }

    backToList() {
        this.props.history.push(`/game`);
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
        return (
            <Container>
                <h2>Profile </h2>
                <p>::::::::::::::::::::::::::::::::</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <Profile user={user} />
                                        {localStorage.getItem("userNameProfile")}
                                    </PlayerContainer>

                                );
                            })}
                        </Users>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.backToList();
                            }}
                        >
                            Back to user list
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserProfile);
