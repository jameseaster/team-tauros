import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ChatPeopleList = ({ users, username }) => {
  const [flag, setFlag] = useState(false);

  const showCharacter = (e) => {
    e.preventDefault();
    if (!flag) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row" />
      <h5 className="partiers">Guests:</h5>
      <div className="container-fluid guest-list">
        {users.map((user) => (
          <div key={user.id}>
            {user.name}
            {' '}
            {flag && username !== user.name
              ? (
                <div>
                  (
                  {user.character}
                  )
                </div>
              )
              : null}
          </div>
        ))}
      </div>
      <h4>Game Rules:</h4>
      <ul className="rules">
        <li>Everyone receives a character name</li>
        <li>Players ask yes or no questions to identify their own character name</li>
        <li><em>Hint:</em> Start by asking broad questions</li>
        <li>To win: You will be congratulated if you guess correctly in the chat</li>
      </ul>
      <button type="button" className="btn btn-primary" onClick={showCharacter}>Play Game</button>
    </div>
  );
};

ChatPeopleList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  username: PropTypes.string,
};

ChatPeopleList.defaultProps = {
  users: [],
  username: '',
};

export default ChatPeopleList;
