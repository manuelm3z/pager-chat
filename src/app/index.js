import React, {
  Component
} from 'react';
import {
  subscribeNewMembers
} from '../app/api/firebase';
import {
  newUserMessage,
  newMessage
} from '../app/helpers/messages';
import {
  changeChannel
} from '../app/helpers/channels';
import Channels from './components/Channels';
import Messages from './components/Messages';
import Modal from './components/Modal';
import Form from './components/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true,
      user: {},
      currentChannel: {},
      members: {}
    };
    subscribeNewMembers((members) => {
      this.setState({
        members
      });
    });
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex'
          }}
          >
          <Channels
            current={this.state.currentChannel}
            onClick={(channel) => {
              this.setState({
                currentChannel: channel
              });
            }}
            user={this.state.user}
            members={this.state.members}
            />
          <Messages
            channel={this.state.currentChannel}
            />
        </div>
        <Form
          channel={this.state.currentChannel}
          user={this.state.user}
          />
        <Modal
          show={this.state.modalShow}
          onCreateUser={(data) => {
            this.setState({
              user: data.user,
              currentChannel: data.channel,
              modalShow: false
            })
          }}
          />
      </div>
    );
  }
}

export default App;