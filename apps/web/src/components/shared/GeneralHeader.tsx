import React, { useState } from 'react';

import UserMenu from './DropdownProfile';

// @ts-ignore
import ProtoLogo from '../../assets/proto-logo.png';
import { useProto } from '../../hooks/use-proto';

function Header() {
  const proto = useProto();
  const saveProto = () => {
    proto.getPersistenceService().processSyncRequest();
  };
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-3">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Header: Left side */}
          <div className='flex items-center text-2xl font-bold text-black font-poppins'>
            <img className="h-10 w-auto mr-3" src={ProtoLogo} alt="Workflow" />
            ProtoWallet
          </div>
          <div className="flex items-center space-x-3">
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu align="right" saveProtoFn={saveProto} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
