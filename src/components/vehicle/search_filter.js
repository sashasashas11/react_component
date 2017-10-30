export default class SearchFilter {
  constructor(vehicleTypes, keyword, method) {
    this.vehicleTypes = vehicleTypes;
    this.keyword = keyword;
    this.method = method;
    this.ids = {vehicleTypeId: [], vehicleModelId: [], vehicleId: []};
  }

  getIds() {
    this.vehicleTypes.forEach(t => {
      if (this.checkCondition(t)) {
        this.addTypeIds(t);
      } else {
        t.models.forEach(m => {
          if (this.checkCondition(m)) {
            this.addModelIds(m);
          } else {
            m.vehicles.forEach(v => {
              if (this.checkCondition(v)) {
                this.addVehicleIds(v);
              }
            });
          }
        })
      }
    });
    return this.ids
  }

  addModelIds(model) {
    this.ids.vehicleModelId.push(model.id);
    this.ids.vehicleTypeId.push(model.vehicleType.id);
    model.vehicles.forEach(v => {
      this.ids.vehicleId.push(v.id)
    })
  }

  addVehicleIds(vehicle) {
    this.ids.vehicleId.push(vehicle.id);
    this.ids.vehicleModelId.push(vehicle.vehicleModel.id);
    this.ids.vehicleTypeId.push(vehicle.vehicleModel.vehicleType.id);
  }

  addTypeIds(type) {
    this.ids.vehicleTypeId.push(type.id);
    type.models.forEach(m => { this.addModelIds(m); })
  }

  checkCondition(entity) {
    if (this.method == 'byIds')
      return this.checkConditionByIds(entity)

    return (entity.name.search(this.keyword.trim()) != -1)
  }

  checkConditionByIds(entity) {
    var filter = this.keyword;
    if (!filter)
      return true;

    if (!filter[entity.type] || filter[entity.type].length == 0)
      return false;

    return (filter[entity.type].indexOf(entity.id) > -1)
  }
}