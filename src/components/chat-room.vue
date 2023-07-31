<template>
    <div class="chat-room-container">
      <h2>Chat</h2>
      <div @click="$emit('close')" class="close-btn">X</div>
      <h3 v-if="typingUser">{{ typingUser }} is typing...</h3>
      <div class="chat-list">
        <TransitionGroup name="list" tag="ul">
          <div v-for="(msg, idx) in [...msgHistory, ...msgs]" :key="idx" class="chat-msg">
            <p>{{ msg.username }}: {{ msg.txt }}</p>
          </div>
        </TransitionGroup>
      </div>
      <div class="send-box flex">
        <input class="grow-1" type="text" v-model="msg" @input="typing" placeholder="Write your message" />
        <button @click="sendMsg" class="send-btn">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import { socketService } from '../services/socket-service.js'
  import { utilService } from '../services/util-service.js'
  export default {
    name: 'chat-room',
    props: {
      toyId: String,
      msgHistory: Array,
    },
    data() {
      return {
        msg: '',
        msgs: [],
        typingUser: null,
      }
    },
    created() {
      //2
      socketService.emit('chat topic', this.toyId)
      //3
      //get data from backend using socket, listen to event
      socketService.on('chat addMsg', this.addMsg)
      //4
      socketService.on('user-typing', (username) => {
        this.typingUser = username
      })
      this.bounce = utilService.debounce(this.clearTyping)
    },
    computed: {
      user() {
        return this.$store.getters.getUser
      },
    },
    methods: {
      addMsg(msg) {
        this.msgs.push(msg)
      },
      sendMsg() {
        const msg = {
          txt: this.msg,
          username: this.user?.username || 'Guest',
        }
        //send data to backend using socket
        socketService.emit('chat newMsg', msg)
        this.msg = ''
      },
      typing() {
        this.setTyping()
        this.bounce()
      },
      setTyping() {
        socketService.emit('user-typing', this.user?.username || 'Guest')
      },
      clearTyping() {
        socketService.emit('user-typing', null)
      },
      bounce() { },
    },
  
    unmounted() {
      socketService.off('chat addMsg', this.addMsg)
      socketService.off('user-typing')
    },
  }
  </script>
  
  <style lang="scss" scoped>
  ul {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  
  h3 {
    color: white
  }
  
  .chat-room-container {
    border-radius: 7px 7px 0px 0px;
    position: fixed;
    bottom: 0px;
    right: 4px;
    background-color: #6a97b5;
    padding: 10px;
    box-shadow: 0 0 0 1px rgb(53 72 91 / 7%), 0 2px 2px rgb(0 0 0 / 1%), 0 4px 4px rgb(0 0 0 / 2%), 0 10px 8px rgb(0 0 0 / 3%), 0 15px 15px rgb(0 0 0 / 3%), 0 30px 30px rgb(0 0 0 / 4%), 0 70px 65px rgb(0 0 0 / 5%);
    min-width: 500px;
  
    .chat-list {
      min-height: 250px;
    }
  
    p {
      padding: 0;
      margin: 0;
    }
  
    .chat-msg {
      background-color: white;
      margin-bottom: 1em;
      padding: 10px 20px;
      max-width: max-content;
      border-radius: 0px 10px 10px 10px;
      display: flex;
    }
  
    .chat-msg:nth-child(even) {
      background-color: #2fc8ba;
      color: white;
      border-radius: 10px 0px 10px 10px;
      align-self: flex-end;
    }
  
    .send-box {
      height: 35px;
    }
  
    input {
      padding: 15px;
      border: none;
      width: 250px;
      border-bottom: 1px solid #5c637b;
      flex-grow: 1;
  
      &::placeholder {
        color: rgb(175, 175, 175);
      }
  
      &:focus-visible {
        border-bottom: none;
        outline: 3px solid #2fc8ba;
        border-radius: 3px;
      }
  
    }
  
    .close-btn {
      position: absolute;
      right: 8px;
      top: 8px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  
  .send-btn {
    background-color: #2fc8ba;
    color: white;
    font-weight: bold;
    border: none;
    padding: 0 0.5em;
    cursor: pointer;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>
  