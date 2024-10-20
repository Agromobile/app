import { useState } from 'react';

export default function useActiveInput() {
  const [active, setActive] = useState(false);

  const handleToggleActiveLabel = (evt) => {
    if (evt.target.value === '') {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  return { active, handleToggleActiveLabel };
}
