import Proptypes from 'prop-types';
import { useActiveInput } from '../../utils';

// TextInput: Utility component for handling text input
export default function TextInput({ labelText = 'Label', value, setter }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type="text"
        id={`text-${labelText}`}
        className="stretch"
        value={value}
        onChange={(evt) => {
          setter(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
      />
      <label htmlFor={`text-${labelText}`}>{labelText}</label>
    </div>
  );
}

TextInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};
