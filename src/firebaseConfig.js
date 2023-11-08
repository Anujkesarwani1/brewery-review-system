import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCZwnZOVQNwvtxBnwTdxzqQRB6fs5Yoy7E',
  authDomain: 'brewery-review-system-auth.firebaseapp.com',
  projectId: 'brewery-review-system-auth',
  storageBucket: 'brewery-review-system-auth.appspot.com',
  messagingSenderId: '262594403124',
  appId: '1:262594403124:web:c09c9e40fa293cc5eaa361',
  measurementId: 'G-GPPF9E5WBM',
}

const app = initializeApp(firebaseConfig)

export const database = getAuth(app)
