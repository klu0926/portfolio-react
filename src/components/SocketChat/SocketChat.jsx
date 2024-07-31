import url from '../../data/url'
const server = url.server
const socket = io.connect(server)
import style from './socketChat.module.scss'

import { useState, useEffect, useRef } from 'react'

function SocketChat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [toggle, setToggle] = useState(false)
  const inputRef = useRef()
  const chatRoomRef = useRef()

  const sendMessageHandler = () => {
    if (message.trim() === '') return
    const data = {
      from: socket.id,
      message,
    }
    socket.emit('sentMessage', data)
    // clean up message
    inputRef.current.value = ''
    setMessage('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessageHandler()
    }
  }

  // Receive message
  useEffect(() => {
    socket.on('sentMessage', (data) => {
      console.log('message:', data)
      console.log('my id:', socket.id)
      setChat((old) => [
        ...old,
        {
          from: data.from,
          message: data.message,
        },
      ])
    })
    return () => {
      socket.off('sentMessage')
    }
  }, [chat])

  // scroll to bottom on new message
  useEffect(() => {
    if (chatRoomRef.current) {
      const chatRoom = chatRoomRef.current
      chatRoom.scrollTop = chatRoom.scrollHeight - chatRoom.clientHeight // Scroll to the bottom
      // clientTop + scrollTop = scrollHeight
    }
  }, [chat]) // Runs whenever the `chat` array changes

  return (
    <>
      <div
        className={style.toggleButton}
        onClick={() => {
          setToggle((old) => !old)
        }}
      >
        {toggle ? 'true': 'false'}
      </div>
      <div className={style.chatRoomContainer}>
        <div className={style.chatRoom} ref={chatRoomRef}>
          {chat.map((c, index) => {
            if (c.from === socket.id) {
              // from myself
              return (
                <p
                  key={index}
                  className={`${style.message} ${style.sendMessage}`}
                >
                  <span>{c.message}</span>
                </p>
              )
            } else if (c.from === 'server') {
              // from server
              return (
                <p
                  key={index}
                  className={`${style.message} ${style.serverMessage}`}
                >
                  <span>{c.message}</span>
                </p>
              )
            } else {
              // from others
              return (
                <p
                  key={index}
                  className={`${style.message} ${style.receiveMessage}`}
                >
                  <span>{c.message}: receive</span>
                </p>
              )
            }
          })}
        </div>
        <div className="input-group mb-2">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className={`form-control ${style.messageInput}`}
            placeholder="message..."
          />
          <button
            onClick={sendMessageHandler}
            className={style.sendButton}
            type="button"
            id="button-addon2"
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

export default SocketChat
