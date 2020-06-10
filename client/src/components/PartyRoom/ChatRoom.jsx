import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';
import ChatHeader from './ChatHeader.jsx';
import ChatSidebar from './ChatSidebar.jsx';
import Messages from './Messages.jsx';

let socket;

const ChatRoom = ({ partyInfo, username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [room] = useState(partyInfo.name);

  // DEVELOPMENT variable
  // const endPoint = 'localhost:8080';
  // PRODUCTION variable
  const endPoint = 'http://ec2-13-59-74-229.us-east-2.compute.amazonaws.com:8081/#/';

  useEffect(() => {
    socket = io(endPoint);
    socket.emit('join', { room, username }, () => { });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [room, username]);

  useEffect(() => {
    socket.on('receiveMessage', (incomingMessage) => {
      setMessages((messages) => [...messages, incomingMessage]);
    });

    socket.on('receiveImage', (image) => {
      setMessages((messages) => [...messages, image]);
    });

    socket.on('usersInRoom', (currentUsers) => {
      setUsers(currentUsers);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', { message }, () => setMessage(''));
    }
  };

  const leftParty = () => {
    socket.emit('leaveParty', room);
  };

  const renderRedirect = () => {
    if (username || partyInfo.name) {
      return null;
    }
    return <Redirect to="/" />;
  };

  const sendUrl = (imageUrl) => {
    socket.emit('sendMessage', { message: imageUrl }, () => setMessage(''));
  };

  return (
    <div className="container-fluid chat-room">
      {renderRedirect()}
      <div className="row">
        <div className="col">
          <ChatHeader partyInfo={partyInfo} />
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className="col message-view">
          <Messages
            messages={messages}
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            leftParty={leftParty}
            sendUrl={sendUrl}
          />
        </div>
        <div className="col sidebar">
          <ChatSidebar username={username} users={users} partyInfo={partyInfo} />
        </div>
      </div>
    </div>
  );
};

ChatRoom.propTypes = {
  partyInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
    PropTypes.objectOf(PropTypes.string),
  ])),
  username: PropTypes.string,
};

ChatRoom.defaultProps = {
  partyInfo: {},
  username: '',
};
export default ChatRoom;
