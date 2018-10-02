import {
  initializeApp
} from 'firebase';

var config = {
  apiKey: "AIzaSyDk7wjobKmn-EBXLVhb3rDDxQdRssQXQTY",
  authDomain: "pager-chat.firebaseapp.com",
  databaseURL: "https://pager-chat.firebaseio.com",
  projectId: "pager-chat",
  storageBucket: "pager-chat.appspot.com",
  messagingSenderId: "660358954718"
};

const firebase = initializeApp(config);
const database = firebase.database();

function initChannel() {
  database.ref('channels/general').once('value', (snapshot) => {
    let channel = snapshot.val();
    if (channel === null) {
      createChannel({
        name: 'general'
      });
    }
  });
}

initChannel();

export function createChannel(data, cb) {
  let key = data.name.split(' ').join('-').toLowerCase();
  let users = data.guests ? data.guests.split(',') : []
  database.ref(`channels/${key}`).set({
    title: data.name,
    timestamp: new Date().getTime(),
    public: data.public
  }, () => {
    cb({
      name: key,
      guests: users
    })
  });
}

export function joinChannel(data, cb = () => {}) {
  let key = data.name.split(' ').join('-').toLowerCase();
  database.ref(`members/${key}`).on('value', (snapshot) => {
    let users = snapshot.val();
    data.guests.forEach(name => {
      database.ref(`members/${key}/${name}`).set(true);
      if (users) {
        if (!users[name]) {
          database.ref(`messages/${key}`).push({
            user: name,
            type: 'join-channel',
            timestamp: new Date().getTime()
          });
        }
      } else {
        database.ref(`messages/${key}`).push({
          user: name,
          type: 'join-channel',
          timestamp: new Date().getTime()
        });
      }
    });
  });
  cb(key, database.ref(`channels/${key}`));
}

export function leaveChannel(channel, user) {
  database.ref(`members/${channel}/${user}`).set(false);
}

export function subscribeNewChannels(cb) {
  database.ref('channels').on('value', (snapshot) => {
    let channelsDB = snapshot.val();
    let channels = [];
    Object.keys(channelsDB).forEach(name => {
      channels.push({
        key: name,
        title: channelsDB[name].title,
        timestamp: channelsDB[name].timestamp,
        public: channelsDB[name].public ? channelsDB[name].public : false
      })
    });
    cb(channels);
  });
}

export function subscribeNewMembers(cb) {
  database.ref('members').on('value', (snapshot) => {
    cb(snapshot.val());
  });
}

export function createUser(name, cb) {
  let key = name.split(' ').join('-').toLowerCase();
  database.ref(`users/${key}`).once('value', (snapshot) => {
    if (snapshot.val() == null) {
      database.ref(`users/${key}`).set({
        name,
        timestamp: new Date().getTime()
      }, () => {
        cb({
          key,
          name
        });
      });
    } else {
      cb({
          key,
          name
        });
    }
  });
}

export function newMessage(channel, data, cb) {
  database.ref(`messages/${channel}`).push({
    user: data.user,
    text: data.text,
    type: 'chat-message',
    timestamp: new Date().getTime()
  });
  cb();
}

export function subscribeNewMessage(obj, channel, cb) {
  obj[channel] = database.ref(`messages/${channel}`);
  obj[channel].on('child_added', (snapshot) => {
    cb(snapshot.val());
  });
}

export function unSubscribeNewMessage(obj) {
  if (obj && obj.off) {
    obj.off();
  }
};

export function getMessages(channel, cb) {
  database.ref(`messages/${channel}`).once('value', (snapshot) => {
    let messagesDB = snapshot.val();
    let messages = [];
    if (messagesDB) {
      Object.keys(messagesDB).forEach(name => {
        const message = {
          user: messagesDB[name].user,
          type: messagesDB[name].type,
          timestamp: messagesDB[name].timestamp
        };
        if (messagesDB[name].text) {
          message.text = messagesDB[name].text;
        }
        messages.push(message);
      });
    }
    cb(messages);
  });
}

export default firebase;