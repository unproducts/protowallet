import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';
import './ChartjsConfig';

import GeneralLayout from './components/GeneralLayout';
// import Budgets from './components/budgets/budgets';
import Accounts from './components/accounts/Accounts';
// import Transactions from './components/transactions/Transactions';
// import RecurringTransactions from './components/recurring transactions/recurringTransactions';
import Labels from './components/labels/Labels';
import Categories from './components/categories/Categories';
import { Protowallet, ProtowalletOptions } from '@protowallet/core';
import { ProtoContext } from './hooks/use-proto';
import SingleMessageComponent from './components/general/SingleMessageComponent';
import { ApplicationMode } from '@protowallet/types';
import SelectorScreen from './components/selector-screen/SelectorScreen';

function App() {
  const location = useLocation();

  const [proto, setProto] = useState<Protowallet | null>(null);
  const [dbName, setDbName] = useState<string>('');

  const createProto = (dbNameProp: string): void => {
    console.log('Creating proto with dbName: ', dbNameProp);
    setDbName(dbNameProp);
    const protoMode = process.env.REACT_APP_PROTO_MODE as ApplicationMode;
    Protowallet.create({
      mode: protoMode,
      dbName: dbNameProp,
    }).then(setProto);
  };

  const derefProto = (): void => {
    setProto(null);
  };

  useEffect(() => {
    if (document) {
      // @ts-ignore
      document.querySelector('html').style.scrollBehavior = 'auto';
      window.scroll({ top: 0 });
      // @ts-ignore
      document.querySelector('html').style.scrollBehavior = '';
    }
  }, [location.pathname]); // triggered on route change

  const ComingSoonPage = <SingleMessageComponent title='🚧' description='Coming Soon'/>;

  return (
    <>
      {!proto && (
        <SelectorScreen dbSelected={createProto}/>
      )}
      {proto && (
        <ProtoContext.Provider value={proto}>
          <GeneralLayout derefProto={derefProto} dbName={dbName}>
            <Routes>
              <Route path="/home" element={ComingSoonPage} />
              <Route path='/analytics' element={ComingSoonPage} />
              <Route path='/budgets' element={ComingSoonPage} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/labels" element={<Labels />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/triggers" element={ComingSoonPage} />
              <Route path="/settings" element={ComingSoonPage} />
            </Routes>
          </GeneralLayout>
        </ProtoContext.Provider>
      )}
    </>
  );
}

export default App;
