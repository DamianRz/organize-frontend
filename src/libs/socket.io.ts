// import io from 'socket.io-client';
import io from 'socket.io';
const socket = io('http://localhost:3000');

socket.on('welcome', (response: any) => {
  console.log(response)
});

export default {}
