import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CreateParty extends React.Component {
  constructor(props) {
    super(props);
    const {
      longitude, latitude, city, region,
    } = this.props;
    this.state = {
      name: '',
      start: '',
      end: '',
      date: '',
      radius: '',
      details: '',
      longitude,
      latitude,
      city,
      region,
      host_id: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      getNewPartyEntry, longitude, latitude, city, region,
    } = this.props;
    axios.post('/api/homepage', this.state)
      .then(() => {
        getNewPartyEntry();
        this.setState({
          name: '',
          start: '',
          end: '',
          date: '',
          radius: '',
          details: '',
          longitude,
          latitude,
          city,
          region,
          host_id: 1,
        });
      })
      .catch((error) => error);
  }

  render() {
    const {
      name, details, start, end, date, radius,
    } = this.state;
    return (
      <div className="party-creation">
        <div className="container-fluid">
          <div className="row">
            <div className="col center">
              <form onSubmit={this.handleSubmit}>
                <div className="create-list-title">
                  <h4>Host a Party</h4>
                </div>
                <div className="form-group creation-group">
                  <label htmlFor="party">
                    Party
                    <input
                      className="form-control creation-items creationListFormat"
                      name="name"
                      type="text"
                      value={name}
                      placeholder="Name Your Party"
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-group creation-group">
                  <label htmlFor="party-details">
                    Party Details
                    <textarea
                      className="form-control creation-items"
                      name="details"
                      rows="3.5"
                      placeholder={'80\'s theme?\nSignature cocktail?\nLet neighbors know!'}
                      value={details}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-group creation-group">
                  <label htmlFor="start-time">
                    Start Time
                    <input
                      className="form-control creation-items"
                      name="start"
                      type="time"
                      value={start}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-group creation-group">
                  <label htmlFor="end-time">
                    End Time
                    <input
                      className="form-control creation-items"
                      type="time"
                      name="end"
                      value={end}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-group creation-group">
                  <label htmlFor="date">
                    Date
                    <input
                      id="date"
                      className="form-control creation-items"
                      type="date"
                      name="date"
                      value={date}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div className="form-group creation-group">
                  <label htmlFor="distance">
                    Distance
                    <input
                      className="form-control creation-items"
                      type="number"
                      name="radius"
                      placeholder="Miles"
                      value={radius}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div>
                  <input
                    className="btn btn-primary create-submit"
                    type="submit"
                    value="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateParty.propTypes = {
  getNewPartyEntry: PropTypes.func,
  longitude: PropTypes.string,
  latitude: PropTypes.string,
  city: PropTypes.string,
  region: PropTypes.string,
};

CreateParty.defaultProps = {
  getNewPartyEntry: () => {},
  longitude: '',
  latitude: '',
  city: '',
  region: '',
};

export default CreateParty;
