import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';
import { signOut } from '../reducks/users/operations';

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const userName = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>user ID : {uid}</p>
      <p>user name : {userName}</p>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  );
};

export default Home;
