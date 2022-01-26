import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from './reducks/users/actions';

const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  console.log(selector.users);

  return (
    <div>
      <button
        onClick={() =>
          dispatch(signInAction({ uid: '00001', username: 'tarahack' }))
        }
      >
        Sign In
      </button>
    </div>
  );
};

export default App;
