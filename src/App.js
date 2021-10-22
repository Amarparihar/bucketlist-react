


import './App.css';

import { Homepage } from './components/homepage';
import { Register } from './components/register';
import { BrowserRouter as Router,
Switch,
Route } from "react-router-dom";
import { Bucketlist } from './components/bucketlist';
import { Forgotpass } from './components/forgotpass';
import { Updatepass } from './components/updatepass';




function App() {
  
  return (
    <>
      
      <Router>
      <Switch>
        <Route path="/" component={Homepage} exact={true} />
        <Route path="/register" component={Register} exact={true} />
        <Route path="/forgot-password" component={Forgotpass} exact={true} />
        <Route path="/update-password" component={Updatepass} exact={true} />
        <Route path="/create-bucketlist/:id" component={Bucketlist} exact={true} />
        
      </Switch>
      </Router>
      
    </>
  );
}

export default App;



