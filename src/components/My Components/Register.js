import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button } from "../../views/design/Button";
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
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
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

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
    };
  }

  registerNewUser() {
      /**Transmits the credentials to the backend. Backend checks whether Username exists already and throws a 409 in
       * that case. Otherwise, it creates and returns the user.**/
    fetch(`${getDomain()}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        currdate: this.renderDate(),
        birthday: this.state.birthday
      })
    })
      //.then(response => response.json())
      .then((response2)=> {
        if(response2.status ===201){
            alert("User erfolgreich registriert!");
            this.props.history.push(`/login`);
        }else{
            alert("Username existiert bereits (oder anderer Fehler)!");
        }
      })
      .catch(err => {
          alert(`Something went wrong during the registration: ${err.message}`);
      });
  }

  renderDate(){
      /**Helper function to create the current date.**/
    return new Date().toLocaleString()
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }
  render() {
      /**no restrictions on password or username except that they must not be empty**/
    return (
        <BaseContainer>
          <FormContainer>
            <Form>
              <Label>Username</Label>
              <InputField
                  placeholder="Enter here.."
                  onChange={e => {
                    this.handleInputChange("username", e.target.value);
                  }}
              />
              <Label>Password</Label>
              <InputField
                  placeholder="Enter here.."
                  onChange={e => {
                    this.handleInputChange("password", e.target.value);
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
                <Button
                    disabled={!this.state.username || !this.state.password|| !this.state.birthday}
                    width="50%"
                    onClick={() => {
                      this.registerNewUser();
                    }}
                >
                  Register
                </Button>
              </ButtonContainer>
            </Form>
          </FormContainer>
        </BaseContainer>
    );
  }
}

export default withRouter(Register);
