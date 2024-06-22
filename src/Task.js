// src/TaskComponent.js
import React, { useState } from 'react';
import { connect } from 'react-redux'; // Import connect
import { useNavigate } from 'react-router-dom';
import Task from './taskClasses'; // Import the Task class
import { useApiClient } from './useApiClient'; // Assume useApiClient is a custom hook for axios requests

const TaskComponent = ({ task, userDetails }) => { // Destructure task and userDetails from props
  const { axiosRequest } = useApiClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TaskName: task.TaskName || '', // Initialize form data with task data if available
    TaskTypeID: task.TaskTypeID || '',
    TaskDescription: task.TaskDescription || '',
    TaskInput: task.TaskInput || '',
  });

  const [taskSteps, setTaskSteps] = useState([
    {
      StepSequenceNo: 1,
      StepDescription: 'First step',
      InputData: '{}',
      CallType: 'Function',
      CallObjectName: 'initFunction',
      Active: true,
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const newTaskSteps = [...taskSteps];
    newTaskSteps[index][name] = value;
    setTaskSteps(newTaskSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validation and task creation logic...
      await Task.TaskSchema.validate(formData);
      taskSteps.forEach(step => {
        Task.TaskStepSchema.validateSync(step);
      });

      const newTask = new Task(
        formData.TaskName,
        formData.TaskTypeID,
        formData.TaskDescription,
        formData.TaskInput,
        userDetails?.UserID
      );

      newTask.setTaskSteps(taskSteps);

      console.log('Task:', newTask.getTaskFields());
      console.log('Task Steps:', newTask.getTaskSteps());

      const values = {
        ...formData,
        CreatedBy: userDetails?.UserID,
      };
      await axiosRequest.post('/api/tasks', values); // example API endpoint
      navigate('/tasks');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="TaskName"
        value={formData.TaskName}
        onChange={handleChange}
        placeholder="Task Name"
      />
      <input
        type="text"
        name="TaskTypeID"
        value={formData.TaskTypeID}
        onChange={handleChange}
        placeholder="Task Type ID"
      />
      <textarea
        name="TaskDescription"
        value={formData.TaskDescription}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <textarea
        name="TaskInput"
        value={formData.TaskInput}
        onChange={handleChange}
        placeholder="Task Input (JSON)"
      />

      {taskSteps.map((step, index) => (
        <div key={index}>
          <input
            type="number"
            name="StepSequenceNo"
            value={step.StepSequenceNo}
            onChange={(e) => handleStepChange(index, e)}
            placeholder="Step Sequence No"
          />
          <input
            type="text"
            name="StepDescription"
            value={step.StepDescription}
            onChange={(e) => handleStepChange(index, e)}
            placeholder="Step Description"
          />
          <textarea
            name="InputData"
            value={step.InputData}
            onChange={(e) => handleStepChange(index, e)}
            placeholder="Input Data (JSON)"
          />
          <input
            type="text"
            name="CallType"
            value={step.CallType}
            onChange={(e) => handleStepChange(index, e)}
            placeholder="Call Type"
          />
          <input
            type="text"
            name="CallObjectName"
            value={step.CallObjectName}
            onChange={(e) => handleStepChange(index, e)}
            placeholder="Call Object Name"
          />
          <input
            type="checkbox"
            name="Active"
            checked={step.Active}
            onChange={(e) => handleStepChange(index, { target: { name: 'Active', value: e.target.checked } })}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  task: state.task, // Map state.task to task prop
  userDetails: state.auth.userDetails, // Assuming userDetails is part of auth slice
});

export default connect(mapStateToProps)(TaskComponent); // Connect TaskComponent to Redux
