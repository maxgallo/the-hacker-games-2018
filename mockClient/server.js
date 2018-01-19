const Chatkit = require('pusher-chatkit-server');

const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:9f05b08d-52eb-45d0-a762-d8c36f3a063c',
    key: '3e88090e-c920-4012-8d0e-7413b69e3f9d:0+U8hoNfnh4XiiX7agrwEXFjLKEsyXrHfgUW+oCZfrU=',
});

chatkit.createUser('patrick', 'Patrick')
  .then(() => {
    console.log('User created successfully');
  }).catch((err) => {
    console.log(err);
  });
