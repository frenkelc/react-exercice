import React from 'react';	
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../Routes';


function Personal() {

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        title: ""
      });

    function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
       });

        console.log('name', state.firstName);
      }

      function onSubmitHandler(e){
        e.preventDefault();
      // this.props.history.push('/dashboard')
      }
      
   
    return (
    <form onSubmit={onSubmitHandler}   >
        <input
          name="firstName"
          type="text"
          placeholder='First name'
          value ={state.firstName}
          onChange={handleChange}
          required 
        /><br/>

        <input
          name="lastName"
          type="text"
          placeholder='Last name'
          value ={state.lastName}
          onChange={handleChange}
        /><br/>

        <input
          name="title"
          type="text"
          placeholder='Title'
          value ={state.title}
          onChange={handleChange}
        /><br/>
          <input type="submit" value="Next" />
          <Link to={ROUTES.ADDRESS}>Forget Password</Link>
    </form>
    );
}
export default Personal;