// src/ContextVariableComponent.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContextVariable from './contextvariableClasses';
import { useApiClient } from './useApiClient'; // Assume useApiClient is a custom hook for axios requests

const ContextVariableComponent = ({ contextVariable, userDetails }) => {
  const { axiosRequest } = useApiClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contextVariableName: contextVariable?.contextVariableName || '',
    dataType: contextVariable?.dataType || '',
    defaultDimensionalityID: contextVariable?.defaultDimensionalityID || '',
    dimensionHierarchy: contextVariable?.dimensionHierarchy || '',
    createBy: contextVariable?.createBy || userDetails?.UserID,
    updateBy: contextVariable?.updateBy || userDetails?.UserID,
    createDateTime: contextVariable?.createDateTime || new Date(),
    updateDateTime: contextVariable?.updateDateTime || new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ContextVariable.ContextVariableSchema.validate(formData);

      const newContextVariable = await ContextVariable.create(formData);

      console.log('Context Variable:', newContextVariable.getFields());

      await axiosRequest.post('/api/context-variables', newContextVariable.getFields()); // Example API endpoint
      navigate('/context-variables');
    } catch (error) {
      console.error('Error:', error.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="contextVariableName"
        value={formData.contextVariableName}
        onChange={handleChange}
        placeholder="Context Variable Name"
        required
      />
      <input
        type="text"
        name="dataType"
        value={formData.dataType}
        onChange={handleChange}
        placeholder="Data Type"
        required
      />
      <input
        type="number"
        name="defaultDimensionalityID"
        value={formData.defaultDimensionalityID}
        onChange={handleChange}
        placeholder="Default Dimensionality ID"
        required
      />
      <textarea
        name="dimensionHierarchy"
        value={formData.dimensionHierarchy}
        onChange={handleChange}
        placeholder="Dimension Hierarchy"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  contextVariable: state.contextVariable, // Map state.contextVariable to contextVariable prop
  userDetails: state.auth.userDetails, // Assuming userDetails is part of auth slice
});

export default connect(mapStateToProps)(ContextVariableComponent); // Connect ContextVariableComponent to Redux
