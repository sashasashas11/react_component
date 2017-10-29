import React, {Component} from 'react';
import './vehicle.css';
import Modal from 'react-modal';
import VehiclesService from './vehicles_service'
import DataFilter from './data_filter'
import SearchFilter from './search_filter'
import VehiclePresenter from './vehicle_presenter'

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

  search(event) {
    var types = this.applyFilters(this.filters);
    if (!event.target.value.length) {
      return this.setState({typesList: types});
    }
    var ids = new SearchFilter(types, event.target.value).getIds();
    var data = this.applyFilters(ids);
    this.setState({typesList: data});
  }

  render() {
    return (
        <div className="VehicleComponent">
          <button onClick={this.openModal}>Show popup</button>

          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <button onClick={this.closeModal}>close</button>
            <input type="text" onChange={this.search.bind(this)}/>
            <VehiclePresenter vehicleTypes={this.state.typesList}/>
          </Modal>
        </div>
    );
  }
}

export default VehicleComponent;