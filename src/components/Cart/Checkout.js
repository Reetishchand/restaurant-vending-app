import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isPhoneValid = (phone) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return phoneRegex.test(phone);
};
const isEmailValid = (email) => {
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return emailRegex.test(email);
};


const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        email: true,
        address: true,
        phoneNumber: true

    });

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNumberInputRef = useRef();
    const addressInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhoneNumber = phoneNumberInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const currentOrderId= Math.random().toString(36).substring(2,7);
        const currentOrderDate= new Date().toLocaleString();
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredEmailIsValid = !isEmpty(enteredEmail) && isEmailValid(enteredEmail);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredPhoneNumberIsValid = !isEmpty(enteredPhoneNumber) && isPhoneValid(enteredPhoneNumber);

        setFormInputsValidity({

            name: enteredNameIsValid,
            email: enteredEmailIsValid,
            address: enteredAddressIsValid,
            phoneNumber: enteredPhoneNumberIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredEmailIsValid &&
            enteredAddressIsValid &&
            enteredPhoneNumberIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            email: enteredEmail,
            address: enteredAddress,
            phoneNumber: enteredPhoneNumber,
            orderId: currentOrderId,
            orderDate:  currentOrderDate
        });
    };

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`;
    const emailControlClasses = `${classes.control} ${
        formInputsValidity.email ? '' : classes.invalid
    }`;
    const phoneNumberControlClasses = `${classes.control} ${
        formInputsValidity.phoneNumber ? '' : classes.invalid
    }`;
    const addressControlClasses = `${classes.control} ${
        formInputsValidity.address ? '' : classes.invalid
    }`;

    return (
        <form className={classes.form} onSubmit={confirmHandler} >
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={emailControlClasses}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' ref={emailInputRef} />
                {!formInputsValidity.email && <p>Please enter a valid email!</p>}
            </div>
            <div className={phoneNumberControlClasses}>
                <label htmlFor='postal'>Phone Number</label>
                <input type='text' id='postal' ref={phoneNumberInputRef} />
                {!formInputsValidity.phoneNumber && (
                    <p>Please enter a valid phone number!</p>
                )}
            </div>
            <div className={addressControlClasses}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' ref={addressInputRef} />
                {!formInputsValidity.address && <p>Please enter a valid address!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
