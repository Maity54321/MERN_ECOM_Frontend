import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/Input";

export default class LogSignForm extends Component {
  state = {
    regData: {},
    loginData:{},
    errors: {},
  };

  regValidate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate( this.state.regData, this.regSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) error[item.path[0]] = item.message;
    return errors;
  };

  logValidate = ()=>{
    const options = { abortEarly: false };
    const { error } = Joi.validate( this.state.loginData, this.loginSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) error[item.path[0]] = item.message;
    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    var schema = {};
    if(this.state.regData){
      schema = { [name]: this.regSchema[name] }
      // console.log(schema);
    }
    else if(this.state.loginData){
      schema = { [name]: this.loginSchema[name] }
    }
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = this.regValidate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.registerSubmit();
  };

  handleLoginSubmit = (e) =>{
    e.preventDefault();

    const errors = this.logValidate();
    this.setState({errors:errors || {}});
    if(errors) return

    this.loginSubmit();
  }

  handleChangeRegister = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } 
    else {
      delete errors[input.name];
    }

    const regData = {...this.state.regData };
    regData[input.name] = input.value;
    this.setState({ regData, errors });
    // console.log(errors);
  };

  handleChangeLogin = ({currentTarget: input}) =>{
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const loginData = {...this.state.loginData };
    loginData[input.name] = input.value;
    this.setState({ loginData, errors });
    // console.log(loginData);
  }

  renderRegInput(name, type, placeholder) {
    const { regData, errors } = this.state;
    return (
      <>
        <Input 
        name={name} 
        placeholder={placeholder} 
        type={type} 
        value={regData[name]}
        onChange={this.handleChangeRegister}
        error={errors[name]}
        />
      </>
    );
  }

  renderLoginInput(name, type, placeholder) {
    const { loginData, errors } = this.state;
    return (
      <>
        <Input 
        name={name} 
        placeholder={placeholder} 
        type={type} 
        value={loginData[name]}
        onChange={this.handleChangeLogin}
        error={errors[name]}
        />
      </>
    );
  }
}




