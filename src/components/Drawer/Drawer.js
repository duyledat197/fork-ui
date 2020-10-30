import React, { useRef, useCallback, useMemo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Portal from '../Portal';
import Dialog from '../Dialog';

import useDebounce from '../../hooks/useDebounce';
import useClickOutsideOverlay from '../../hooks/useClickOutsideOverlay';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import useSemanticProp from '../../hooks/useSemanticProp';
import { omit } from '../../utils/helpers';

const mPlacements = Object.freeze({
  left: 'fdrawer-portal-l',
  right: 'fdrawer-portal-r',
});

const lPlacements = Object.keys(mPlacements);

const Drawer = ({ className, onClose, open, canOutsideClickClose, ...otherProps }) => {
  const placement = useSemanticProp('placement', otherProps, lPlacements)  || 'right';

  const ref = useRef();
  const delayOpen = useDebounce(open, 100);

  const handleClickOutside = useCallback(() => {
    if (canOutsideClickClose) {
      onClose();
    }
  }, []);

  useLockBodyScroll(delayOpen);
  const wrapperRef = useClickOutsideOverlay({ overlayRef: ref, open: delayOpen, handleClickOutside });

  const passedProps = useMemo(() => omit(otherProps, [
    ...lPlacements,
    'placement',
  ]));

  const animationClass = useMemo(() => {
    if (placement === 'right') {
      return open ? 'slideInRight animated faster' : 'slideOutRight animated faster';
    }

    if (placement === 'left') {
      return open ? 'slideInLeft animated faster' : 'slideOutLeft animated faster';
    }

    return 'slideInRight animated faster';
  }, [open, placement]);

  return (
    <React.Fragment>
      {delayOpen && (
        <Portal>
          <Dialog.Portal
            className={cn(
              'fdrawer-portal',
              mPlacements[placement],
            )}
              ref={wrapperRef}
            >
            <Dialog
              className={cn('fdrawer', animationClass, className)}
              ref={ref}
              onClose={onClose}
              {...passedProps}
            />
          </Dialog.Portal>
        </Portal>
      )}
    </React.Fragment>
  );
};

Drawer.Header = Dialog.Header;
Drawer.Body = Dialog.Body;
Drawer.Footer = Dialog.Footer;

Drawer.displayName = 'Drawer';
Drawer.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  canOutsideClickClose: PropTypes.bool,
  placement: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.any,
  closable: PropTypes.bool,
};
Drawer.defaultProps = {
  onClose: f => f,
};

export default Drawer;
