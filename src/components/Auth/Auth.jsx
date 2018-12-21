import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import styles from './Auth.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { checkValidation } from '../../utils/';

class AuthPresentational extends Component {
  state = {
    loginForm: [
      {
        id: 'username',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      {
        id: 'password',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    ],
    registerForm: [
      {
        id: 'username',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      {
        id: 'email',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      {
        id: 'password',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    ],
    formIsValid: {
      loginForm: false,
      registerForm: false
    }
  };

  inputChangedHandler = (event, inputID, formID) => {
    const updatedForm = [...this.state[formID]];
    const updatedFormElementIndex = updatedForm.findIndex(
      e => e.id === inputID
    );
    const updatedFormElement = updatedForm[updatedFormElementIndex];

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[updatedFormElementIndex] = updatedFormElement;

    let formIsValid = true;

    for (const key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    this.setState({
      [formID]: updatedForm,
      formIsValid: { ...this.state.formIsValid, [formID]: formIsValid }
    });
  };

  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.ContainerInner}>
          <Tabs>
            <TabList className={styles.TabList}>
              <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
                Login
              </Tab>
              <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
                Register
              </Tab>
            </TabList>

            {/* LOGIN */}
            <TabPanel>
              <div>
                <form className={styles.Form}>
                  {this.state.loginForm.map(e => (
                    <div key={e.id} className={styles.FormElements}>
                      <Input
                        elementConfig={e.elementConfig}
                        inputType={e.elementType}
                        value={e.value}
                        changed={event =>
                          this.inputChangedHandler(event, e.id, 'loginForm')
                        }
                        invalid={!e.valid}
                        touched={e.touched}
                        shouldValidate={e.validation}
                      />
                    </div>
                  ))}
                  <Button
                    size="big"
                    theme=""
                    disabled={!this.state.formIsValid.loginForm}
                  >
                    login
                  </Button>
                </form>
              </div>
            </TabPanel>

            {/* REGISTER */}
            <TabPanel>
              <div>
                <form className={styles.Form}>
                  {this.state.registerForm.map(e => (
                    <div key={e.id} className={styles.FormElements}>
                      <Input
                        elementConfig={e.elementConfig}
                        inputType={e.elementType}
                        value={e.value}
                        changed={event =>
                          this.inputChangedHandler(event, e.id, 'registerForm')
                        }
                        invalid={!e.valid}
                        touched={e.touched}
                        shouldValidate={e.validation}
                      />
                    </div>
                  ))}
                  <Button
                    size="big"
                    theme=""
                    disabled={!this.state.formIsValid.registerForm}
                  >
                    register
                  </Button>
                </form>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default AuthPresentational;
