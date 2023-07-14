import FunctionsService from '../../../../../setup/services/functions.service';

const DefaultInput = ({
  name,
  handleChange,
  credentials,
  placeholder,
  type,
  textarea = false,
  required = true,
}) => {
  return (
    <div className={`formGroup ${name}`}>
        <label 
          htmlFor={name}
          className={credentials ? 'active' : ''}
        >
          {placeholder ? placeholder : name}
        </label>
        {textarea ? (
          <>
            <textarea
              name={name}
              placeholder={placeholder ? placeholder : name}
              defaultValue={credentials}
              required={required}
              maxLength={500}
              onChange={(e) => {
                handleChange(e)
                FunctionsService.labelDisplay(e)
              }}
              onLoad={(e) => {
                FunctionsService.labelDisplay(e)
              }}
            />
            <small className="maxLength">
              {credentials?.length ? credentials.length : 0}/500
            </small>
          </>
        ) : (
          <input
            type={type ? type : "text"}
            name={name}
            placeholder={placeholder ? placeholder : name}
            defaultValue={credentials}
            required={required}
            maxLength={500}
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