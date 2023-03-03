import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './setup/contexts/AuthContext';
import { UserProvider } from './setup/contexts/UserContext';
import { ScriptsProvider } from './setup/contexts/ScriptsContext';
import { PostProvider } from './setup/contexts/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ScriptsProvider>
    <AuthProvider>
      <UserProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </UserProvider>
    </AuthProvider>
  </ScriptsProvider>
);