import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData()
    const [displayUsers,setDisplayUsers]=useState(users)
    const handleDelete = user=>{
        const agree = window.confirm(`are you sure to want to delete ${user.name}`)
        if(agree){
           fetch(`http://localhost:5000/users/${user._id}`,{
            method:'DELETE'
           }) 
           .then(res=>res.json())
           .then(data=>{
            console.log(data)
            if(data.deletedCount > 0){
                alert('user deleted successfully')
                const remainingUsers = displayUsers.filter(usr => usr._id !== user._id);
                setDisplayUsers(remainingUsers)
            }
        })
        }
    }
    return (
        <div>
            <h2>Users:{displayUsers.length} </h2>
            <div>
                {
                    displayUsers.map(user=><p key={user._id}>
                        {user.name} {user.email} 
                        <Link to={`/update/${user._id}`}><button>update</button></Link>
                        <button onClick={()=>handleDelete(user)}>❌</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;