import React, { useState } from 'react'
import '../../style.css'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { database } from 'firebaseConfig'

const SignUpAndSignIn: React.FC = () => {
  const [login, setLogin] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: any, type: any) => {
    e.preventDefault()
    // console.log(e.target.email.value)
    const email = e.target.email.value
    const password = e.target.password.value

    if (type == 'signup') {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'Auth Data')
          navigate('/search')
        })
        .catch((error) => {
          alert(error.code)
          setLogin(true)
        })
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'Auth Data')
          navigate('/search')
        })
        .catch((error) => {
          alert(error.code)
        })
    }
  }

  return (
    <div className="App">
      <div
        className={login == false ? 'activeColor' : 'pointer'}
        onClick={() => setLogin(false)}
      >
        SignUp
      </div>
      <div
        className={login == true ? 'activeColor' : 'pointer'}
        onClick={() => setLogin(true)}
      >
        SignIn
      </div>
      <h2>{login ? 'Sign In' : 'Sign Up'}</h2>
      <form onSubmit={(e) => handleSubmit(e, login ? 'signin' : 'signup')}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="password" placeholder="Password" />
        <br />
        <br />
        <button>{login ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default SignUpAndSignIn
