import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Proptypes from 'prop-types';
import { useActiveInput } from '../../utils';

// PasswordInput: Utility component for handling password input
export default function PasswordInput({ labelText = 'Label', value, setter }) {
  const [isVisible, setIsVisible] = useState(false);
  const { active, handleToggleActiveLabel } = useActiveInput();

  const handleToggleVisibility = (evt) => {
    evt.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type={`${isVisible ? 'text' : 'password'}`}
        id="password"
        value={value}
        onChange={(evt) => {
          setter(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
      />
      <label htmlFor="password">{labelText}</label>

      {isVisible ? (
        <AiOutlineEyeInvisible
          className="toggle-visibility"
          onClick={handleToggleVisibility}
        />
      ) : (
        <AiOutlineEye
          className="toggle-visibility"
          onClick={handleToggleVisibility}
        />
      )}
    </div>
  );
}

PasswordInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};
