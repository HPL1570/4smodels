import * as yup from 'yup';

// LLMSchema Class to handle both Question and LLMAnswer
class LLMSchema {
  constructor(
    QID,
    QsetID,
    Question,
    Answer,
    LLM,
    LLMAnswer,
    Accuracy,
    Tokens,
    Cost,
    Latency
  ) {
    // Fields from Questions Table
    this._QID = QID;
    this._QsetID = QsetID;
    this._Question = Question;
    this._Answer = Answer;

    // Fields from LLM Answers Table
    this._LLM = LLM;
    this._LLMAnswer = LLMAnswer;
    this._Accuracy = Accuracy;
    this._Tokens = Tokens;
    this._Cost = Cost;
    this._Latency = Latency;
  }

  // Getters and Setters
  get QID() { return this._QID; }
  set QID(value) { this._QID = value; }

  get QsetID() { return this._QsetID; }
  set QsetID(value) { this._QsetID = value; }

  get Question() { return this._Question; }
  set Question(value) { this._Question = value; }

  get Answer() { return this._Answer; }
  set Answer(value) { this._Answer = value; }

  get LLM() { return this._LLM; }
  set LLM(value) { this._LLM = value; }

  get LLMAnswer() { return this._LLMAnswer; }
  set LLMAnswer(value) { this._LLMAnswer = value; }

  get Accuracy() { return this._Accuracy; }
  set Accuracy(value) { this._Accuracy = value; }

  get Tokens() { return this._Tokens; }
  set Tokens(value) { this._Tokens = value; }

  get Cost() { return this._Cost; }
  set Cost(value) { this._Cost = value; }

  get Latency() { return this._Latency; }
  set Latency(value) { this._Latency = value; }

  // Static schema for validation
  static LLMSchemaValidation = yup.object().shape({
    // Fields from Questions Table
    QID: yup.number().integer().notRequired(),
    QsetID: yup.number().integer().required('QsetID is required'),
    Question: yup.string().required('Question is required'),
    Answer: yup.string().required('Answer is required'),
    
    // Fields from LLM Answers Table
    LLM: yup.string().required('LLM is required'),
    LLMAnswer: yup.string().required('LLMAnswer is required'),
    Accuracy: yup.number().required('Accuracy is required'),
    Tokens: yup.number().integer().required('Tokens are required'),
    Cost: yup.number().required('Cost is required'),
    Latency: yup.number().required('Latency is required'),
  });

  // Method to validate the schema
  validateLLMSchema() {
    return LLMSchema.LLMSchemaValidation.validate(this.getDetails());
  }

  // Method to update details
  updateLLMSchema(fields) {
    if (LLMSchema.LLMSchemaValidation.isValidSync(fields)) {
      Object.assign(this, fields);
    } else {
      throw new Error('Invalid LLM schema');
    }
  }

  // Method to get all details
  getDetails() {
    return {
      QID: this._QID,
      QsetID: this._QsetID,
      Question: this._Question,
      Answer: this._Answer,
      LLM: this._LLM,
      LLMAnswer: this._LLMAnswer,
      Accuracy: this._Accuracy,
      Tokens: this._Tokens,
      Cost: this._Cost,
      Latency: this._Latency,
    };
  }

  // Method to set all details
  setDetails(details) {
    this._QID = details.QID;
    this._QsetID = details.QsetID;
    this._Question = details.Question;
    this._Answer = details.Answer;
    this._LLM = details.LLM;
    this._LLMAnswer = details.LLMAnswer;
    this._Accuracy = details.Accuracy;
    this._Tokens = details.Tokens;
    this._Cost = details.Cost;
    this._Latency = details.Latency;
  }

  // Method to create new details
  createDetails(details) {
    if (LLMSchema.LLMSchemaValidation.isValidSync(details)) {
      this.setDetails(details);
    } else {
      throw new Error('Invalid LLM schema for creation');
    }
  }
}

export default LLMSchema;
