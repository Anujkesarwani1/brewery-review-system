import React, { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { database } from 'firebaseConfig'
import { Button, Stack, TextField, Typography } from '@mui/material'

const SignUpAndSignIn: React.FC = () => {
  const [login, setLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: any, type: any) => {
    e.preventDefault()
    console.log(email, password)

    if (type === 'signup') {
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
    <Stack
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
    >
      <Stack flexDirection="row" gap={2} width="30rem">
        <Button
          disabled={login === false}
          onClick={() => setLogin(false)}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          variant="outlined"
          size="large"
          fullWidth
        >
          Sign Up
        </Button>
        <Button
          disabled={login === true}
          onClick={() => setLogin(true)}
          sx={{ textTransform: 'none', fontWeight: 'bold' }}
          variant="outlined"
          size="large"
          fullWidth
        >
          Sign In
        </Button>
      </Stack>

      <Stack flexDirection="column" alignItems="center">
        <Typography variant="h3" marginTop={3}>
          {login ? 'Sign In' : 'Sign Up'}
        </Typography>
        <TextField
          sx={{ marginTop: '2rem', width: '30rem' }}
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          sx={{ marginTop: '2rem', width: '30rem' }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={(e) => handleSubmit(e, login ? 'signin' : 'signup')}
          sx={{ textTransform: 'none', marginTop: '2rem', fontWeight: 'bold' }}
          size="large"
          fullWidth
        >
          {login ? 'Sign In' : 'Sign Up'}
        </Button>
      </Stack>
    </Stack>
  )
}

export default SignUpAndSignIn
