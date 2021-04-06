import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Button, Image } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import google from '../../icon/Group 573.png'
import './Login.css'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const provider = new firebase.auth.GoogleAuthProvider();
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    const signIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email, photoURL}
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential)
            });
    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center pt-5">
                <Button onClick={signIn} variant="light border">
                    <Image src={google} rounded />Continue with google
                </Button>
            </div>            
        </>
    );
};

export default Login;