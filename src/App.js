import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat'
import './App.css'
import Pusher from 'pusher-js'
import axios from './axios'
import Login from './components/Login/Login';
import { auth } from './Firebase/firebase.utils'
import UserContext from './ContextAPI/User/UserContext'
import { Route, Switch } from 'react-router-dom'
import Land from './components/Land/Land';



function App() {
  // const [messages, setMessages] = useState([])
  const [user, setUser] = useState(null);
  const [pushFromChat, setPushFromChat] = useState(1);
  const [forRoute, setForRoute] = useState(1);

  const callbackFunction = (childData) => {
    setPushFromChat(childData)
  }

  const parentCallBackTwo = (childData) => {
    setForRoute(childData)
  }
  
  let unsubscribeFromAuth = null

  useEffect(() => {

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      const phone = "0" + randomIntFromInterval(7, 9) + randomIntFromInterval(0, 1) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9) + randomIntFromInterval(0, 9)
      if (userAuth) {
        await axios.post('/register', {
          appPhoneNumber: phone,
          displayName: userAuth.displayName,
          email: userAuth.email,
          avatar: userAuth.photoURL
        })
        .then(response => {
            // console.log(response.data) 
            setUser(response.data)
        })
      } else {
        setUser(userAuth)
      }
    })

    return () => unsubscribeFromAuth();
  }, [])

  return (
    <div className="app">
      {
        !user
        ?
        (
          <Login/>
        )
        :
        (
        <UserContext.Provider value={user}>
          <div className="app__body">
            <Sidebar parentCallBackTwo={parentCallBackTwo} pushFromChat={pushFromChat} />
            <Switch>
              <Route exact path="/" render={() => <Land/>}/>
              <Route path="/chat/:chatId" render={(props) => <Chat {...props} forRoute={forRoute} parentCallBack={callbackFunction}/>} />
            </Switch>
          </div>
        </UserContext.Provider>
        )
      }
    </div>
  );
}

export default App;
