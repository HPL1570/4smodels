import * as yup from 'yup';

class Task {
  constructor(TaskName, TaskTypeID, TaskDescription, TaskInput, CreatedBy) {
    this.TaskName = TaskName;
    this.TaskTypeID = TaskTypeID;
    this.TaskDescription = TaskDescription;
    this.TaskInput = TaskInput;
    this.CreatedBy = CreatedBy;
    this.TaskSteps = [];
  }

  static TaskSchema = yup.object().shape({
    TaskName: yup.string().required('Task Name is required'),
    TaskTypeID: yup.string().required('Task Type is required'),
    TaskDescription: yup.string().required('Description is required'),
    TaskInput: yup
      .string()
      .required('Task Input is required')
      .test('is-json', 'Task Input must be a valid JSON', (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
  });

  static TaskStepSchema = yup.object().shape({
    StepSequenceNo: yup.number().required('Step Sequence Number is required'),
    StepDescription: yup.string().required('Step Description is required'),
    InputData: yup
      .string()
      .test('is-json', 'Input Data must be a valid JSON', (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      }),
    CallType: yup.string().required('Call Type is required'),
    CallObjectName: yup.string().required('Call Object Name is required'),
    Active: yup.boolean().required('Active status is required'),
  });

  addTaskStep(step) {
    if (Task.TaskStepSchema.isValidSync(step)) {
      this.TaskSteps.push(step);
    } else {
      throw new Error('Invalid step schema');
    }
  }

  getTaskStep(index) {
    return this.TaskSteps[index];
  }

  setTaskStep(index, fields) {
    if (Task.TaskStepSchema.isValidSync(fields)) {
      this.TaskSteps[index] = fields;
    } else {
      throw new Error('Invalid step schema');
    }
  }

  getTaskFields() {
    return {
      TaskName: this.TaskName,
      TaskTypeID: this.TaskTypeID,
      TaskDescription: this.TaskDescription,
      TaskInput: this.TaskInput,
      CreatedBy: this.CreatedBy,
    };
  }

  setTaskFields(fields) {
    Object.assign(this, fields);
  }

  getTaskSteps() {
    return this.TaskSteps;
  }

  setTaskSteps(steps) {
    steps.forEach((step, index) => {
      if (Task.TaskStepSchema.isValidSync(step)) {
        this.TaskSteps[index] = step;
      } else {
        throw new Error(`Invalid step schema at index ${index}`);
      }
    });
  }
}

export default Task;
