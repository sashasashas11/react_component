export default class VehiclesService {
    constructor() {
        this.vehicleTypesUrl = "https://api.myjson.com/bins/7y3fr";
        this.vehicleModelsUrl = "https://api.myjson.com/bins/8jj1j";
        this.vehiclesUrl = "https://api.myjson.com/bins/ga5wn";
    }

    getAllData() {
      var vehicles = this.getAllVehicle();
      var models = this.getModels();
      var types = this.getTypes();
      return Promise.all([vehicles, models, types]).then(data => {
        return { vehicles: data[0], models: data[1], types: data[2] }
      });
    }

    getAllVehicle() {
        return fetch(this.vehiclesUrl).then(res=>res.json())
    }

    getModels() {
        return fetch(this.vehicleModelsUrl).then(res=>res.json())
    }

    getTypes() {
        return fetch(this.vehicleTypesUrl).then(res=>res.json())
    }
}