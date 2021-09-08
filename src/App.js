import { Route, Switch } from 'react-router-dom';

import Login from "./pages/Auth"
import Summary from './pages/Customers';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/summary" component={Summary} />
      </Switch>
    </div>
  );
}

export default App;
