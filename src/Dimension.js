// src/DimensionComponent.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dimension from './dimensionClasses';
import { useApiClient } from './useApiClient'; // Assume useApiClient is a custom hook for axios requests

const DimensionComponent = ({ dimension, userDetails }) => {
  const { axiosRequest } = useApiClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dimensionName: dimension?.dimensionName || '',
    listOfValues: dimension?.listOfValues || '',
    masterDataComponent: dimension?.masterDataComponent || '',
    createBy: dimension?.createBy || userDetails?.UserID,
    updateBy: dimension?.updateBy || userDetails?.UserID,
    createDateTime: dimension?.createDateTime || new Date(),
    updateDateTime: dimension?.updateDateTime || new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Dimension.DimensionSchema.validate(formData);

      const newDimension = await Dimension.create(formData);

      console.log('Dimension:', newDimension.getFields());

      await axiosRequest.post('/api/dimensions', newDimension.getFields()); // Example API endpoint
      navigate('/dimensions');
    } catch (error) {
      console.error('Error:', error.errors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="dimensionName"
        value={formData.dimensionName}
        onChange={handleChange}
        placeholder="Dimension Name"
        required
      />
      <textarea
        name="listOfValues"
        value={formData.listOfValues}
        onChange={handleChange}
        placeholder="List of Values (comma-separated)"
        required
      />
      <input
        type="text"
        name="masterDataComponent"
        value={formData.masterDataComponent}
        onChange={handleChange}
        placeholder="Master Data Component"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  dimension: state.dimension, // Map state.dimension to dimension prop
  userDetails: state.auth.userDetails, // Assuming userDetails is part of auth slice
});

export default connect(mapStateToProps)(DimensionComponent); // Connect DimensionComponent to Redux
