import Login from './components/authorization/login/Login'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Login} />
      </Router>
    </div>
  );
}

export default App;
