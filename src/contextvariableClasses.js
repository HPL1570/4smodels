import * as yup from 'yup';

class ContextVariable {
  constructor(contextVariableName, dataType, defaultDimensionalityID, dimensionHierarchy, createBy, updateBy, createDateTime, updateDateTime) {
    this.contextVariableName = contextVariableName;
    this.dataType = dataType;
    this.defaultDimensionalityID = defaultDimensionalityID;
    this.dimensionHierarchy = dimensionHierarchy;
    this.createBy = createBy;
    this.updateBy = updateBy;
    this.createDateTime = createDateTime;
    this.updateDateTime = updateDateTime;
  }

  static ContextVariableSchema = yup.object().shape({
    contextVariableName: yup.string(),
    dataType: yup.string(),
    defaultDimensionalityID: yup.number(),
    dimensionHierarchy: yup.string(),
    createBy: yup.number(),
    updateBy: yup.number(),
    createDateTime: yup.date().default(() => new Date()),
    updateDateTime: yup.date(),
  });

  // Methods for accessing and updating fields
  getFields() {
    return {
      contextVariableName: this.contextVariableName,
      dataType: this.dataType,
      defaultDimensionalityID: this.defaultDimensionalityID,
      dimensionHierarchy: this.dimensionHierarchy,
      createBy: this.createBy,
      updateBy: this.updateBy,
      createDateTime: this.createDateTime,
      updateDateTime: this.updateDateTime,
    };
  }

  setFields(fields) {
    if (fields.contextVariableName) this.contextVariableName = fields.contextVariableName;
    if (fields.dataType) this.dataType = fields.dataType;
    if (fields.defaultDimensionalityID) this.defaultDimensionalityID = fields.defaultDimensionalityID;
    if (fields.dimensionHierarchy) this.dimensionHierarchy = fields.dimensionHierarchy;
    if (fields.createBy) this.createBy = fields.createBy;
    if (fields.updateBy) this.updateBy = fields.updateBy;
    if (fields.createDateTime) this.createDateTime = fields.createDateTime;
    if (fields.updateDateTime) this.updateDateTime = fields.updateDateTime;
  }

  validate() {
    return ContextVariable.ContextVariableSchema.validate(this, { abortEarly: false });
  }

  update(fields) {
    this.setFields(fields);
    return this.validate();
  }

  // Static method to create a new instance
  static create(fields) {
    const contextVariable = new ContextVariable(
      fields.contextVariableName,
      fields.dataType,
      fields.defaultDimensionalityID,
      fields.dimensionHierarchy,
      fields.createBy,
      fields.updateBy,
      fields.createDateTime || new Date(),
      fields.updateDateTime || null
    );
    return contextVariable.validate().then(() => contextVariable);
  }
}

export default ContextVariable;
