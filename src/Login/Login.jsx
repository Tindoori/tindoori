/* eslint-disable */
import React, {useCallback, useContext, useState} from 'react';
import {Redirect} from 'react-router';
import firebase from "firebase/app";
import {AuthContext} from "../Auth";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = ({history}) => {
    //creating error state
    const [error, setError] = useState("");

    //loginfunction
    const handleLogin = useCallback(
        async event => {

            //prevents page from reloading when the user clicks on submit
            event.preventDefault();
            //retrieves the values of email and password from the textboxes
            const {email, password} = event.target.elements;
            try {
                await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                setError(error);
            }
        },
        [history]
    )


    //gets the context of the user
    const {currentUser} = useContext(AuthContext)

    if (currentUser) {
        return <Redirect to="/"/>
    }

    return (
        <div className="col-md-4 col-md-offset-4">
            <h1>Tindoori</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="emailid"
                           placeholder="Enter email" name="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="passwordid" placeholder="Password"
                           name="password"/>
                </div>
                {error &&
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>}
                <div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                </div>
            </form>
        </div>
    )
}


export default Login;
