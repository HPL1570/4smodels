import * as yup from 'yup';

class Questioner {
  constructor(
    QsetID,
    Name,
    Comments,
    AiRole,
    UploadedBy,
    NumberOfQuestions,
    UploadDate,
    LLM,
    Accuracy,
    Tokens,
    Cost,
    Latency,
    RunBy,
    RunDateTime
  ) {
    // Questioner Master Table fields
    this._QsetID = QsetID;
    this._Name = Name;
    this._Comments = Comments;
    this._AiRole = AiRole;
    this._UploadedBy = UploadedBy;
    this._NumberOfQuestions = NumberOfQuestions;
    this._UploadDate = UploadDate;
    // Questioner LLM Performance Table fields
    this._LLM = LLM;
    this._Accuracy = Accuracy;
    this._Tokens = Tokens;
    this._Cost = Cost;
    this._Latency = Latency;
    this._RunBy = RunBy;
    this._RunDateTime = RunDateTime;
  }

  // Getters and Setters
  get QsetID() { return this._QsetID; }
  set QsetID(value) { this._QsetID = value; }

  get Name() { return this._Name; }
  set Name(value) { this._Name = value; }

  get Comments() { return this._Comments; }
  set Comments(value) { this._Comments = value; }

  get AiRole() { return this._AiRole; }
  set AiRole(value) { this._AiRole = value; }

  get UploadedBy() { return this._UploadedBy; }
  set UploadedBy(value) { this._UploadedBy = value; }

  get NumberOfQuestions() { return this._NumberOfQuestions; }
  set NumberOfQuestions(value) { this._NumberOfQuestions = value; }

  get UploadDate() { return this._UploadDate; }
  set UploadDate(value) { this._UploadDate = value; }

  get LLM() { return this._LLM; }
  set LLM(value) { this._LLM = value; }

  get Accuracy() { return this._Accuracy; }
  set Accuracy(value) { this._Accuracy = value; }

  get Tokens() { return this._Tokens; }
  set Tokens(value) { this._Tokens = value; }

  get Cost() { return this._Cost; }
  set Cost(value) { this._Cost = value; }

  get Latency() { return this._Latency; }
  set Latency(value) { this._Latency = value; }

  get RunBy() { return this._RunBy; }
  set RunBy(value) { this._RunBy = value; }

  get RunDateTime() { return this._RunDateTime; }
  set RunDateTime(value) { this._RunDateTime = value; }

  // Static schema for validation
  static QuestionerSchema = yup.object().shape({
    QsetID: yup.number().integer(),
    Name: yup.string().max(255),
    Comments: yup.string().nullable(),
    AiRole: yup.string().nullable(),
    UploadedBy: yup.number().integer(),
    NumberOfQuestions: yup.number().integer(),
    UploadDate: yup.date(),
    LLM: yup.string(),
    Accuracy: yup.number(),
    Tokens: yup.number().integer(),
    Cost: yup.number(),
    Latency: yup.number(),
    RunBy: yup.number().integer(),
    RunDateTime: yup.date(),
  });

  // Method to validate the schema
  validateQuestionerSchema() {
    return Questioner.QuestionerSchema.validate(this.getDetails());
  }

  // Method to update details
  updateQuestioner(fields) {
    if (Questioner.QuestionerSchema.isValidSync(fields)) {
      Object.assign(this, fields);
    } else {
      throw new Error('Invalid Questioner schema');
    }
  }

  // Method to get all details
  getDetails() {
    return {
      QsetID: this._QsetID,
      Name: this._Name,
      Comments: this._Comments,
      AiRole: this._AiRole,
      UploadedBy: this._UploadedBy,
      NumberOfQuestions: this._NumberOfQuestions,
      UploadDate: this._UploadDate,
      LLM: this._LLM,
      Accuracy: this._Accuracy,
      Tokens: this._Tokens,
      Cost: this._Cost,
      Latency: this._Latency,
      RunBy: this._RunBy,
      RunDateTime: this._RunDateTime,
    };
  }

  // Method to set all details
  setDetails(details) {
    Object.assign(this, details);
  }
}

export default Questioner;
