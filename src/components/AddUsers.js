import React from 'react';
import { useState } from 'react';

const AddUsers = () => {
    const [user,setUser] = useState({})
    const handlesubmit = event =>{
        event.preventDefault();
// client side theke server e data patanur process
        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('user added successfully')
                event.target.reset()
            }
        })

    }
    const handleInputBlur = event=>{
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user}
        newUser[field]=value;
        setUser(newUser)
        //console.log(newUser);
       
    }
 
    

    return (
        <div>
            <h2>please add a user</h2>
            <form onSubmit={handlesubmit}>
                <input onBlur={handleInputBlur} type="text" name='name' placeholder='name'/><br/>
                <input onBlur={handleInputBlur} type="email" name='email' placeholder='email'/><br/>
                <input onBlur={handleInputBlur} type="text" name='address' placeholder='address'/><br/>
                <button type='submit'>Add user</button>
            </form>
        </div>
    );
};

export default AddUsers;