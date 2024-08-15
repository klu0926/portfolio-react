import url from '../../data/url'
import dayjs from 'dayjs'
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
  // redux
  const reduxMessages = useSelector((state) => state.messages)
  const dispatch = useDispatch()
  // const [allMessages, setAllMessages] = useState([])

  const [userData, setUserData] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [toggle, setToggle] = useState(false)
  const [hasLogin, setHasLogin] = useState(false)
  const [lastRead, setLastRead] = useState('')
  const [newMessagesCount, setNewMessagesCount] = useState(0)
  const messageInputRef = useRef()
  const nameInputRef = useRef()
  const emailInputRef = useRef()
  const chatRoomRef = useRef()
  const chatRoomContainerRef = useRef()
  const toggleButtonRef = useRef()
  const loginErrorRef = useRef()
  const newMessageCountRef = useRef()

  // Handlers ---------------------------
  const storeUserHandler = (user) => {
    const { id, email, name } = user
    if (id && email && name) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          id,
          name,
          email,
        })
      )
    }
    setUserData({ id, name, email })
  }

  const loginHandler = () => {
    if (name.trim() && email.trim()) {
      socket.emit('login', {
        email,
        name,
      })
      errorMessageHandler('')
    } else {
      errorMessageHandler('Missing name and email')
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem('userData')
    setUserData(null)
    setHasLogin(false)
    nameInputRef.current.value = ''
    emailInputRef.current.value = ''
    // emit to server
    socket.emit('logout')
  }

  const sendMessageHandler = () => {
    if (message.trim() === '') return
    socket.emit('message', {
      from: 'user',
      userId: userData.id,
      message,
    })
    // clean up message
    messageInputRef.current.value = ''
    setMessage('')
  }

  const errorMessageHandler = (message) => {
    // remove message
    loginErrorRef.current.classList.remove(`${style.active}`)
    loginErrorRef.current.innerText = ''
    void loginErrorRef.current.offsetWidth // reset class

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

  const toggleButtonHandler = () => {
    setToggle((old) => !old)
    if (hasLogin) {
      setLastReadTime()
    }
  }

  const setLastReadTime = () => {
    const now = new Date().toISOString()
    localStorage.setItem('lastReadObject', now)
    setLastRead(now)
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
    if (!userData) return
    if (userData.name && userData.email) {
      socket.emit('login', {
        name: userData.name,
        email: userData.email,
      })
    }
  }, [userData, hasLogin])

  // socket on login
  useEffect(() => {
    socket.on('login', (data) => {
      setHasLogin(data.login)

      // store to local storage
      if (data.user) {
        storeUserHandler(data.user)
      }
    })
  })

  // socket on error
  useEffect(() => {
    socket.on('error', (message) => {
      errorMessageHandler(message)
    })
  })

  // socket on message
  useEffect(() => {
    socket.on('message', (messages) => {
      dispatch(setMessages(messages))

      // if chat is open, update last read
      if (toggle) {
        setLastRead(new Date().toISOString())
      }
    })
    return () => {
      socket.off('message')
    }
  }, [dispatch, reduxMessages, toggle])

  // socket on adminDeleteUser (when user is delete by admin)
  useEffect(() => {
    socket.on('adminDeleteUser', () => {
      logoutHandler()
    })
  }, [])

  // auto get lastReadObject
  useEffect(() => {
    let lastReadString = localStorage.getItem('lastReadObject') || ''
    if (lastReadString) {
      setLastRead(lastReadString)
    }
  }, [])

  // count new messages
  useEffect(() => {
    let newMessagesCount = 0

    if (reduxMessages && lastRead) {
      const filterMessages = reduxMessages.filter((message) => {
        return message.from !== 'user'
      })
      filterMessages.forEach((message) => {
        const isAfter = dayjs(new Date(message.createdAt)).isAfter(
          new Date(lastRead)
        )
        if (isAfter) {
          newMessagesCount++
        }
      })
    }
    // toggle active
    if (!toggle && newMessagesCount > 0) {
      // reset class for animation
      newMessageCountRef.current.classList.remove(style.active)
      void newMessageCountRef.current.offsetWidth // reset class
      newMessageCountRef.current.classList.add(style.active)
    } else {
      newMessageCountRef.current.classList.remove(style.active)
    }
    setNewMessagesCount(newMessagesCount)
  }, [reduxMessages, lastRead, newMessageCountRef, toggle])

  // scroll to bottom on new message
  useEffect(() => {
    if (chatRoomRef.current) {
      // Scroll to the bottom
      const chatRoom = chatRoomRef.current
      chatRoom.scrollTop = chatRoom.scrollHeight - chatRoom.clientHeight
    }
  }, [reduxMessages]) // Runs whenever the `chat` array changes

  // toggle off chatRoom if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInside = chatRoomContainerRef.current.contains(event.target)
      const isChatRoomActive = chatRoomContainerRef.current.classList.contains(
        style.active
      )

      if (toggleButtonRef.current.contains(event.target)) {
        return
      }

      if (!isInside && isChatRoomActive) {
        setToggle(false)
      }
    }
    // Add event listener
    document.addEventListener('click', handleClickOutside)
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // Return
  return (
    <>
      {/* toggle button */}
      <div
        ref={toggleButtonRef}
        className={`${style.toggleButton} ${toggle && style.active}`}
        onClick={toggleButtonHandler}
      >
        <div className={style.newMessageCountDiv}>
          <div className={style.newMessageCount} ref={newMessageCountRef}>
            {newMessagesCount}
          </div>
        </div>
        <FontAwesomeIcon icon={faCommentDots} className={style.chatIcon} />
      </div>
      {/* chatroom container */}
      <div
        ref={chatRoomContainerRef}
        className={`${style.chatRoomContainer} ${toggle && style.active}`}
      >
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
          {reduxMessages.map((m, index) => {
            const messageDate = dayjs(m.createdAt).format('MMMM D, h:mm A')

            if (m.from === 'server') {
              // from server
              return (
                <div
                  key={`${m.from}-${index}`}
                  className={style.serverMessageDiv}
                >
                  <p className={`${style.message} ${style.serverMessage}`}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      className={style.serverIcon}
                    />
                    <span>{m.message}</span>
                  </p>
                </div>
              )
            } else if (m.from === 'lu') {
              // from lu
              return (
                <div key={`${m.from}-${index}`}>
                  <div className={style.luMessageDiv}>
                    <img src="/favicon/favicon-32x32.png" />
                    <div className={`${style.message} ${style.luMessage}`}>
                      {m.message}
                    </div>
                  </div>
                  <span className={`${style.luMessageDate}`}>
                    {messageDate}
                  </span>
                </div>
              )
            } else if (m.from === 'user') {
              // from user
              return (
                <div
                  key={`${m.from}-${index}`}
                  className={style.userMessageDiv}
                >
                  <div
                    key={`${m.from}-${index}`}
                    className={`${style.message} ${style.userMessage}`}
                  >
                    {m.message}
                  </div>
                  <span className={`${style.messageDate}`}>{messageDate}</span>
                </div>
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
