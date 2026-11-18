
import { useState } from 'react'

export function AuthModal({ mode, onClose, onSwitch, onLoginSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('error')

  const isSignup = mode === 'signup'

  function showMessage(text, type = 'error') {
    setMessage(text)
    setMessageType(type)
  }

  function getAccounts() {
    try {
      const saved = localStorage.getItem('foodiesAccounts')
      const accounts = saved ? JSON.parse(saved) : []
      return Array.isArray(accounts) ? accounts : []
    } catch {
      return []
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail || !password) {
      showMessage('Please enter your email and password.')
      return
    }

    if (isSignup) {
      if (!name.trim()) {
        showMessage('Please enter your name.')
        return
      }

      if (password.length < 6) {
        showMessage('Password must contain at least 6 characters.')
        return
      }

      if (password !== confirmPassword) {
        showMessage('Passwords do not match.')
        return
      }

      const accounts = getAccounts()

      const existingAccount = accounts.find(
        account => account.email?.toLowerCase() === cleanEmail
      )

      if (existingAccount) {
        showMessage('Email already registered. Please log in.')
        return
      }

      const newAccount = {
        name: name.trim(),
        email: cleanEmail,
        password,
      }

      try {
        localStorage.setItem(
          'foodiesAccounts',
          JSON.stringify([...accounts, newAccount])
        )
      } catch {
        showMessage('Unable to save account in this browser.')
        return
      }

      showMessage('Account created! Please log in.', 'success')
      return
    }

    const accounts = getAccounts()

    const account = accounts.find(
      item =>
        item.email?.toLowerCase() === cleanEmail &&
        item.password === password
    )

    if (!account) {
      showMessage(
        'Invalid email or password. Please check your details or sign up first.'
      )
      return
    }

    const user = {
      name: account.name,
      email: account.email,
    }

    try {
      localStorage.setItem(
        'foodiesCurrentUser',
        JSON.stringify(user)
      )
    } catch {
      showMessage('Unable to save login in this browser.')
      return
    }

    showMessage(`Welcome back, ${account.name}!`, 'success')

    if (onLoginSuccess) {
      onLoginSuccess(user)
    }
  }

  function switchMode() {
    setMessage('')
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    onSwitch(isSignup ? 'login' : 'signup')
  }

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={event => event.stopPropagation()}
      >
        <button
          type="button"
          className="auth-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="auth-header">
          <span className="auth-logo">🍔 Foodies</span>

          <h2 id="auth-title">
            {isSignup ? 'Create Account' : 'Welcome Back!'}
          </h2>

          <p className="auth-subtitle">
            {isSignup
              ? 'Join Foodies and discover delicious food.'
              : 'Log in to continue with Foodies.'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>

          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-confirm-password">
                Confirm Password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          )}

          {message && (
            <div
              className={`auth-message ${messageType}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <button type="submit" className="auth-submit">
            {isSignup ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <div className="auth-switch">
          <span>
            {isSignup
              ? 'Already have an account?'
              : "Don't have an account?"}
          </span>

          <button type="button" onClick={switchMode}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}
