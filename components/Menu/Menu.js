import React, { useCallback, useMemo, useState, useEffect } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Item from './Item';
import ItemGroup from './ItemGroup';
import Sub from './Sub';

import MenuContext from './MenuContext';
import { omit } from '../../utils/helpers';
import getMenuInfo from './getMenuInfo';
import displayName from './displayName';

const Menu = ({
  className,
  wrapperClass,
  children,
  hiddenKeys,
  onSelectedKeysChange,
  onItemClick,
  iconOnly,
  multiple,
  ...otherProps
}) => {
  const isControlled = useMemo(() => otherProps.hasOwnProperty('selectedKeys'), [otherProps]);
  const [selectedKeys, setSelectedKeys] = useState(isControlled ? otherProps.selectedKeys : otherProps.defaultSelectedKeys);
  const [selectedSubKeys, setSelectedSubKeys] = useState([]);
  const [selectedGroupKeys, setSelectedGroupKeys] = useState([]);

  // cheat life cycle for performance
  const __selectedKeys = useMemo(() => selectedKeys.join(','), [selectedKeys]);

  useMemo(() => {
    if (isControlled) {
      return setSelectedKeys(otherProps.selectedKeys);
    }
  }, [isControlled, otherProps.selectedKeys, setSelectedKeys]);

  useEffect(() => {
    onSelectedKeysChange(selectedKeys);
  }, [__selectedKeys]);

  const _onItemClick = useCallback((key) => {
    if (isControlled) {
      return onItemClick(key);
    }

    setSelectedKeys((prev) => {
      if (multiple) {
        const next = new Set(prev);

        if (next.has(key)) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return [...next];
      }

      return [key];
    });
  }, [onItemClick, isControlled, setSelectedKeys]);

  const passedProps = useMemo(() => omit(otherProps, ['selectedKeys', 'defaultSelectedKeys']), [otherProps]);

  const menuValue = useMemo(() => ({
    iconOnly,
    selectedKeys,
    hiddenKeys,
    selectedSubKeys,
    selectedGroupKeys,
    onItemClick: _onItemClick,
  }), [iconOnly, selectedKeys, _onItemClick, selectedSubKeys, selectedGroupKeys]);

  const customChildren = useMemo(() => {
    return React.Children.map(children, (elm, idx) => React.cloneElement(elm, {
      _key: elm.key || idx,
    }));
  }, [children]);

  return (
    <MenuContext.Provider value={menuValue}>
      <ul className={cn('fmenu', { 'fmenu-icon-only': iconOnly }, className)} {...passedProps}>
        {customChildren}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.Item = Item;
Menu.ItemGroup = ItemGroup;
Menu.Sub = Sub;
Menu.getMenuInfo = getMenuInfo;

Menu.displayName = displayName.menu;
Menu.propTypes = {
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
  children: PropTypes.any,
  selectedKeys: PropTypes.array,
  hiddenKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  onSelectedKeysChange: PropTypes.func,
  onItemClick: PropTypes.func,
  multiple: PropTypes.bool,
};
Menu.defaultProps = {
  hiddenKeys: [],
  defaultSelectedKeys: [],
  onSelectedKeysChange: f => f,
  onItemClick: f => f,
};

export default Menu;
