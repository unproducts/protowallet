import React from 'react';
import { IconProps } from './props';

// stroke={props.strokeColor || "#94a3b8"}

const TransactionIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={props.strokeColor || "#94a3b8"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 10h-14l4 -4" />
      <path d="M7 14h14l-4 4" />
    </svg>
  );
};
export default TransactionIcon;
