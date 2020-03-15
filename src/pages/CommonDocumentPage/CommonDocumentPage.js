import React, { useEffect, useState } from 'react';

import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Checkbox from '../../components/Checkbox';
import Radio from '../../components/Radio';
import Switch from '../../components/Switch';
import Rating from '../../components/Rating';
import Pagination from '../../components/Pagination';
import Avatar from '../../components/Avatar';
import Tabs from '../../components/Tabs';

const avatarLink = 'https://scontent-hkt1-1.xx.fbcdn.net/v/t1.0-1/p320x320/83290506_984513715279336_4057640429858848768_o.jpg?_nc_cat=101&_nc_sid=dbb9e7&_nc_ohc=RBZa-mAgWzkAX9PXXVp&_nc_ht=scontent-hkt1-1.xx&_nc_tp=6&oh=1bbbfc45c4eef77cad5eee9361ded2db&oe=5E926A7C';

const TimeRender = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(Date.now());
  }, []);

  return (
    <div className="w-full flex justify-center items-center text-xl" style={{ height: '10em' }}>
      {(new Date(time).toUTCString())}
    </div>
  );
}

const TableDemo = ({ className }) => {
  return (
    <div className={className}></div>
  )
};

const CommonDocumentPage = ({ children }) => {
  return (
    <div id="common-document-page" className="flex">
      <div className="w-1/3 px-3">
        <Pagination total={500} pageSize={10} max={10} className="mb-10" />
        <div className="flex items-center mb-10">
          <Avatar className="mr-3" src={avatarLink} name="Hoang"/>
          <Avatar className="mr-3" name="Hoang"/>
          <Avatar shape="square" className="mr-3" src={avatarLink} name="Hoang"/>
          <Avatar shape="square" className="mr-3" name="Hoang"/>
        </div>
        <div className="flex mb-10">
          <Button className="mr-2">Basic</Button>
          <Button disabled className="mr-2">Disabled</Button>
          <Button rounded className="mr-2">Rounded</Button>
          <Button circle className="mr-2"><Icon name="home" /></Button>
          <Button transparent className="mr-2">Transparent</Button>
        </div>
        <div className="flex mb-3">
          <Switch defaultChecked className="mr-2" />
          <Switch className="mr-2" />
          <Switch defaultChecked className="mr-2" disabled />
          <Switch className="mr-2" disabled />
        </div>
        <div className="flex mb-3">
          <Checkbox defaultChecked className="mr-2" />
          <Checkbox className="mr-2" />
          <Checkbox defaultChecked className="mr-2" disabled />
          <Checkbox className="mr-2" disabled />
        </div>
        <div className="flex mb-3">
          <Radio defaultChecked className="mr-2" name="n_1" />
          <Radio className="mr-2" name="n_1" />
          <Radio defaultChecked className="mr-2" disabled name="n_2" />
          <Radio className="mr-2" disabled name="n_2" />
        </div>
        <div className="tab-demo mt-10">
          <Tabs className="w-full" defaultCurrentTab="tab-1">
            <Tabs.Tab value="tab-1" label="ONE">
              <div><TimeRender /></div>
            </Tabs.Tab>
            <Tabs.Tab value="tab-2" label="TWO"><div><TimeRender /></div></Tabs.Tab>
            <Tabs.Tab value="tab-3" label="THREE"><div><TimeRender /></div></Tabs.Tab>
            <Tabs.Tab value="tab-4" label="FOUR"><div><TimeRender /></div></Tabs.Tab>
          </Tabs>
        </div>
      </div>
      <div className="w-2/3 px-3">
        <TableDemo className="w-full" />
      </div>
    </div>
  )
};

export default CommonDocumentPage;
