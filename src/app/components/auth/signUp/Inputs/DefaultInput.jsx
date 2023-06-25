import FunctionsService from '../../../../../setup/services/functions.service';

const DefaultInput = ({
  name,
  handleChange,
  credentials,
  placeholder,
  type,
  textarea = false
}) => {
  const lowerCaseName = name.toLowerCase();
  return (
    <div className="formGroup">
        <label htmlFor={lowerCaseName}>{placeholder ? placeholder : name}</label>
        {textarea ? (
          <textarea
            name={lowerCaseName}
            placeholder={placeholder ? placeholder : name}
            defaultValue={credentials}
            required
            onChange={(e) => {
              handleChange(e)
              FunctionsService.labelDisplay(e)
            }}
          />
        ) : (
          <input
            type={type ? type : "text"}
            name={lowerCaseName}
            placeholder={placeholder ? placeholder : name}
            defaultValue={credentials}
            required
            onChange={(e) => {
              handleChange(e)
              FunctionsService.labelDisplay(e)
            }}
          />
        )}
      </div>
  );
};

export default DefaultInput;