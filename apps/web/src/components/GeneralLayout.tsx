import React from 'react';

import GeneralSidebar from './sidebar/GeneralSidebar';
import GeneralHeader from './shared/GeneralHeader';

const GeneralLayout = (props) => {
  return (
    <>
      <GeneralHeader />
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
