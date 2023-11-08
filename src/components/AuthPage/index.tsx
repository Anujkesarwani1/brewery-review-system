import React, { useState } from 'react'

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      // Handle login logic here
    } else {
      // Handle signup logic here
    }
  }

  return (
    <div className="auth-page">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p onClick={handleToggleAuthMode} style={{ cursor: 'pointer' }}>
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </p>
    </div>
  )
}

export default AuthPage
