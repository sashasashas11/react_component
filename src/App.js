import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VehicleComponent from './components/vehicle/vehicle_component';

class App extends Component {
  constructor() {
      super();
      this.firstFilter = { vehicleTypeId: [1,2,4,5], vehicleModelId: [1,8,3], vehicleId: [1,6,3] };
  }
  render() {
    return (
      <div className="App">
          <VehicleComponent filter={this.firstFilter}/>
          <VehicleComponent />
          <VehicleComponent />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
      </div>
    );
  }
}

export default App;
