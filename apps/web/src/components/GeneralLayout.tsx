import React from "react";

import GeneralSidebar from "./sidebar/GeneralSidebar";

const GeneralLayout = (props) => {
  return (
    <div className="bg-white shadow-lg rounded-sm">
      <div className="flex flex-col md:flex-row md:-mr-px">
        <GeneralSidebar />
        {props.children}
      </div>
    </div>
  );
};

export default GeneralLayout;