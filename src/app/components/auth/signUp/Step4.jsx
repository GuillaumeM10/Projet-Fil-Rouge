import React from 'react';

const Step4 = ({ handleChange }) => {
  return (
    <div className="step step4">
      <h2>Mes documents</h2>

      <div style={{ 
          display: 'flex', 
          flexDirection: 'column'
        }}>
        <label htmlFor="displayedOnFeed">Etre affiché dans le feed (oui par défaut)</label>
        <input
          type="checkbox"
          name="displayedOnFeed"
          placeholder="Je souhaite être visible sur le feed"
          defaultChecked={true}
          onChange={(e) => {
            handleChange(e)
          }}
        />
      </div>
      
    </div>
  );
};

export default Step4;