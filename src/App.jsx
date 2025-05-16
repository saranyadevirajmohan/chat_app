import { useState } from 'react'
import './App.css'
import "./bootstrap-5.0.2-dist/css/bootstrap.min.css"
import Chat from './Components/Chat'
import { auth, provider } from './config/firebase'; // Adjust path as needed
import { signInWithPopup } from 'firebase/auth';



function App() {
  const [user, setUser] = useState(null)

  const handleSignIn =()=>{

    signInWithPopup(auth,provider)
    .then(result =>setUser(result._tokenResponse))
    .catch(error=>consle.log(error))
  }

  return (

    <div className="App">
      {user ?
        <Chat user={user} />
        :
        <div className='p-5 text-center'>
          <div>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/020/945/959/small_2x/chat-app-logo-png.png"
              alt="logo"
              width={400}
              height={400}
              className='pr-2'
              style={{ bordderadius: 200 }}
            />
          </div>
          <div>
            <button
              className="btn btn-primary"
              style={{ margintop: "50px" }}
              onClick={handleSignIn}
            >Login
            </button>
          </div>
        </div>
      }
    </div>

  )

}

export default App
