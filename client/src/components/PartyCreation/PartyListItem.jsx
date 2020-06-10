import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import { useAlert } from 'react-alert';
import distance from '../../Utils/LocationEquation.js';
import { thirtyMinBeforeTodaysParty, formatTime, formatDate } from '../../Utils/time.js';

const PartyListItem = ({
  party,
  getPartyInfo,
  longitude,
  latitude,
}) => {
  const [redirect, setRedirect] = useState(false);
  const alert = useAlert();

  const joinParty = () => {
    setRedirect(true);
  };

  const renderParty = () => {
    if (redirect) {
      return <Redirect to="/chatroom" />;
    }
  };

  const canJoinParty = (date, start) => {
    const distanceFromParty = distance(party.host_lat, party.host_long, latitude, longitude);
    if (distanceFromParty <= party.radius) {
      if (thirtyMinBeforeTodaysParty(date, start)) {
        joinParty();
      } else {
        alert.show(`The party hasn't started yet. You can join 30 minutes before ${formatTime(start)} on ${formatDate(date)}`);
      }
    } else {
      alert.show(`
        You are ${Math.round(10 * distanceFromParty) / 10} miles away from this party.
        The host has invited people within ${party.radius} miles.`);
    }
    getPartyInfo(party);
  };

  const {
    name,
    date,
    start,
    city,
    radius,
    details,
    region,
  } = party;
  return (
    <div>
      {renderParty()}
      <div className="party-container container-fluid border">
        <div className="row party-list-item">
          <div className="partyName col">{name}</div>
          <div className="partyName col"><Moment parse="YYYY-MM-DD" format="MMM D, YYYY">{date}</Moment></div>
          <div className="partyStart col"><Moment parse="HH:mm:ss" format="h:mm a">{start}</Moment></div>
          <div className="partyEnd col">
            {city}
            {', '}
            {region}
          </div>
          <div className="partyEnd col">{radius}</div>
          <div className="partyDetails col">{details}</div>
          <div className="partyLink col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => (canJoinParty(date, start))}
            >
              Join Party
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PartyListItem.propTypes = {
  party: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
    PropTypes.objectOf(PropTypes.string),
  ])),
  getPartyInfo: PropTypes.func,
  longitude: PropTypes.string,
  latitude: PropTypes.string,
};

PartyListItem.defaultProps = {
  party: {},
  getPartyInfo: () => {},
  longitude: '',
  latitude: '',
};

export default PartyListItem;
