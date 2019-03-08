import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
//import { Button } from "../../views/design/Button";
import { OtherButton } from "../../views/design/OtherButton";
import { withRouter } from "react-router-dom";
import {getDomain} from "../../helpers/getDomain";
//import User from "../shared/models/User";

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
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(270, 24, 86), rgb(60, 14, 14));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class EditProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            username: "",
            birthday: "",
        };
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    backToProfile(user){
        this.props.history.push({
            pathname: `/UserProfile`,
            state: {displayUser: user}
        });
    }

    saveChanges(user){
        fetch(`${getDomain()}/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: "",
                currdate: "",
                birthday: this.state.birthday,
            })
        })
            .then(response => response.json())
            .then(res => {
                if(res.status ===404){
                    window.alert("User Id (und damit der User) existiert nicht!");
                }else{
                    localStorage.setItem("loggedInAs", res.username)
                    this.props.history.push({
                        pathname: `/UserProfile`,
                        state: {displayUser: res}
                    });
                }
            })
            .catch(err => {
                alert(`Something went wrong during the login: ${err.message}`);
            });
    }

    render() {
        let user =this.props.location.state.displayUser;
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>New Username</Label>
                        <InputField
                            placeholder={user.username}
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Date of birth</Label>
                        <form action="/action_page.php">
                            <input
                                type="date"
                                name="birthdate"
                                min="1900-01-01"
                                max="2019-03-13"
                                onChange={e => {
                                    this.handleInputChange("birthday", e.target.value);
                                }}

                                {...() => {
                                    let dd = this.today.getDate();
                                    let mm = this.today.getMonth();
                                    let yyyy = this.today.getFullYear();
                                    if (dd < 10) {
                                        dd = '0' + dd;
                                    }
                                    if (mm < 10) {
                                        mm = '0' + mm;
                                    }
                                    let todayStr = dd + '.' + mm + '.' + yyyy;
                                    document.getElementById("date").setAttribute("max", todayStr);
                                }}
                            />
                        </form>
                        <p/>
                        <ButtonContainer>
                            <OtherButton
                                width="40%"
                                onClick={() => {
                                    this.backToProfile(user);
                                }}
                            >
                                Cancel
                            </OtherButton>
                            <OtherButton
                                width="40%"
                                onClick={() => {
                                    this.saveChanges(user);
                                }}
                            >
                                Save Changes
                            </OtherButton>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(EditProfile);
