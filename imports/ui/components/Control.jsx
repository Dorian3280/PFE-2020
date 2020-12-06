import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FORMATS, KINDS, METHODS } from '/imports/commons/enums';
import { ucFirst } from '/imports/utils/methods';

import { SelectPicker } from 'rsuite';
import { InputNumber } from 'rsuite';
import { Input } from 'rsuite';
import { DatePicker } from 'rsuite';

const InputText = ({ width, dataType, ...props}) => <Input type={dataType} style={{ width }} {...props} />;

const Number = ({width, ...props}) => (
  <div style={{ width }}>
    <InputNumber {...props}/>
  </div>
);

const Select = ({name, width, ...props}) => {
  const data = () => {
    switch (name) {
      case 'format':
        return FORMATS;
      case 'kind': 
      return KINDS;
      case 'methodes': 
      return METHODS;
      default:
        return [];
    }
  }
  
  return <SelectPicker style={{ width }} data={data()} placeholder={ucFirst(name)} {...props}/>
};

const Date = (props) => <DatePicker {...props}/>;

const Control = ({ type, ...props }) => {
  const Component = useMemo(() => {
    switch (type) {
      case 'number':
        return Number;
      case 'select':
        return Select;
      case 'date':
        return Date;
      default:
        return InputText;
    }
  }, []);

  return <Component {...props}/>;
};

export default Control;