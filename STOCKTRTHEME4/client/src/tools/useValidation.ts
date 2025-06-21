import { useState } from 'react'

export const useInputHandlingSignup = () => {
    const [Email, setEmail] = useState('');
    const [Password, setpassword] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [InvalidCredentialsError, setInvalidCredentialsError] = useState('');
    const [Username, setUsername] = useState('');
    const [name, setname] = useState('');
    const [UsernameError, setUsernameError] = useState('');
    const [nameError, setNameError] = useState('');

    const validateInputs = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log('Validating inputs')
        
        // Reset errors
        setEmailError('');
        setPasswordError('');
        setInvalidCredentialsError('');
        setUsernameError('');
        setNameError('');

        let isValid = true;
        
        // Email validation
        if (!Email) {
            setEmailError("Please enter an Email");
            isValid = false;
            console.log('Validating email')
        } else if (!regex.test(Email)) {
            setEmailError("Email is not valid");
            isValid = false;
            console.log('Validating Email')
        }

        // Username validation
        if (!Username) {
            setUsernameError("Please enter a username");
            console.log('Validating username')
            isValid = false;
        } else if (Username.length < 3) {
            setUsernameError("Username must be at least 3 characters long");
            console.log('Validating username length')
            isValid = false;
        }
    
        // Name validation
        if (!name) {
            setNameError("Please enter a name");
            console.log('Validating name')
            isValid = false;
        }

        // Password validation
        if (!Password) {
            setPasswordError("Please enter a password");
            console.log('Validating password')
            isValid = false;
        } else if (Password.length < 3) {
            setPasswordError("Password must be at least 3 characters");
            console.log('Validating Password length')
            isValid = false;
        }

        return isValid;
    };

    return {
        name,
        Username,
        Email,
        Password,
        EmailError,
        PasswordError,
        InvalidCredentialsError,
        setEmail,
        setpassword,
        setEmailError,
        setPasswordError,
        setInvalidCredentialsError,
        validateInputs,
        setUsername,
        setname,
        UsernameError,
        nameError
    };
};

export const useInputHandlingLogin = () => {
    const [Email, setEmail] = useState('');
    const [Password, setpassword] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PasswordError, setPasswordError] = useState('');
    const [InvalidCredentialsError, setInvalidCredentialsError] = useState('');

    const validateInputs = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log('Validating inputs')
        
        // Reset errors
        setEmailError('');
        setPasswordError('');
        setInvalidCredentialsError('');

        let isValid = true;
        
        // Email validation
        if (!Email) {
            setEmailError("Please enter an Email");
            isValid = false;
            console.log('Validating email')
        } else if (!regex.test(Email)) {
            setEmailError("Email is not valid");
            isValid = false;
            console.log('Validating Email')
        }
        // Password validation
        if (!Password) {
            setPasswordError("Please enter a password");
            console.log('Validating password')
            isValid = false;
        } else if (Password.length < 3) {
            setPasswordError("Password must be at least 3 characters");
            console.log('Validating Password length')
            isValid = false;
        }

        return isValid;
    };

    return {
        Email,
        Password,
        EmailError,
        PasswordError,
        InvalidCredentialsError,
        setEmail,
        setpassword,
        setEmailError,
        setPasswordError,
        setInvalidCredentialsError,
        validateInputs,
    };
};
