import React from 'react';	
import { useState } from 'react';

function ContactAbility() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [optin, setOptin] = useState('');
    
    return (
    <form>
        <input
          name="email"
          type="text"
          placeholder='Email'
          value ={email}
          required 
        /><br/>

        <input
          name="phone"
          type="number"
          placeholder='Phone number'
          value ={phoneNumber}
        /><br/>

        <input
          name="optin"
          type="text"
          placeholder='Optin'
          value ={optin}
        /><br/>
        <input type="submit" value="Submit" />
    </form>
    );
}
export default ContactAbility;