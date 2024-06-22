// src/TaskComponent.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Task from './taskClasses'; // Import the Task class
import { useApiClient } from './useApiClient'; // Assume useApiClient is a custom hook for axios requests

const TaskComponent = ({ taskId }) => {
  const { axiosRequest } = useApiClient();
  const { userDetails } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TaskName: '',
    TaskTypeID: '',
    TaskDescription: '',
    TaskInput: '',
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
      await Task.TaskSchema.validate(formData);
      taskSteps.forEach(step => {
        Task.TaskStepSchema.validateSync(step);
      });

      const task = new Task(
        formData.TaskName,
        formData.TaskTypeID,
        formData.TaskDescription,
        formData.TaskInput,
        userDetails?.UserID
      );

      task.setTaskSteps(taskSteps);

      console.log('Task:', task.getTaskFields());
      console.log('Task Steps:', task.getTaskSteps());

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

export default TaskComponent;
