import Proptypes from 'prop-types';
import { useActiveInput } from '../../utils';

// EmailInput: Utility component for handling email input along with suggestions
export default function EmailInput({ labelText = 'Label', value, setter }) {
  const { active, handleToggleActiveLabel } = useActiveInput();
  return (
    <div className={`input ${active ? 'active' : ''}`}>
      <input
        type="email"
        id="email"
        className="stretch"
        value={value}
        onChange={(evt) => {
          setter(evt.target.value);
          handleToggleActiveLabel(evt);
        }}
      />
      <label htmlFor="email">{labelText}</label>
    </div>
  );
}

EmailInput.propTypes = {
  labelText: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  setter: Proptypes.func.isRequired,
};
