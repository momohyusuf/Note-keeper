import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import {
  updateLastName,
  updateFirstName,
  updateIsLoading,
  toggleAlert,
} from '../features/note/noteSlice';

import {
  checkName,
  passwordLength,
  checkEmailAddress,
  passwordContainLowercase,
  passwordContainUppercase,
  passwordContainSpecialCharacter,
  passwordContainNumber,
} from '../utils/utils';
import Alert from './alert/Alert';
import SmallSpinner from './spinner/SmallSpinner';
import PasswordValidation from './validations/PasswordValidation';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [verificationMessage, setVerificationMassage] = useState('');
  const { isLoading, showAlert } = useSelector((state) => state.note);
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !checkName(formData.firstName) ||
      !checkName(formData.lastName) ||
      !checkEmailAddress(formData.email) ||
      !passwordLength(formData.password) ||
      !passwordContainLowercase(formData.password) ||
      !passwordContainUppercase(formData.password) ||
      !passwordContainSpecialCharacter(formData.password) ||
      !passwordContainNumber(formData.password)
    ) {
      dispatch(toggleAlert(true));
      setVerificationMassage('Please ensure Your input fields are correct');

      return;
    } else {
      try {
        dispatch(updateIsLoading(true));
        const response = await axios.post(
          `
https://note-saver.onrender.com/api/v1/authorize/register`,
          formData
        );
        const data = await response.data;
        const { firstName, lastName, token } = data;
        dispatch(updateFirstName(firstName));
        dispatch(updateLastName(lastName));
        dispatch(updateIsLoading(false));
        localStorage.setItem('firstName', JSON.stringify(firstName));
        localStorage.setItem('lastName', JSON.stringify(lastName));
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/notes');
      } catch (error) {
        dispatch(updateIsLoading(false));

        const {
          response: {
            data: { msg },
          },
        } = error;
        if (msg.startsWith('E11000')) {
          setVerificationMassage(
            `Account with ${formData.email} already exist. Sign up with a new email or login Instead`
          );
          dispatch(toggleAlert(true));
        }
      }
    }
  };

  return (
    <section className="content--container">
      {showAlert && <Alert text={verificationMessage} />}
      <form>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={handleInputs}
          placeholder="Enter your firstname"
          required={true}
        />{' '}
        {!checkName(formData.firstName) && (
          <small>
            first name is required should not be less that 3 characters
          </small>
        )}
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={handleInputs}
          placeholder="Enter your lastname"
          required={true}
        />{' '}
        {!checkName(formData.lastName) && (
          <small>
            Last name is required should not be less than 3 characters
          </small>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputs}
          placeholder="Enter your email address"
          required={true}
        />{' '}
        {!checkEmailAddress(formData.email) && (
          <small>Please enter a valid email address example@gmail.com</small>
        )}
        <label htmlFor="password">Password</label>{' '}
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleInputs}
          required={true}
        />{' '}
        <>
          <PasswordValidation
            verify={passwordContainUppercase(formData.password)}
            text="Password must contain Uppercase"
          />
          <PasswordValidation
            verify={passwordContainNumber(formData.password)}
            text="Password must contain a number"
          />
          <PasswordValidation
            verify={passwordContainSpecialCharacter(formData.password)}
            text="Password must contain a Special Character @#%*!"
          />
          <PasswordValidation
            verify={passwordContainLowercase(formData.password)}
            text="Password must contain lowercase letters"
          />

          <PasswordValidation
            verify={passwordLength(formData.password)}
            text="Password leangth must be greater than or equal to 8"
          />
        </>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1.5em 0',
          }}
          type="button"
          onClick={handleSubmit}
        >
          Sign Up
          {isLoading && <SmallSpinner />}
        </button>
        <p style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
