import * as yup from 'yup';

/**
 * Represents a Task with associated properties and methods.
 */
class Task {
  /**
   * Constructs a new Task object.
   * @param {string} TaskName - Name of the task.
   * @param {number} TaskTypeID - ID of the task type.
   * @param {string} TaskDescription - Description of the task.
   * @param {string} TaskInput - Input data for the task in JSON format.
   * @param {number} CreatedBy - ID of the user who created the task.
   */
  constructor(TaskName, TaskTypeID, TaskDescription, TaskInput, CreatedBy) {
    this.TaskName = TaskName;
    this.TaskTypeID = TaskTypeID;
    this.TaskDescription = TaskDescription;
    this.TaskInput = TaskInput;
    this.CreatedBy = CreatedBy;
    this.TaskSteps = [];
  }

  /**
   * Schema for validating Task properties using yup.
   * @static
   */
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

  /**
   * Schema for validating TaskStep properties using yup.
   * @static
   */
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

  /**
   * Adds a step to the Task.
   * @param {Object} step - Step object to be added.
   * @throws {Error} Throws an error if the step schema validation fails.
   */
  addTaskStep(step) {
    if (Task.TaskStepSchema.isValidSync(step)) {
      this.TaskSteps.push(step);
    } else {
      throw new Error('Invalid step schema');
    }
  }

  /**
   * Retrieves a specific step from the Task.
   * @param {number} index - Index of the step to retrieve.
   * @returns {Object} The step object.
   */
  getTaskStep(index) {
    return this.TaskSteps[index];
  }

  /**
   * Updates a specific step in the Task.
   * @param {number} index - Index of the step to update.
   * @param {Object} fields - Updated fields for the step.
   * @throws {Error} Throws an error if the step schema validation fails.
   */
  setTaskStep(index, fields) {
    if (Task.TaskStepSchema.isValidSync(fields)) {
      this.TaskSteps[index] = fields;
    } else {
      throw new Error('Invalid step schema');
    }
  }

  /**
   * Retrieves all steps associated with the Task.
   * @returns {Array} Array of step objects.
   */
  getTaskSteps() {
    return this.TaskSteps;
  }

  /**
   * Sets the steps for the Task.
   * @param {Array} steps - Array of step objects to set.
   * @throws {Error} Throws an error if any step schema validation fails.
   */
  setTaskSteps(steps) {
    steps.forEach((step, index) => {
      if (Task.TaskStepSchema.isValidSync(step)) {
        this.TaskSteps[index] = step;
      } else {
        throw new Error(`Invalid step schema at index ${index}`);
      }
    });
  }

  /**
   * Retrieves the fields of the Task.
   * @returns {Object} Task fields.
   */
  getTaskFields() {
    return {
      TaskName: this.TaskName,
      TaskTypeID: this.TaskTypeID,
      TaskDescription: this.TaskDescription,
      TaskInput: this.TaskInput,
      CreatedBy: this.CreatedBy,
    };
  }

  /**
   * Updates the fields of the Task.
   * @param {Object} fields - Updated fields for the Task.
   */
  setTaskFields(fields) {
    Object.assign(this, fields);
  }
}

export default Task;
