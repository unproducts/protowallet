import React from 'react';

export type SingleMessageComponentProps = {
  title: string;
  description: string;
};

const SingleMessageComponent = (props: SingleMessageComponentProps) => {
  return (
    <div className='h-screen w-full bg-primary-100 '>
      <div className="flex items-center justify-center h-5/6 w-full">
        <div className="text-4xl font-bold text-primary-400">
          <div className="text-6xl font-bold text-primary-400 flex items-center justify-center bg-white border border-black rounded-lg mx-3 my-2">{props.title}</div>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default SingleMessageComponent;
