export default class SearchFilter {
  constructor(vehicleTypes, keyword) {
    this.vehicleTypes = vehicleTypes;
    this.keyword = keyword;
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
    return (entity.name.search(this.keyword.trim()) != -1)
  }
}