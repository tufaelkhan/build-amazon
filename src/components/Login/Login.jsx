import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Login = () => {
    const [show, setShow] = useState(false)
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const from = location.state?.from?.pathname || '/';
    console.log(from);

    const handleLogin= (event) =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset()
            navigate(from, {replace: true})
        })
        .catch(error => {
            console.log(error);
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login here!!!</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='' required placeholder='your email' />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='' required placeholder='your password' />
                    <p onClick={()=> setShow(!show)}><small>
                        {
                            show? <span>Hide password</span>: <span>show password</span>
                        }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit"  value='login'/>
            </form>
            <p><small>New to amazon? <Link to='/signup'>create new account</Link></small></p>
        </div>
    );
};

export default Login;