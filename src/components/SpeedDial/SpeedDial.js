import React, { useState, useMemo, useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import SpeedDialContext from './SpeedDialContext';
import SpeedDialButton from './Button';
import Overlay from '../Overlay';

import useSemanticProp from '../../hooks/useSemanticProp';
import { omit } from '../../utils/helpers';

const mDirections = Object.freeze({
  vertical: 'fspeed-dial-v',
  horizontal: 'fspeed-dial-h',
});

const lDirections = Object.keys(mDirections);

const SpeedDial = ({ className, overlayClass, children, trigger, overlay, defaultVisible, ...otherProps }) => {
  const [visible, setVisible] = useState(!!defaultVisible);
  const onVisibleChange = useCallback(_visible => setVisible(_visible), []);

  const onClose = useCallback(() => setVisible(false), []);
  const speedDialContext = useMemo(() => ({
    onClose: onClose,
  }), [onClose]);

  const direction = useSemanticProp('direction', otherProps, lDirections);
  const passedProps = useMemo(() => omit(otherProps, [
    'direction',
    ...lDirections,
  ]), [otherProps]);

  return (
    <Overlay
      visible={visible}
      onVisibleChange={onVisibleChange}
      canOutsideClickClose
      trigger={trigger}
      className={className}
      overlay={
        <SpeedDialContext.Provider value={speedDialContext}>
          <div className='fspeed-dial-btns'>
            {overlay}
          </div>
        </SpeedDialContext.Provider>
      }
      overlayClass={cn('fspeed-dial', mDirections[direction], overlayClass)}
      {...passedProps}
    >
      {children}
    </Overlay>
  );
};

SpeedDial.Button = SpeedDialButton;

SpeedDial.displayName = 'SpeedDial';
SpeedDial.propTypes = {
  className: PropTypes.string,
  overlayClass: PropTypes.string,
  trigger: PropTypes.array,
  overlay: PropTypes.any,
  children: PropTypes.any,
  direction: PropTypes.string,
};
SpeedDial.defaultProps = {
  trigger: 'hover',
  direction: 'vertical',
};

export default SpeedDial;
