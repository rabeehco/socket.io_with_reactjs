import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from 'react'

const socket = io.connect("http://localhost:3001")

function App() {
  
  const [message, setMessage] = useState("")
  const [messageRecieved, setMessageRecieved] = useState('')

  const sendMessage = () => {
    socket.emit("send_message", {message})   
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageRecieved(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder='message...' onChange={(event) => {setMessage(event.target.value)}}/>
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message</h2>
      <p>{messageRecieved}</p>
    </div>
  );
}

export default App;
