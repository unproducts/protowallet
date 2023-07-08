import React from 'react';

type SinglePageHeaderProps = {
  title: string;
  cta?: React.ReactNode;
};

function SinglePageHeader(props: SinglePageHeaderProps) {
  const { title, cta } = props;
  return (
    <>
      <div className="flex mb-4 justify-between">
        <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{title}</h1>
        <div>{cta}</div>
      </div>
    </>
  );
}

export default SinglePageHeader;
