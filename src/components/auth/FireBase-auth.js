import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './FireBase-config';
import '../canvas/Modal.css'

const AuthComponent = ({ onClose, show }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginOrCreateAccount = async () => {
        try {
            // Attempt to sign in
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);
            // Reset the form and close the modal on successful login
            setEmail('');
            setPassword('');
            onClose();
        } catch (error) {
            // console.error('Login error:', error.message);
            // If sign-in fails because the user does not exist, try to register the user
            if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                try {
                    console.log("hit")
                    const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log('New user registered:', newUserCredential.user);
                    // Reset the form and close the modal on successful registration
                    setEmail('');
                    setPassword('');
                    onClose();
                } catch (registrationError) {
                    // console.error('Registration error:', registrationError.message);
                }
            }
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User logged out successfully');
            onClose(); // Optionally close the modal on logout
        } catch (logoutError) {
            // console.error('Logout error:', logoutError.message);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="reg-modal" onClick={onClose}>
            <div className="reg-modal-content" onClick={e => e.stopPropagation()}>
                <div className="reg-modal-header">
                    <h4 className="reg-modal-title">Sorry! Your account fell out of sync with our files, please login again</h4>
                </div>
                <div className="reg-modal-body">
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLoginOrCreateAccount}>Login / Register</button>
                </div>
                <div className="reg-modal-footer">
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
