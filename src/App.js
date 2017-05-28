import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import PinTable from './components/PinTable';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to AutoHome</h2>
                </div>
                <PinTable/>
                {/*
                 <p className="App-intro">
                 To get started, edit <code>src/App.js</code> and save to reload.
                 </p>
                 */}
            </div>
        );
    }
}

export default App;
