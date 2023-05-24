import React from 'react';

const Step2 = ({ handleChange, labelDisplay}) => {
  const countries = [
    "France",
    "Afrique du Sud",
    "Albanie",
    "Algérie",
    "Allemagne",
    "Andorre",
    "Angola",
    "Anguilla",
    "Antarctique",
    "Antigua-et-Barbuda",
    "Antilles néerlandaises",
    "Arabie saoudite",
    "Argentine",
    "Arménie",
    "Aruba",
    "Australie",
    "Autriche",
    "Azerbaïdjan",
    "Bahamas",
    "Bahreïn",
    "Bangladesh",
    "Belgique",
    "Belize",
    "Bermudes",
    "Bhoutan",
    "Biélorussie",
    "Bolivie",
    "Bosnie-Herzégovine",
    "Botswana",
    "Brunéi Darussalam",
    "Brésil",
    "Bulgarie",
    "Burkina Faso",
    "Burundi",
    "Bélarus",
    "Bénin",
    "Cambodge",
    "Cameroun",
    "Canada",
    "Cap-Vert",
    "Chili",
    "Chine",
    "Chypre",
    "Colombie",
    "Comores",
    "Congo",
    "Corée du Nord",
    "Corée du Sud",
    "Costa Rica",
    "Croatie",
    "Cuba",
    "Côte d’Ivoire",
    "Danemark",
  ];

  return (
    <div className="step step2">
      <h2>Personnel</h2>

      <div className="formGroup">
        <label htmlFor="firstName">Prénom</label>
        <input 
          type="text"
          name="firstName"
          placeholder="Prénom"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

      <div className="formGroup">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        />
      </div>

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

      <div className="formGroup">
        <label htmlFor="country">Pays</label>
        <select
          name="country"
          required
          onChange={(e) => {
            handleChange(e)
            labelDisplay(e)
          }}
        >
          <option value="">Choisir un pays</option>
          {countries.map((country, index) => {
            return <option key={index} value={country}>{country}</option>
          })}
        </select>
      </div>

      <div className="formGroup">
        <label htmlFor="status">Status</label>
        <input
          type="text"
          name="status"
          placeholder="Statut"
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

export default Step2;