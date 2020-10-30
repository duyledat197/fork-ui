import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Overlay from '../Overlay';
import { omit } from '../../utils/helpers';

const Tooltip = ({ className, overlayClass, children, title, trigger, ...otherProps }) => {
  if (!title) {
    return children;
  }

  const passedProps = useMemo(() => omit(otherProps, [
    'overlay',
    'className',
  ]), [otherProps]);

  return (
    <Overlay
      canOutsideClickClose
      arrow
      trigger={trigger}
      overlay={title}
      className={className}
      overlayClass={cn('ftooltip', overlayClass)}
      gap={10}
      {...passedProps}
    >
      {children}
    </Overlay>
  );
};

Tooltip.displayName = 'Tooltip';
Tooltip.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  overlayClass: PropTypes.string,
  trigger: PropTypes.string,
};
Tooltip.defaultProps = {
  gap: 10,
  trigger: 'hover',
};

export default Tooltip;
