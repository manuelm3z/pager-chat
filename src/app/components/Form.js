import React, {
  Component
} from 'react';
import {
  newMessage
} from '../api/firebase';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  render() {
    return (
      <form
        action=""
        style={{
          padding: 3,
          display: 'flex',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid rgba(0, 0, 0, .1)',
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (this.state.message !== '') {
            newMessage(this.props.channel.key, {
              user: this.props.user.key,
              text: this.state.message,
              type: 'chat-message'
            }, () => {
              this.setState({
                message: ''
              });
            });
          }
        }}
        >
        <input
          type="text"
          autoComplete="off"
          style={{
            border: '1px solid rgb(206, 212, 218)',
            width: '88%',
            marginRight: '.5%',
            display: 'block',
            color: 'rgb(73, 80, 87)',
            backgroundColor: 'rgb(255, 255, 255)',
            backgroundClip: 'padding-box',
            transition: 'border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s',
            height: 'calc(1.8125rem + 2px)',
            borderRadius: '0.2rem',
            paddingLeft: 5,
            paddingRight: 5
          }}
          value={this.state.message}
          name="message"
          onChange={(event) => {
            this.setState({
              message: event.target.value
            })
          }}
          />
        <button
          style={{
            width: '9%',
            display: 'inline-block',
            fontWeight: 400,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
            userSelect: 'none',
            border: '1px solid transparent',
            transition: 'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out',
            color: '#fff',
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            padding: '.25rem .5rem',
            fontSize: '.875rem',
            lineHeight: '1.5',
            borderRadius: '.2rem'
          }}
          type="submit"
          >Send</button>
        <p
          id="typing"
          style={{
            color: '#fff'
          }}
          ></p>
      </form>
    );
  }
}

export default Form;