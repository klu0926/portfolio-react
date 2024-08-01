import url from '../../data/url'
const server = url.server
const socket = io.connect(server)
import style from './socketChat.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCommentDots,
  faTriangleExclamation,
  faX,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect, useRef } from 'react'

function SocketChat() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [toggle, setToggle] = useState(false)
  const inputRef = useRef()
  const chatRoomRef = useRef()

  const sendMessageHandler = () => {
    if (message.trim() === '') return
    const data = {
      from: socket.id,
      name,
      email,
      message,
      date: new Date(),
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
      {/* toggle button */}
      <div
        className={`${style.toggleButton} ${toggle && style.active}`}
        onClick={() => {
          setToggle((old) => !old)
        }}
      >
        <FontAwesomeIcon icon={faCommentDots} className={style.chatIcon} />
      </div>
      {/* chatroom container */}
      <div className={`${style.chatRoomContainer} ${toggle && style.active}`}>
        {/* top */}
        <div className={style.top}>
          <h3>Message</h3>
          <div
            id="close"
            className={style.close}
            onClick={() => {
              setToggle((old) => !old)
            }}
          >
            <FontAwesomeIcon className={style.closeIcon} icon={faX} />
          </div>
        </div>
        {/* name input */}
        <input
          type="text"
          className={`form-control ${style.input}`}
          id="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
        />
        {/* email input */}
        <input
          type="email"
          className={`form-control ${style.input}`}
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        {/* chatroom */}
        <div className={style.chatRoom} ref={chatRoomRef}>
          {chat.map((c, index) => {
            if (c.from === 'server') {
              // from server
              return (
                <>
                  <div className={style.serverMessageDiv}>
                    <p
                      key={index}
                      className={`${style.message} ${style.serverMessage}`}
                    >
                      <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className={style.serverIcon}
                      />
                      <span>{c.message}</span>
                    </p>
                  </div>
                </>
              )
            } else if (c.from === 'lu') {
              // from lu
              return (
                <>
                  <div className={style.luMessageDiv}>
                    <img src="/favicon/favicon-32x32.png" />
                    <p
                      key={index}
                      className={`${style.message} ${style.luMessage}`}
                    >
                      <span>{c.message}</span>
                    </p>
                  </div>
                </>
              )
            } else {
              // from myself
              return (
                <p
                  key={index}
                  className={`${style.message} ${style.myMessage}`}
                >
                  <span>{c.message}</span>
                </p>
              )
            }
          })}
        </div>
        {/* message input */}
        <div className="input-group mb-2">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className={`form-control ${style.input}`}
            placeholder="message..."
          />
          <button
            onClick={sendMessageHandler}
            className={`${style.sendButton} ${message && style.active}`}
            type="button"
            id="button-addon2"
          >
            <FontAwesomeIcon className={style.sendIcon} icon={faPlay} />
          </button>
        </div>
      </div>
    </>
  )
}

export default SocketChat
