import React, { useCallback, useContext } from 'react';
import cn from 'classnames';

import Context from './Context';
import { loop } from '../../utils/helpers';

const Dots = ({ className }) => {
  const { value, itemCount, onChange } = useContext(Context);

  return (
    <ul className={cn('fcarousel-dots', className)}>
      {loop(itemCount, (i) => (
        <li
          className={cn('fcarousel-dot', { 'fcarousel-dot-active': value === i })}
          key={i}
          onClick={() => onChange(i)}
        />
      ))}
    </ul>
  );
};

export default Dots;
