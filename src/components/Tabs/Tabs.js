import React from 'react';
import cn from 'classnames';
import Tab from './Tab';

require('./Tabs.scss');

const injectDataToChildren = (children, injection) => {
  return React.cloneElement(children, {
    ...children.props,
    ...injection
  });
};

class Tabs extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return {
      tabs: React.Children.map(props.children, i => ({
        value: i.props.value,
        label: i.props.label,
      })),
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      currentTab: props.defaultCurrentTab,
    };

    this.setCurrentTab = this.setCurrentTab.bind(this);

    this.memo = {};
  }

  componentDidMount() {
    this.memo[this.state.currentTab] = true;
    console.log(this.memo);
  }

  componentDidUpdate() {
    this.memo[this.state.currentTab] = true;console.log(this.memo);
  }

  setCurrentTab(val) {
    this.setState({
      currentTab: val,
    });
  }

  render() {
    const { className, children } = this.props;
    const { tabs, currentTab } = this.state;

    return (
      <div className="rc-tabs">
        <div className="rc-tabs-nav">
          {tabs.map(tab => (
            <button
              className={cn('rc-tabs-nav-item', {
                'rc-tabs-nav-item--active': currentTab === tab.value,
              })}
              disabled={tab.disabled}
              onClick={() => this.setCurrentTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
       <div className="rc-tabs-contents" style={{ height: '20em' }}>
         {React.Children.map(children, chl => {
           if (this.memo[chl.props.value]) {
            return injectDataToChildren(chl, {
              className: cn({ 'rc-tab--active': currentTab === chl.props.value }, chl.props.className),
            });
           }

           if (currentTab === chl.props.value) {
            return injectDataToChildren(chl, {
              className: cn({ 'rc-tab--active': currentTab === chl.props.value }, chl.props.className),
            });
           }
           return null;
         })}
       </div>
      </div>
    );
  }
}

Tabs.Tab = Tab;

export default Tabs;
