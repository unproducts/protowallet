import React from 'react';

// @ts-ignore
import ProtoLogo from '../../assets/proto-logo.png';;

export type HeaderProps = {
  derefProto: () => void;
  dbName: string;
};

function Header(props: HeaderProps) {
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-3">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Header: Left side */}
          <div className="flex items-center text-2xl font-bold text-black font-poppins">
            <img className="h-10 w-auto mr-3" src={ProtoLogo} alt="Workflow" />
            Protowallet
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-slate-500 font-poppins">{props.dbName}</div>
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <button className="btn btn-outline hover:bg-primary-500 hover:text-white border border-primary-500" onClick={props.derefProto}>Switch</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
