import { PatternFormat } from 'react-number-format';
import Proptypes from 'prop-types';
import { useActiveInput } from '../../utils';

// PhoneInput: Utility component for handling phone input along with autoformatting
export default function PhoneInput({ labelText = 'Label', value, setter }) {
  const { active, handleToggleActiveLabel } = useActiveInput();

  // TODO: We may need to reformat how the phone number is actually stored in state
  // Depending on the needs of the backend API.
  const handlePhoneNumberUpdate = (value) => {
    setter(value);
  };

  return (
    <div className={`input ${active ? 'active' : ''}`}>
      {/**I used PatternFormat in the code below because it gave me a
      simpler way to implement automatic formatting for the phone number
      as the user types.*/}
      <PatternFormat
        type="tel"
        id="phone"
        className="stretch"
        value={value}
        onChange={(evt) => {
          console.log(value);
          handlePhoneNumberUpdate(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
        format="+234 - #### - ### - ###"
        mask="#"
      />
      <label
        htmlFor="phone"
        className="toggle-phone-number"
        data-alt-name="Phone Number"
      >
        {labelText}
      </label>
    </div>
  );
}

PhoneInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};
