import React, {
  Component
} from 'react';
import {
  subscribeNewMessage,
  unSubscribeNewMessage,
  getMessages
} from '../api/firebase';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.subcriptions = {};
    this.changeSubscription = this.changeSubscription.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  changeSubscription(lastChannel, newChannel) {
    if (newChannel) {
      unSubscribeNewMessage(this.subcriptions[lastChannel]);
    }
    subscribeNewMessage(this.subcriptions, newChannel, (message) => {
      const messages = this.state.messages;
      messages.push(message);
      this.setState({
        messages
      });
      this.scrollToBottom();
    });
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.channel.key !== nextProps.channel.key) {
      getMessages(nextProps.channel.key, (messages) => {
        this.setState({
          messages
        });
      })
      if (nextProps.channel.key) {
        this.changeSubscription(this.props.channel.key, nextProps.channel.key);
      }
    }
  }
  renderMessage(item) {
    if (item.type == 'join-channel') {
      return (
        <span>{`${item.user} has just connected`}</span>
      );
    } else {
      return (
        <span>
          <strong>{item.user}:</strong> {item.text}
        </span>
      );
    }
  }
  scrollToBottom() {
    this.bottomList.scrollIntoView({
      behavior: "smooth"
    });
  }
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 48px)',
          overflowY: 'auto',
        }}
        >
        <div
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, .1)',
            paddingLeft: 10
          }}
          >
          <h2
            style={{
              marginTop: 0,
              marginBottom: 5
            }}
            >{this.props.channel.title}</h2>
        </div>
        <ul
          id="messages"
          style={{
            listStyleType: 'none',
            margin: 0,
            paddingLeft: 10,
            width: '90%',
            display: 'inline-block'
          }}
          >{this.state.messages.map((item, key) => {
            return (
              <li
                style={item.type === 'join-channel' ? {
                  backgroundColor: '#eee'
                } : {
                  padding: '5px 0px'
                }}
                key={item.timestamp ? item.timestamp : key}
                >{this.renderMessage(item)}</li>
            );
          })}
          <li ref={(el) => {
            this.bottomList = el;
          }}></li>
        </ul>
      </div>
    );
  }
}

export default Messages;