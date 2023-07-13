import React from 'react';

import GeneralSidebar from './sidebar/GeneralSidebar';
import GeneralHeader from './shared/GeneralHeader';

export type GeneralLayoutProps = {
  children: React.ReactNode;
  derefProto: () => void;
  dbName: string;
};

const GeneralLayout = (props: GeneralLayoutProps) => {
  return (
    <>
      <GeneralHeader derefProto={props.derefProto} dbName={props.dbName} />
      <div className="bg-white shadow-lg rounded-sm">
        <div className="flex flex-col md:flex-row md:-mr-px">
          <GeneralSidebar />
          {props.children}
        </div>
      </div>
    </>
  );
};

export default GeneralLayout;
