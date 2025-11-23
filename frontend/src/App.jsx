import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:8080/hello')
      .then(response => setMessage(response.data))
      .catch(error => setMessage('Error: ' + error.message));
  }, []);  // Empty array: Runs once on mount

  return (
    <div className="App">
      <header className="App-header">
        <h1>SmartLog Frontend</h1>
        <p>Backend says: {message}</p>
      </header>
    </div>
  );
}

export default App;