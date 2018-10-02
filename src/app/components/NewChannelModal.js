import React, {
  Component
} from 'react';
import {
  createChannel,
  joinChannel
} from '../api/firebase';

class NewChannelModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      guests: '',
      public: true
    };
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
            position: 'relative',
            minWidth: 430,
            width: '45%'
          }}>
          <h3
            style={{
              padding: '0px 10px'
            }}
            >New channel</h3>
          <form
            style={{
              paddingBottom: 10
            }}
            onSubmit={(event) => {
              event.preventDefault();
              if (this.state.name !== '') {
                createChannel({
                  name: this.state.name,
                  public: this.state.public,
                  guests: `${this.props.user.key},${this.state.guests}`
                }, (data) => {
                  joinChannel(data, () => {
                    this.setState({
                      name: '',
                      public: true,
                      guests: ''
                    });
                    this.props.onClose();
                  });
                });
              }
            }}
            >
            <div
              style={{
                display: 'inline-block',
                width: '92%',
                padding: '0px 10px'
              }}
              >
              <input
                type="text"
                name="name"
                autoComplete="false"
                placeholder="Name"
                value={this.state.name}
                style={{
                  display: 'block',
                  width: '100%',
                  color: '#495057',
                  backgroundColor: '#fff',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da',
                  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                  height: 'calc(1.8125rem + 2px)',
                  borderRadius: '.2rem',
                  paddingLeft: 5,
                  paddingRight: 5
                }}
                onChange={(event) => {
                  this.setState({
                    name: event.target.value
                  })
                }}
                />
            </div>
            <div
              style={{
                padding: '5px 10px'
              }}
              >
              <input
                type="checkbox"
                name="public"
                checked={this.state.public}
                onChange={(event) => {
                  this.setState({
                    public: event.target.checked
                  });
                }}
                />
              <span
                style={{
                  marginRight: 5
                }}
                >public</span>
            </div>
            <div
              style={{
                display: 'inline-block',
                width: '92%',
                padding: '0px 10px'
              }}
              >
              <input
                type="text"
                name="name"
                autoComplete="false"
                placeholder="usernames separated by comma"
                value={this.state.guests}
                style={{
                  display: 'block',
                  width: '100%',
                  color: '#495057',
                  backgroundColor: '#fff',
                  backgroundClip: 'padding-box',
                  border: '1px solid #ced4da',
                  transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                  height: 'calc(1.8125rem + 2px)',
                  borderRadius: '.2rem',
                  paddingLeft: 5,
                  paddingRight: 5
                }}
                onChange={(event) => {
                  this.setState({
                    guests: event.target.value
                  })
                }}
                />
            </div>
            <div
              style={{
                padding: '5px 10px'
              }}
              >
              <button
                type="submit"
                style={{
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
                >Create</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewChannelModal;