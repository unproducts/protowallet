import React from 'react';
import { IconProps } from './props';

// stroke={props.strokeColor || "currentColor"}

const GPTIcon = (props: IconProps) => {
  return <span className={props.className + ' bg-gradient-to-r hover:bg-gradient-to-tr text-white flex items-center justify-center rounded border border-primary-500 from-logoPink to-logoBlue font-bold text-xs'}>AI</span>;
};
export default GPTIcon;
