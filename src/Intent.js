import * as yup from 'yup';

class Intent {
  constructor(IntentName, Description, ParentIntentID, Synonyms, SyntheticDataJson, TaskID, TestDataJson, TestResultsJson, TestRunDateTime, Comments) {
    this._IntentName = IntentName;
    this._Description = Description;
    this._ParentIntentID = ParentIntentID;
    this._Synonyms = Synonyms;
    this._SyntheticDataJson = SyntheticDataJson;
    this._TaskID = TaskID;
    this._TestDataJson = TestDataJson;
    this._TestResultsJson = TestResultsJson;
    this._TestRunDateTime = TestRunDateTime;
    this._Comments = Comments;
    this._CreatedAt = new Date();
    this._UpdatedAt = new Date();
    this._IntentTests = []; // Initialize as an empty array for IntentTest instances
  }

  // Getters
  get IntentName() {
    return this._IntentName;
  }

  get Description() {
    return this._Description;
  }

  get ParentIntentID() {
    return this._ParentIntentID;
  }

  get Synonyms() {
    return this._Synonyms;
  }

  get SyntheticDataJson() {
    return this._SyntheticDataJson;
  }

  get TaskID() {
    return this._TaskID;
  }

  get TestDataJson() {
    return this._TestDataJson;
  }

  get TestResultsJson() {
    return this._TestResultsJson;
  }

  get TestRunDateTime() {
    return this._TestRunDateTime;
  }

  get Comments() {
    return this._Comments;
  }

  get CreatedAt() {
    return this._CreatedAt;
  }

  get UpdatedAt() {
    return this._UpdatedAt;
  }

  // Setters
  set IntentName(value) {
    this._IntentName = value;
  }

  set Description(value) {
    this._Description = value;
  }

  set ParentIntentID(value) {
    this._ParentIntentID = value;
  }

  set Synonyms(value) {
    this._Synonyms = value;
  }

  set SyntheticDataJson(value) {
    this._SyntheticDataJson = value;
  }

  set TaskID(value) {
    this._TaskID = value;
  }

  set TestDataJson(value) {
    this._TestDataJson = value;
  }

  set TestResultsJson(value) {
    this._TestResultsJson = value;
  }

  set TestRunDateTime(value) {
    this._TestRunDateTime = value;
  }

  set Comments(value) {
    this._Comments = value;
  }

  // Methods for Intent Tests
  addIntentTest(intentTest) {
    if (Intent.IntentTestSchema.isValidSync(intentTest)) {
      this._IntentTests.push(intentTest);
    } else {
      throw new Error('Invalid Intent Test schema');
    }
  }

  getIntentTest(index) {
    return this._IntentTests[index];
  }

  setIntentTest(index, fields) {
    if (Intent.IntentTestSchema.isValidSync(fields)) {
      this._IntentTests[index] = fields;
    } else {
      throw new Error('Invalid Intent Test schema');
    }
  }

  getIntentTests() {
    return this._IntentTests;
  }

  setIntentTests(intentTests) {
    intentTests.forEach((intentTest, index) => {
      if (Intent.IntentTestSchema.isValidSync(intentTest)) {
        this._IntentTests[index] = intentTest;
      } else {
        throw new Error(`Invalid Intent Test schema at index ${index}`);
      }
    });
  }

  // Static schema for Intent validation
  static IntentSchema = yup.object().shape({
    IntentName: yup.string(),
    Description: yup.string(),
    ParentIntentID: yup.number().nullable(),
    Synonyms: yup.string(),
    SyntheticDataJson: yup.string(),
    TaskID: yup.number().nullable(),
  });

  // Static schema for Intent Test validation
  static IntentTestSchema = yup.object().shape({
    TestDataJson: yup.string(),
    TestResultsJson: yup.string(),
    TestRunDateTime: yup.date(),
    Comments: yup.string(),
  });

  // Method to validate the entire Intent schema
  validateIntentSchema() {
    return Intent.IntentSchema.validate(this.getDetails());
  }

  // Method to validate Intent Test schema
  validateIntentTestSchema() {
    return Intent.IntentTestSchema.validate(this.getIntentTests());
  }

  // Method to update Intent details
  updateIntent(fields) {
    if (Intent.IntentSchema.isValidSync(fields)) {
      Object.assign(this, fields);
      this._UpdatedAt = new Date();
    } else {
      throw new Error('Invalid intent schema');
    }
  }

  // Method to update Intent Test details
  updateIntentTest(testFields) {
    if (Intent.IntentTestSchema.isValidSync(testFields)) {
      this._TestDataJson = testFields.TestDataJson;
      this._TestResultsJson = testFields.TestResultsJson;
      this._TestRunDateTime = testFields.TestRunDateTime;
      this._Comments = testFields.Comments;
      this._UpdatedAt = new Date();
    } else {
      throw new Error('Invalid intent test schema');
    }
  }

  // Method to get all details of the Intent instance
  getDetails() {
    return {
      IntentName: this._IntentName,
      Description: this._Description,
      ParentIntentID: this._ParentIntentID,
      Synonyms: this._Synonyms,
      SyntheticDataJson: this._SyntheticDataJson,
      TaskID: this._TaskID,
    };
  }

  // Method to get all details including Intent Tests
  getIntentDetails() {
    return {
      TestDataJson: this._TestDataJson,
      TestResultsJson: this._TestResultsJson,
      TestRunDateTime: this._TestRunDateTime,
      Comments: this._Comments,
    };
  }
}

export default Intent;
