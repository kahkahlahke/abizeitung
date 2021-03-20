import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import './App.css';
import AllStudents from './components/AllStudents';
import SchuelerDetail from './components/SchuelerDetail';
import Upload from './components/Upload';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter >
      <div className="App" >
        <NavBar />
        <Switch>
          <Route exact path="/">
            <AllStudents />
          </Route>
          <Route exact path="/register">
            <Upload />
          </Route>
          <Route exact path="/login">
            <App />
          </Route>
          <Route exact path="/umfragen">
            <App />
          </Route>
          <Route path="/schueler/:schuelerId" component={SchuelerDetail} />

        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
