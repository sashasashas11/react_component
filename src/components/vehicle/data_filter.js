export default class DataFilter {
  constructor(vehicleTypes, vehicleModels, filters) {
    this.vehicleTypes = vehicleTypes;
    this.vehicleModels = vehicleModels;
    this.filters = filters;
  }

  apply() {
    var models = this.applyModelsFilter(this.vehicleModels);
    var types = this.applyTypesFilter(this.vehicleTypes);
    models.forEach(m => {
      m.vehicles = this.applyVehicleFilter(m.vehicles)
    });
    types.forEach(t => {
      t.models = models.filter(m => {
        return m.vehicleType.id == t.id
      })
    });
    return types
  }

  applyTypesFilter(types) {
    return this.filterByIds(types, 'vehicleTypeId');
  }

  applyModelsFilter(models) {
    return this.filterByIds(models, 'vehicleModelId');
  }

  applyVehicleFilter(vehicles) {
    return this.filterByIds(vehicles, 'vehicleId');
  }

  filterByIds(data, entity) {
    if (!this.filters || !this.filters[entity]) {
      return data;
    }
    return data.filter(d => {
      return this.filters[entity].indexOf(d.id) != -1
    });
  }
}