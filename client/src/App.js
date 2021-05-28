import Login from './components/authorization/login/Login'
import Register from './components/authorization/register/Register'
import Dashboard from './components/dashboard/dashboard'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/authorization/privateRoute/PrivateRoute'
import UserProvider from './components/authorization/UserProvider'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Switch>
            <PrivateRoute path="/dashboard" comp={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
