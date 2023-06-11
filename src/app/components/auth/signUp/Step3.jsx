import React from 'react';

const Step3 = ({ handleChange, labelDisplay}) => {

  return (
    <div className="step step3">
      <h2>Professionnel</h2>
      

      <div className="formGroup">
        <label htmlFor="formation">Formation</label>
        <input
          type="text"
          name="formation"
          placeholder="Formation"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>
    </div>
  );
};

export default Step3;