import React, {Component} from 'react';

export default class VehiclePresenter extends Component {
  constructor(props) {
    super();
    this.vehicleTypes = props.vehicleTypes;
    this.state = {
      result: this.present()
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vehicleTypes !== this.vehicleTypes) {
      this.vehicleTypes = nextProps.vehicleTypes;
      this.setState({result: this.present()})
    }
  }

  present() {
    return this.vehicleTypes.map(vehicleType => {
      return <li key={vehicleType.id}>
        {vehicleType.name}
        <ul> {this.presentModels(vehicleType)} </ul>
      </li>;
    });
  }

  presentModels(vehicleType) {
    return vehicleType.models.map(model => {
      return <li key={model.id}>
        {model.name}
        <ul> {this.presentVehicle(model)} </ul>
      </li>
    })
  }

  presentVehicle(model) {
    return model.vehicles.map(vehicle => {
      return <li key={vehicle.id}> {vehicle.name} </li>
    })
  }

  render() {
    return (
      <ul>{ this.state.result }</ul>
    )
  }


}