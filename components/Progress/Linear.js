import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Droplet from '../Droplet';

const LinearProgress = ({ className, percent, droplet }) => {
  const [textVisible, setTextVisible] = useState(true);

  useEffect(() => {
    if (droplet && textVisible) {
      setTextVisible(true);
      const timer = setTimeout(() => setTextVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [droplet, textVisible]);

  useEffect(() => {
    if (droplet) {
      setTextVisible(true);
    }
  }, [percent, droplet]);

  const onMouseEnter = useCallback(() => setTextVisible(true), []);

  return (
    <div className={cn('flinear-prog', className)} onMouseEnter={onMouseEnter}>
      <div className="flinear-prog-rail">
        <div
          className="flinear-prog-rail-percent"
          style={{
            width: `${percent * 100}%`
          }}
        >
          {droplet && (
            <Droplet className={cn('flinear-prog-droplet', { 'flinear-prog-droplet-hidden': !textVisible })}>
              {Math.floor((percent + Number.EPSILON) * 100 )}
              <span>%</span>
            </Droplet>
          )}
        </div>
      </div>
    </div>
  );
};

LinearProgress.displayName = 'Progress.Linear';
LinearProgress.propTypes = {
  className: PropTypes.string,
  percent: PropTypes.number,
  droplet: PropTypes.bool,
};
LinearProgress.defaultProps = {
  droplet: true,
  percent: 0,
};

export default LinearProgress;
