import * as yup from 'yup';

class Prompt {
  constructor(
    Type,
    Name,
    IconPath,
    Tech,
    AiRole,
    SystemRole,
    Objective,
    TaskInstructions,
    TaskInput,
    TaskOutputFormat,
    TaskExample,
    LLM,
    CreatedBy,
    VariableListJson
  ) {
    this._Type = Type;
    this._Name = Name;
    this._IconPath = IconPath;
    this._Tech = Tech;
    this._AiRole = AiRole;
    this._SystemRole = SystemRole;
    this._Objective = Objective;
    this._TaskInstructions = TaskInstructions;
    this._TaskInput = TaskInput;
    this._TaskOutputFormat = TaskOutputFormat;
    this._TaskExample = TaskExample;
    this._LLM = LLM;
    this._CreatedBy = CreatedBy;
    this._VariableListJson = VariableListJson;
    this._CreatedDateTime = new Date();
    this._UpdatedDateTime = null; // Initialize as null or use a default value
  }

  // Getters and Setters omitted for brevity, see previous implementation

  // Static schema for Prompt validation using yup
  static PromptSchema = yup.object().shape({
    Type: yup.string().nullable(),
    Name: yup.string().nullable(),
    IconPath: yup.string().nullable(),
    Tech: yup.string().nullable(),
    AiRole: yup.string().nullable(),
    SystemRole: yup.string().nullable(),
    Objective: yup.string().nullable(),
    TaskInstructions: yup.string().nullable(),
    TaskInput: yup.string().nullable(),
    TaskOutputFormat: yup.string().nullable(),
    TaskExample: yup.string().nullable(),
    LLM: yup.string().nullable(),
    CreatedBy: yup.number(),
    CreatedDateTime: yup.date().default(() => new Date()),
    UpdatedDateTime: yup.date().nullable(),
    VariableListJson: yup.string().nullable(),
  });

  // Method to validate the entire Prompt schema
  validatePromptSchema() {
    return Prompt.PromptSchema.validate(this.getDetails());
  }

  // Method to update Prompt details
  updatePrompt(fields) {
    if (Prompt.PromptSchema.isValidSync(fields)) {
      Object.assign(this, fields);
      this._UpdatedDateTime = new Date();
    } else {
      throw new Error('Invalid prompt schema');
    }
  }

  // Method to set all details of the Prompt instance
  setDetails(
    Type,
    Name,
    IconPath,
    Tech,
    AiRole,
    SystemRole,
    Objective,
    TaskInstructions,
    TaskInput,
    TaskOutputFormat,
    TaskExample,
    LLM,
    CreatedBy,
    VariableListJson
  ) {
    const fields = {
      Type,
      Name,
      IconPath,
      Tech,
      AiRole,
      SystemRole,
      Objective,
      TaskInstructions,
      TaskInput,
      TaskOutputFormat,
      TaskExample,
      LLM,
      CreatedBy,
      VariableListJson,
    };

    this.updatePrompt(fields);
  }

  // Method to get all details of the Prompt instance
  getDetails() {
    return {
      Type: this._Type,
      Name: this._Name,
      IconPath: this._IconPath,
      Tech: this._Tech,
      AiRole: this._AiRole,
      SystemRole: this._SystemRole,
      Objective: this._Objective,
      TaskInstructions: this._TaskInstructions,
      TaskInput: this._TaskInput,
      TaskOutputFormat: this._TaskOutputFormat,
      TaskExample: this._TaskExample,
      LLM: this._LLM,
      CreatedBy: this._CreatedBy,
      CreatedDateTime: this._CreatedDateTime,
      UpdatedDateTime: this._UpdatedDateTime,
      VariableListJson: this._VariableListJson,
    };
  }
}

export default Prompt;
