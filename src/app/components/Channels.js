import React, {
  Component
} from 'react';
import NewChannelModal from './NewChannelModal';
import {
  subscribeNewChannels,
  joinChannel
} from '../api/firebase';
import './Channels.css';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      showModal: false
    };
    this.checkPermission = this.checkPermission.bind(this);
  }
  componentDidMount() {
    subscribeNewChannels(channels => {
      this.setState({
        channels
      });
    });
  }
  checkPermission(channel) {
    if (channel.public) {
      return true;
    } else {
      if (this.props.members[channel.key]) {
        return this.props.members[channel.key][this.props.user.key] || false;
      }
    }
    return false;
  }
  render() {
    return (
      <div
        style={{
          width: 200,
          height: 'calc(100vh - 48px)',
          borderRight: '1px solid rgba(0, 0, 0, .1)',
          paddingTop: 5,
          paddingLeft: 5
        }}
        className="channels"
        >
        <div>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 5,
              position: 'relative'
            }}
            >Channels <span
              className="plus"
              onClick={() => {
                this.setState({
                  showModal: true
                });
              }}
              >+</span></h3>
        </div>
        <ul
          style={{
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            width: '90%',
            display: 'inline-block',
          }}
          >{this.state.channels.map((channel) => {
            if (this.checkPermission(channel)) {
              return (
                <li
                  key={channel.key}
                  style={{
                    padding: '5px 2px'
                  }}
                  className="channel"
                  >
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      this.props.onClick(channel);
                      joinChannel({
                        name: channel.key,
                        guests: [this.props.user.key]
                      });
                    }}
                    className={channel.title == this.props.current.title ? 'selected' : ''}
                    >
                    <i className={channel.public ? "fas fa-hashtag" : "fas fa-lock"}></i> {channel.title}
                  </a>
                </li>
              );
            } else {
              return '';
            }
        })}</ul>
        <NewChannelModal
          show={this.state.showModal}
          user={this.props.user}
          onClose={() => {
            this.setState({
              showModal: false
            });
          }}
          />
      </div>
    );
  }
}

export default Channels;