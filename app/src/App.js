import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App2() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to='/login'>Login</Link>
      </header>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
            Hello!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

export default App2;
