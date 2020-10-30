import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import MenuContext from './MenuContext';
import displayName from './displayName';
import getMenuInfo from './getMenuInfo';
import { difference } from '../../utils/helpers';

const ItemGroup = ({ className, children, title, _key }) => {
  const {
    iconOnly,
    selectedGroupKeys,
    hiddenKeys,
  } = useContext(MenuContext);

  const selected = useMemo(() => selectedGroupKeys.indexOf(_key) >= 0, [selectedGroupKeys, _key]);
  const hidden = useMemo(() => {
    const items = Object.keys(getMenuInfo(children).items);
    return !difference(items, hiddenKeys).length;
  }, [hiddenKeys, children]);

  const customChildren = useMemo(() => {
    return React.Children.map(children, (elm, idx) => React.cloneElement(elm, {
      _groupKey: _key,
      _key: elm.hasOwnProperty('key') ? elm.key : idx,
    }));
  }, [children, _key]);

  return (
    <li
      className={cn(
        'fmenu-item-grp',
        {
          'fmenu-item-grp-icon-only': iconOnly,
          'fmenu-item-grp-selected': selected,
          'fmenu-item-grp-hidden': hidden,
        },
        className,
      )
    }>
      <div className="fmenu-item-grp-title"><span>{title}</span></div>
      <ul className="fmenu-item-grp-list">
        {customChildren}
      </ul>
    </li>
  );
};

ItemGroup.displayName = displayName.group;
ItemGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.string,
  _key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
ItemGroup.defaultProps = {};

export default ItemGroup;
