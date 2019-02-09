import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import styles from './SignInForm.module.css';
import { checkValidation } from '../../../utils';

class SignInForm extends Component {
  state = {
    loginForm: {
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
      password: {
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
    },
  };

  inputChangedHandler = (event, inputID) => {
    const updatedForm = { ...this.state.loginForm };
    const updatedFormElement = updatedForm[inputID];

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputID] = updatedFormElement;

    let formIsValid = true;

    for (const key in updatedForm) {
      formIsValid = updatedForm[key].valid && formIsValid;
    }

    this.setState({
      loginForm: updatedForm,
      formIsValid,
    });
  };

  renderInputs(form) {
    return Object.entries(form).map(([key, value]) => (
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
    ));
  }

  getLoginData(form) {
    const loginEmail = form['email'].value;
    const loginPassword = form['password'].value;
    const data = { email: loginEmail, password: loginPassword };
    return data;
  }

  render() {
    const loginData = this.getLoginData(this.state.loginForm);
    return (
      <div>
        <form className={styles.Form}>
          {this.renderInputs(this.state.loginForm)}
          <Button
            size="big"
            theme=""
            disabled={!this.state.formIsValid}
            loading={this.props.isSigningIn}
            clicked={e => this.props.signInClicked(e, loginData)}
          >
            login
          </Button>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  isSigningIn: PropTypes.bool,
  signInClicked: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    isSigningIn: state.auth.loading,
  };
};

export default connect(mapStateToProps)(SignInForm);
