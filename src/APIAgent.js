import * as yup from 'yup';

class APIAgent {
  constructor(
    ObjectName,
    ObjectType,
    IsInternal = true,
    SynonymList = null,
    InputDataJson = null,
    OutputListJson = null,
    FinalOutputJson = null,
    TestData = null,
    TestDataSet = null,
    CreatedBy,
    UpdatedBy = null
  ) {
    this._ObjectName = ObjectName;
    this._ObjectType = ObjectType;
    this._IsInternal = IsInternal;
    this._SynonymList = SynonymList;
    this._InputDataJson = InputDataJson;
    this._OutputListJson = OutputListJson;
    this._FinalOutputJson = FinalOutputJson;
    this._TestData = TestData;
    this._TestDataSet = TestDataSet;
    this._CreatedBy = CreatedBy;
    this._UpdatedBy = UpdatedBy;
    this._CreateDateTime = null; // Initialize in setCreateDetails
    this._UpdatedDateTime = null; // Initialize in setUpdateDetails
    this._LastTestedDateTime = null;
    this._LastTestRunDateTime = null;
  }

  // Getters and Setters...

  // Static schema for APIAgent validation using yup
  static APIAgentSchema = yup.object().shape({
    ObjectName: yup.string().required('Object Name is required'),
    ObjectType: yup.string().oneOf(['Function', 'API', 'Prompt']).required('Object Type is required'),
    IsInternal: yup.boolean().default(true),
    SynonymList: yup.string(),
    InputDataJson: yup.string(),
    OutputListJson: yup.string(),
    FinalOutputJson: yup.string(),
    TestData: yup.string(),
    TestDataSet: yup.string(),
    CreatedBy: yup.number().required('Created By is required'),
    UpdatedBy: yup.number(),
    CreateDateTime: yup.date().required('Create Date Time is required'),
    UpdatedDateTime: yup.date(),
    LastTestedDateTime: yup.date(),
    LastTestRunDateTime: yup.date(),
  });

  // Method to validate the entire APIAgent schema
  validateAPIAgentSchema() {
    return APIAgent.APIAgentSchema.validate(this.getDetails());
  }

  // Method to set details during creation
  setCreateDetails(details) {
    const { ObjectName, ObjectType, IsInternal, SynonymList, InputDataJson, OutputListJson, FinalOutputJson, TestData, TestDataSet, CreatedBy } = details;
    
    if (!APIAgent.APIAgentSchema.isValidSync(details)) {
      throw new Error('Invalid APIAgent schema for creation');
    }

    this._ObjectName = ObjectName;
    this._ObjectType = ObjectType;
    this._IsInternal = IsInternal ?? true;
    this._SynonymList = SynonymList ?? null;
    this._InputDataJson = InputDataJson ?? null;
    this._OutputListJson = OutputListJson ?? null;
    this._FinalOutputJson = FinalOutputJson ?? null;
    this._TestData = TestData ?? null;
    this._TestDataSet = TestDataSet ?? null;
    this._CreatedBy = CreatedBy;
    this._CreateDateTime = new Date(); // Set current date and time
  }

  // Method to set details during update
  setUpdateDetails(details) {
    const { ObjectName, ObjectType, IsInternal, SynonymList, InputDataJson, OutputListJson, FinalOutputJson, TestData, TestDataSet, UpdatedBy } = details;
    
    if (!APIAgent.APIAgentSchema.isValidSync(details)) {
      throw new Error('Invalid APIAgent schema for update');
    }

    this._ObjectName = ObjectName ?? this._ObjectName;
    this._ObjectType = ObjectType ?? this._ObjectType;
    this._IsInternal = IsInternal ?? this._IsInternal;
    this._SynonymList = SynonymList ?? this._SynonymList;
    this._InputDataJson = InputDataJson ?? this._InputDataJson;
    this._OutputListJson = OutputListJson ?? this._OutputListJson;
    this._FinalOutputJson = FinalOutputJson ?? this._FinalOutputJson;
    this._TestData = TestData ?? this._TestData;
    this._TestDataSet = TestDataSet ?? this._TestDataSet;
    this._UpdatedBy = UpdatedBy;
    this._UpdatedDateTime = new Date(); // Set current date and time
  }

  // Method to get all details of the APIAgent instance
  getDetails() {
    return {
      ObjectName: this._ObjectName,
      ObjectType: this._ObjectType,
      IsInternal: this._IsInternal,
      SynonymList: this._SynonymList,
      InputDataJson: this._InputDataJson,
      OutputListJson: this._OutputListJson,
      FinalOutputJson: this._FinalOutputJson,
      TestData: this._TestData,
      TestDataSet: this._TestDataSet,
      CreatedBy: this._CreatedBy,
      UpdatedBy: this._UpdatedBy,
      CreateDateTime: this._CreateDateTime,
      UpdatedDateTime: this._UpdatedDateTime,
      LastTestedDateTime: this._LastTestedDateTime,
      LastTestRunDateTime: this._LastTestRunDateTime,
    };
  }
}

export default APIAgent;
