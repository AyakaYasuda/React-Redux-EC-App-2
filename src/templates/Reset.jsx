import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from '../components/UI';
import { PrimaryButton } from '../components/UI';
import { resetPassword } from '../reducks/users/operations';
import { push } from 'connected-react-router';

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  const inputEmail = useCallback(
    e => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

  return (
    <div className='c-section-container'>
      <h2 className='u-text-center u-text__headline'>Reset Password</h2>
      <div className='module-spacer--medium' />
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
      <div className='module-spacer--medium' />
      <div className='center'>
        <PrimaryButton
          label={'Reset Password'}
          onClick={() => dispatch(resetPassword(email))}
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

export default Reset;
