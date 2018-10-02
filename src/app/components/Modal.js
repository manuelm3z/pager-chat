import React, {
  Component
} from 'react';
import {
  createUser,
  joinChannel
} from '../api/firebase';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }
  render() {
    return (
      <div
        id="modal-nickname"
        style={{
          transition: 'all .5s',
          padding: '19% 0',
          backgroundColor: 'rgba(0, 0, 0, .5)',
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          textAlign: 'center',
          display: this.props.show ? 'inline-block' : 'none'
        }}>
        <div
          style={{
            backgroundColor: '#fff',
            opacity: 1,
            display: 'inline-block',
            verticalAlign: 'middle',
            textAlign: 'left',
            position: 'relative'
          }}>
          <h4
            style={{
              paddingLeft: 5
            }}>Type your nickname</h4>
          <form
            action=""
            id='form-nickname'
            style={{
              padding: 5
            }}
            onSubmit={(event) => {
              event.preventDefault();
              if (this.state.username !== '') {
                createUser(this.state.username, (data) => {
                  joinChannel({
                    name: 'general',
                    guests: [data.key]
                  }, (channel, channelRef) => {
                    channelRef.once('value', (snapshot) => {
                      let channelData = snapshot.val();
                      channelData.key = channel;
                      this.props.onCreateUser({
                        user: data,
                        channel: channelData
                      });
                    });
                  });
                });
              }
            }}
            >
            <input
              type="text"
              autoComplete="off"
              id="nickname"
              name="nickname"
              value={this.state.username}
              onChange={(event) => {
                this.setState({
                  username: event.target.value
                })
              }}
              />
            <button
              type="submit"
              >Go</button>
          </form>
        </div>
      </div>
    );
  }
};

export default Modal;