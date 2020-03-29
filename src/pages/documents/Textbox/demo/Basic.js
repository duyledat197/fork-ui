import React from 'react';
import { Textbox, Password, Textarea, Select, InputNumber } from '../../../../components/core';

const Demo = () => {
  return (
    <div className="w-full">
      <Textbox className="mb-5" />
      <Password className="mb-5" />
      <Textarea className="mb-5" />
      <Select className="mb-5" />
      <InputNumber className="mb-5" />
    </div>
  );
};

Demo.code = `
import React from 'react';
import { Button, Affix } from '@/components/core';

export default () => {
  return (
    <div
      className="flex flex-col justify-end w-full"
      style={{
        height: '1300px',
      }}
    >
      <div className="flex w-full">
        <Affix bottom={100}>
          <Button className="mr-10">Bottom 100px</Button>
        </Affix>
        <div className="flex-1">
          <Button>Button Right</Button>
        </div>
      </div>
    </div>
  );
};
`;

export default Demo;