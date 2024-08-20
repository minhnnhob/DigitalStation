import { useState } from 'react';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const response = await fetch('http://localhost:4000/api/auth/signup', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email, password }),
        // });

        // if (response.ok) {
        //     console.log('User created');
        // } else {
        //     console.log('User not created');
        // }

        console.log(email, password);
    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign up</h3>
            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>


            <button >Sign up</button>
        </form>
    );
};

export default Signup; 