import React from 'react';
import { useSelector } from 'react-redux';
import { getUserId, getUserName } from '../reducks/users/selectors';

const Home = () => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const userName = getUserName(selector);

  return (
    <div>
      <h2>Home</h2>
      <p>user ID : {uid}</p>
      <p>user name : {userName}</p>
    </div>
  );
};

export default Home;
