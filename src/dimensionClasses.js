import * as yup from 'yup';

class Dimension {
  constructor(dimensionName, listOfValues, masterDataComponent, createBy, updateBy, createDateTime, updateDateTime) {
    this.dimensionName = dimensionName;
    this.listOfValues = listOfValues;
    this.masterDataComponent = masterDataComponent;
    this.createBy = createBy;
    this.updateBy = updateBy;
    this.createDateTime = createDateTime;
    this.updateDateTime = updateDateTime;
  }

  static DimensionSchema = yup.object().shape({
    dimensionName: yup.string(),
    listOfValues: yup.string(),
    masterDataComponent: yup.string(),
    createBy: yup.number(),
    updateBy: yup.number(),
    createDateTime: yup.date().default(() => new Date()),
    updateDateTime: yup.date(),
  });

  // Methods for accessing and updating fields
  getFields() {
    return {
      dimensionName: this.dimensionName,
      listOfValues: this.listOfValues,
      masterDataComponent: this.masterDataComponent,
      createBy: this.createBy,
      updateBy: this.updateBy,
      createDateTime: this.createDateTime,
      updateDateTime: this.updateDateTime,
    };
  }

  setFields(fields) {
    if (fields.dimensionName) this.dimensionName = fields.dimensionName;
    if (fields.listOfValues) this.listOfValues = fields.listOfValues;
    if (fields.masterDataComponent) this.masterDataComponent = fields.masterDataComponent;
    if (fields.createBy) this.createBy = fields.createBy;
    if (fields.updateBy) this.updateBy = fields.updateBy;
    if (fields.createDateTime) this.createDateTime = fields.createDateTime;
    if (fields.updateDateTime) this.updateDateTime = fields.updateDateTime;
  }

  validate() {
    return Dimension.DimensionSchema.validate(this, { abortEarly: false });
  }

  update(fields) {
    this.setFields(fields);
    return this.validate();
  }

  // Static method to create a new instance
  static create(fields) {
    const dimension = new Dimension(
      fields.dimensionName,
      fields.listOfValues,
      fields.masterDataComponent,
      fields.createBy,
      fields.updateBy,
      fields.createDateTime || new Date(),
      fields.updateDateTime || null
    );
    return dimension.validate().then(() => dimension);
  }
}

export default Dimension;
