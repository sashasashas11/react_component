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
        var types = this.prepareTypesData(data[2], data[1]);
        return { vehicles: data[0], models: data[1], types: this.addEntityTypes(types) }
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

    prepareTypesData(types, models) {
      types.forEach(t => {
        t.models = models.filter(m => {
          return m.vehicleType.id == t.id
        })
      });
      return types
    }

    addEntityTypes(vehicleTypes) {
      vehicleTypes.forEach(t=>{
        t.type = 'vehicleTypeId';
        t.models.forEach(m=>{
          m.type = 'vehicleModelId';
          m.vehicles.forEach(v=>{ v.type = 'vehicleId' })
        })
      });
      return vehicleTypes
    }
}