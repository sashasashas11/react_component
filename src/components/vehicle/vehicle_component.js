import React, {Component} from 'react';
import './vehicle.css';
import Modal from 'react-modal';
import VehiclesService from './vehicles_service'
import DataFilter from './data_filter'

class VehicleComponent extends Component {

  constructor(props) {
    super();

    this.state = {
      modalIsOpen: false,
      vehicles: [],
      models: [],
      types: [],
      typesList: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.filters = props.filter
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  componentDidMount() {
    new VehiclesService().getAllData().then(data => {
      this.setState({vehicles: data.vehicles});
      this.setState({models: data.models});
      this.setState({types: data.types});
      this.setState({typesList: this.applyFilters(this.filters)});
    });
  }

  applyFilters(filters) {
    var dataFilter = new DataFilter(this.state.types, this.state.models, filters);
    return dataFilter.apply();
  }


  render() {
    return (
        <div className="VehicleComponent">
          <button onClick={this.openModal}>Show popup</button>

          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <button onClick={this.closeModal}>close</button>

          </Modal>
        </div>
    );
  }
}

export default VehicleComponent;