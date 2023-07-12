import { toast } from "react-hot-toast";

const labelDisplay = (e) => {
  const label = e.target.previousElementSibling;
  if (e.target.value !== "") {
    label.classList.add("active");
  } else {
    label.classList.remove("active");
  }
}

const dateFormater = (date) => {
  // from Wed Jun 21 2023 02:00:00 GMT+0200 (heure d’été d’Europe centrale) to 21/06/2023
  const dateFormated = new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).split('/').reverse().join('/');
  return dateFormated;
}

const filesSizeCheck = (
  fileToCheck, 
  setDisplayedError = false, 
  maxSize = 10000000,
  setSending = false,
  message = `La taille totale des fichiers ne doit pas dépasser ${maxSize / 1000000}mo`
) => {
  let filesSize = 0;
  for (let i = 0; i < fileToCheck.length; i++) {
    filesSize += fileToCheck[i].size;
  }

  if (filesSize > maxSize) {
    if(setDisplayedError !== false) setDisplayedError(message);
    toast.error(message, {
      duration: 5000,
    });
    if(setSending) setSending(false);
    return false;
  }else{
    return true;
  }
}

const reactSelectCustomStyles = () => {
  if(window.innerWidth > 768) return {
    control: (provided, state) => ({
      ...provided,
      fontWeight: 400,
      marginTop: '15px',
      borderRadius: '10px',
      background: '#22253A',
      border: 'none',
      padding: '5px 10px',
      display: 'flex',
      color: '#ffffff',
      width: '100%',
      fontSize: '14px',
      transition: 'background 0.3s',
      outline: state.isFocused ? 'none' : null,
      borderColor: state.isFocused ? '#22253A' : null,
      boxShadow: 'none',
      zIndex: state.isFocused ? '1' : null,
      cursor: 'pointer',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#22253A' : null,
      color: state.isSelected ? '#ffffff' : null,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: '#3b4064',
        color: '#ffffff',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#22253A',
      padding: '5px 0px',
      color: '#ffffff',
      borderRadius: '10px',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff',
      cursor: 'pointer',
    }),
    input: (provided) => ({
      ...provided,
      color: '#ffffff',
      cursor: 'pointer',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ffffffbe',
      cursor: 'pointer',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background 0.3s',
      ':hover': {
        backgroundColor: '#232536',
        color: '#ffffff',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background 0.3s',
      ':hover': {
        backgroundColor: '#232536',
        color: '#ffffff',
      },
    }),
    // Add styles for multi-select if needed
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#3B3E5B',
      color: '#ffffff',
      borderRadius: '10px',
      padding: '0px 10px',
      margin: '0 5px',
      cursor: 'pointer',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#ffffff',
      cursor: 'pointer',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'background 0.3s',
      ':hover': {
        backgroundColor: '#232536',
        color: '#ffffff',
      },
    })
    // Add styles for other components like dropdown indicator, etc. if needed
  };

  if(window.innerWidth < 768){
    return {
      control: (provided, state) => ({
        ...provided,
        fontWeight: 400,
        marginTop: '15px',
        borderRadius: '10px',
        background: '#22253A',
        border: 'none',
        padding: '5px 10px',
        display: 'flex',
        color: '#ffffff',
        width: '100%',
        fontSize: '12px',
        transition: 'background 0.3s',
        outline: state.isFocused ? 'none' : null,
        borderColor: state.isFocused ? '#22253A' : null,
        boxShadow: 'none',
        zIndex: state.isFocused ? '1' : null,
        cursor: 'pointer',
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#22253A' : null,
        color: state.isSelected ? '#ffffff' : null,
        cursor: 'pointer',
        fontSize: '12px',
        ':hover': {
          backgroundColor: '#3b4064',
          color: '#ffffff',
        },
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#22253A',
        padding: '5px 0px',
        color: '#ffffff',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '12px',
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
      }),
      input: (provided) => ({
        ...provided,
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#ffffffbe',
        cursor: 'pointer',
        fontSize: '12px',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background 0.3s',
        ':hover': {
          backgroundColor: '#232536',
          color: '#ffffff',
        },
      }),
      clearIndicator: (provided) => ({
        ...provided,
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background 0.3s',
        ':hover': {
          backgroundColor: '#232536',
          color: '#ffffff',
        },
      }),
      // Add styles for multi-select if needed
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#3B3E5B',
        color: '#ffffff',
        borderRadius: '10px',
        padding: '0px 10px',
        margin: '0 5px',
        fontSize: '12px',
        cursor: 'pointer',
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: '#ffffff',
        fontSize: '12px',
        cursor: 'pointer',
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background 0.3s',
        ':hover': {
          backgroundColor: '#232536',
          color: '#ffffff',
        },
      })
      // Add styles for other components like dropdown indicator, etc. if needed
    };
  }
};

const FunctionsService = {
  labelDisplay,
  dateFormater,
  filesSizeCheck,
  reactSelectCustomStyles
}

export default FunctionsService