import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '../components/UI';
import { PrimaryButton } from '../components/UI';
import { signUp } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const SignUp = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const inputEmail = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    e => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    e => {
      setConfirmPassword(e.target.value);
    },
    [setConfirmPassword]
  );

  const inputUsername = useCallback(
    e => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  return (
    <div className='c-section-container'>
      <h2 className='u-text-center u-text__headline'>Sign Up</h2>
      <div className='module-spacer--medium' />
      <TextInput
        fullWidth={true}
        label={'User name'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
      <TextInput
        fullWidth={true}
        label={'Email'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'Password'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'Password'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Sign Up'}
          onClick={() =>
            dispatch(signUp(username, email, password, confirmPassword))
          }
        />
        <div className='module-spacer--medium' />
        <p
          onClick={() => {
            dispatch(push('/signin'));
          }}
        >
          Have an account? Log in!
        </p>
      </div>
    </div>
  );
};

export default SignUp;
