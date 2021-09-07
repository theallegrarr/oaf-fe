import { Route, Switch } from 'react-router-dom';
import Login from "./pages/Auth"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
