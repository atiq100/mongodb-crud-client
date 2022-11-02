import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData()
    const [user,setUser] = useState(storedUser)

    const handlesubmit = event =>{
        event.preventDefault();
        fetch(`http://localhost:5000/users/${user._id}`,{
            method:'PUT',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify(user)

        })
        .then(res=>res.json())
        .then(data=>{
            if(data.modifiedCount>0){
                alert('user updated successfully')
                event.target.reset()
            }
            //console.log(data);
        })

    }
    const handleInputChange = event=>{
        const value = event.target.value;
        const field = event.target.name;
        const newUser = {...user}
        newUser[field]=value;
        setUser(newUser)
        console.log(newUser);
       
    }
    return (
        <div>
            <h2>please update: {storedUser.name}</h2>
            <form onSubmit={handlesubmit}>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.name} name='name' placeholder='name'/><br/>
                <input onChange={handleInputChange} type="email" defaultValue={storedUser.email} name='email' placeholder='email'/><br/>
                <input onChange={handleInputChange} type="text" defaultValue={storedUser.address} name='address' placeholder='address'/><br/>
                <button type='submit'>update user</button>
            </form>
        </div>
    );
};

export default Update;