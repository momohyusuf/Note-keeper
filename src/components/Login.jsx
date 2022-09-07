import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  passwordLength,
  checkEmailAddress,
  showPassword,
} from '../utils/utils';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateLastName,
  updateFirstName,
  updateIsLoading,
  toggleAlert,
} from '../features/note/noteSlice';
import Alert from './alert/Alert';
import SmallSpinner from './spinner/SmallSpinner';

function Login({ setAuth }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const getPassword = useRef();
  const [verificationMessage, setVerificationMassage] = useState('');
  const { isLoading, showAlert } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      !checkEmailAddress(formData.email) ||
      !passwordLength(formData.password)
    ) {
      dispatch(toggleAlert(true));
      setVerificationMassage('Please ensure Your input fields are correct');
      return;
    } else {
      try {
        dispatch(updateIsLoading(true));
        const response = await axios.post(
          `
https://note-saver-api.herokuapp.com/api/v1/authorize/login`,
          formData
        );
        const data = await response.data;
        const { firstName, lastName, token } = data;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('firstName', JSON.stringify(firstName));
        localStorage.setItem('lastName', JSON.stringify(lastName));
        dispatch(updateFirstName(firstName));
        dispatch(updateLastName(lastName));
        dispatch(updateIsLoading(false));
        navigate('/notes');
      } catch (error) {
        setVerificationMassage('Incorrect login details');
        dispatch(updateIsLoading(false));
        dispatch(toggleAlert(true));
        console.log(error);
      }
    }
  };

  return (
    <section className="content--container">
      {showAlert && <Alert text={verificationMessage} />}
      <form>
        <label htmlFor="email">
          Email <sup>*</sup>{' '}
        </label>{' '}
        <br />
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleInputs}
          placeholder="Enter your email address"
        />{' '}
        <br />
        <label htmlFor="password">
          Password <sup>*</sup>{' '}
        </label>
        <br />
        <input
          ref={getPassword}
          type="password"
          name="password"
          id="password"
          onChange={handleInputs}
          placeholder="Enter your password"
        />
        <br />
        <input
          type="checkbox"
          id="show-password"
          onClick={() => showPassword(getPassword)}
        />
        <label htmlFor="show-password">show password</label>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '1.5em 0',
          }}
          onClick={handleSubmit}
        >
          Login {isLoading && <SmallSpinner />}
        </button>
        <p style={{ textAlign: 'center' }}>
          Don't have an account yet? <Link to="/signup">Sing Up</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
