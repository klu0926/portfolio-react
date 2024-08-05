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
  faRightFromBracket,
  faL,
} from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect, useRef, useCallback } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { setMessages } from '../../store/messageSlice'
import { useSelector } from 'react-redux'
//   const posts = useSelector((state) => state.posts.data.data)

function SocketChat() {
  const [userData, setUserData] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [toggle, setToggle] = useState(false)
  const [hasLogin, setHasLogin] = useState(false)
  const messageInputRef = useRef()
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const chatRoomRef = useRef()
  const loginErrorRef = useRef()

  // redux
  const messages = useSelector((state) => state.messages)
  const dispatch = useDispatch()

  // Handlers ---------------------------
  const storeUserHandler = (name, email) => {
    if (name && email) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          name,
          email,
        })
      )
    }
    setUserData({ name, email })
  }

  const loginHandler = () => {
    if (name.trim() && email.trim()) {
      storeUserHandler(name, email)
      errorMessageHandler('')
    } else {
      errorMessageHandler('Missing name and email')
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('userData')
    setUserData(null)
    setHasLogin(false)
  }

  const sendMessageHandler = () => {
    if (message.trim() === '') return
    if (!userData) return
    const data = {
      from: socket.id,
      name: userData.name,
      email: userData.email,
      message,
      date: new Date(),
    }
    socket.emit('sentMessage', data)
    // clean up message
    messageInputRef.current.value = ''
    setMessage('')
  }

  const errorMessageHandler = (message) => {
    // remove message
    loginErrorRef.current.classList.remove(`${style.active}`)
    loginErrorRef.current.innerText = ''
    void loginErrorRef.current.offsetWidth

    // if Login
    // ...

    // if is not login
    if (!hasLogin && message) {
      loginErrorRef.current.classList.add(`${style.active}`)
      loginErrorRef.current.innerText = message
    }
  }

  // handler all Enter keydown depends on which input
  const onEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const messageInput = messageInputRef.current
      const nameInput = nameInputRef.current
      const emailInput = emailInputRef.current

      // if sendMessage
      if (document.activeElement === messageInput) {
        sendMessageHandler()
      }

      // if name / email (login)
      if (
        document.activeElement === nameInput ||
        document.activeElement === emailInput
      ) {
        loginHandler()
      }
    }
  }

  // Effects ---------------------------------
  // auto set userData
  useEffect(() => {
    let storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      storedUserData = JSON.parse(storedUserData)
      if (!storedUserData.email) return
      setUserData(storedUserData)
    }
  }, [])

  // auto socket login
  useEffect(() => {
    if (hasLogin) return
    if (userData?.name && userData?.email) {
      socket.emit('login', {
        name: userData.name,
        email: userData.email,
      })
      setHasLogin(true)
      console.log('socket login')
    }
  }, [userData, hasLogin])

  // socket onSendMessage
  useEffect(() => {
    socket.on('sentMessage', (data) => {
      console.log('Messages:', messages)
      dispatch(
        setMessages([
          ...messages,
          {
            from: data.from,
            message: {
              message: data.message.message,
              date: data.message.date,
            },
          },
        ])
      )
    })
    return () => {
      socket.off('sentMessage')
    }
  }, [dispatch, messages])

  // scroll to bottom on new message
  useEffect(() => {
    if (chatRoomRef.current) {
      const chatRoom = chatRoomRef.current
      chatRoom.scrollTop = chatRoom.scrollHeight - chatRoom.clientHeight // Scroll to the bottom
    }
  }, [messages]) // Runs whenever the `chat` array changes

  // Return
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
          <div className={style.topRightDiv}>
            {/* logout*/}
            <button className={style.logoutButton} onClick={logoutHandler}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            {/* close*/}
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
        </div>

        {/* login cover Div  */}
        <div className={`${style.loginDiv} ${!hasLogin ? style.active : ''}`}>
          <h3>Message</h3>
          <p>Please enter your name and email to start</p>
          {/* name input */}
          <input
            ref={nameInputRef}
            type="text"
            className={`form-control ${style.input}`}
            id="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            onKeyDown={onEnterKeyDown}
          />
          {/* email input */}
          <input
            ref={emailInputRef}
            type="email"
            className={`form-control ${style.input}`}
            id="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            onKeyDown={onEnterKeyDown}
          />
          <button className={style.loginButton} onClick={loginHandler}>
            OK
          </button>
          <span
            id="login-error"
            className={style.errorSpan}
            ref={loginErrorRef}
          >
            Error
          </span>
        </div>

        {/* chatroom */}
        <div className={style.chatRoom} ref={chatRoomRef}>
          {messages.map((item, index) => {
            if (item.from === 'server') {
              // from server
              return (
                <div
                  key={`${item.from}-${index}`}
                  className={style.serverMessageDiv}
                >
                  <p className={`${style.message} ${style.serverMessage}`}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className={style.serverIcon}
                    />
                    <span>{item.message.message}</span>
                  </p>
                </div>
              )
            } else if (item.from === 'lu') {
              // from lu
              return (
                <div
                  key={`${item.from}-${index}`}
                  className={style.luMessageDiv}
                >
                  <img src="/favicon/favicon-32x32.png" />
                  <p className={`${style.message} ${style.luMessage}`}>
                    <span>{item.message.message}</span>
                  </p>
                </div>
              )
            } else {
              // from myself
              return (
                <p
                  key={`${item.from}-${index}`}
                  className={`${style.message} ${style.myMessage}`}
                >
                  <span>{item.message}</span>
                </p>
              )
            }
          })}
        </div>
        {/* message input */}
        <div className="input-group mb-2">
          <input
            ref={messageInputRef}
            onKeyDown={onEnterKeyDown}
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
