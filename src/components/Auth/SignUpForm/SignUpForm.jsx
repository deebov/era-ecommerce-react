import React, { Component } from 'react';
import _ from 'lodash/object';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import styles from './SignUpForm.module.css';
import { checkValidation } from '../../../utils';

class SignUpForm extends Component {
  state = {
    registerForm: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      passwordOne: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
      passwordTwo: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm your password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  inputChangedHandler = (event, inputID) => {
    const updatedForm = { ...this.state.registerForm };
    const updatedFormElement = updatedForm[inputID];

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputID] = updatedFormElement;

    // Checking passwords are identical
    if (inputID.includes('password')) {
      updatedForm['passwordTwo'].valid =
        updatedForm['passwordOne'].value === updatedForm['passwordTwo'].value;
    }

    let formIsValid = true;
    // Check form is valid
    for (const key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    this.setState({
      registerForm: updatedForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const registerEmail = this.state.registerForm['email'].value;
    const registerPassword = this.state.registerForm['passwordOne'].value;
    const registerUserName = this.state.registerForm['username'].value;
    const registerData = {
      email: registerEmail,
      password: registerPassword,
      username: registerUserName,
    };

    return (
      <div>
        <form className={styles.Form}>
          {_.toPairs(this.state.registerForm).map(([key, value]) => (
            <div key={key} className={styles.FormElements}>
              <Input
                elementConfig={value.elementConfig}
                inputType={value.elementType}
                value={value.value}
                changed={event => this.inputChangedHandler(event, key)}
                invalid={!value.valid}
                touched={value.touched}
                shouldValidate={value.validation}
              />
            </div>
          ))}
          <Button
            size="big"
            theme=""
            loading={this.props.isSigningUp}
            disabled={!this.state.formIsValid}
            clicked={e => this.props.signUpClicked(e, registerData)}
          >
            register
          </Button>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  isSigningUp: PropTypes.bool,
  signUpClicked: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    isSigningUp: state.auth.loading,
  };
};

export default connect(mapStateToProps)(SignUpForm);
