import React from 'react';	
import { useState } from 'react';

function Address() {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

   /* function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        title: ""
      })

    function onSubmitHandler = (e) => {
        e.preventDefault();
       this.props.history.push('/dashboard')
      }*/

    return (
    <form>
        <input
          name="country"
          type="text"
          placeholder='Country'
          required 
        /><br/>

        <input
          name="city"
          type="text"
          placeholder='City'
        /><br/>

        <input
          name="street"
          type="text"
          placeholder='Street'
        /><br/>
        <input type="submit" value="Next" />
    </form>
    );
}



export default Address;