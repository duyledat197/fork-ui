import React, { useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Button from '../Button';
import { ChevronLeft, ChevronRight } from '../icons';
import usePrivatePagination from './usePrivatePagination';
import usePagination from './usePagination';

const loop = (start, end, cb) => {
  const rs = [];
  for (let i = start; i <= end; i++) {
    rs.push(cb(i));
  }
  return rs;
};

const Pagination = ({ className, total, pageSize, max, activePage, onChange, ...otherProps }) => {
  const {
    itemCount,
    startIndex,
    endIndex,
    onNext,
    onPrev,
  } = usePrivatePagination({ total, pageSize, max, activePage, onChange });

  const onItemClick = useCallback(value =>  onChange(value), [onChange]);

  return (
    <div className={cn('fpag', className )} {...otherProps}>
      <Button
        className="fpag-prev"
        disabled={activePage <= 1}
        onClick={onPrev}
        circle
        transparent
        icon={<ChevronLeft />}
        style={{
          marginRight: '0.5rem',
        }}
      />
      {loop(startIndex, endIndex, (pageNumber) => (
        <Button
          rounded
          key={pageNumber}
          transparent
          className={cn('fpag-item', { 'fpag-item-active': pageNumber === activePage })}
          primary={pageNumber === activePage}
          onClick={() => onItemClick(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        className="fpag-next"
        disabled={activePage >= itemCount}
        onClick={onNext}
        circle
        transparent
        icon={<ChevronRight />}
      />
    </div>
  );
};

Pagination.displayName = 'Pagination';
Pagination.usePrivatePagination = usePrivatePagination;
Pagination.usePagination = usePagination;

Pagination.propTypes = {
  className: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  activePage: PropTypes.number,
};
Pagination.defaultProps = {
  total: 0,
  pageSize: 0,
  max: 5,
  onChange: f => f,
};

export default Pagination;
