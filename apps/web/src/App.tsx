import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.css';
import './ChartjsConfig';

import GeneralLayout from './components/GeneralLayout';
// import Budgets from './components/budgets/budgets';
// import Accounts from './components/accounts/Accounts';
// import Transactions from './components/transactions/Transactions';
// import RecurringTransactions from './components/recurring transactions/recurringTransactions';
import Labels from './components/labels/Labels';
import Categories from './components/categories/Categories';
import { Protowallet, ProtowalletOptions } from '@protowallet/core';
import { ProtoContext } from './hooks/use-proto';

function App() {
  const location = useLocation();

  const [proto, setProto] = useState<Protowallet | null>(null);
  
  const createProto = (options: ProtowalletOptions): void => {
    setProto(new Protowallet(options));
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

  return (
    <>
      {!proto && (
        <div>
          <button onClick={(e) => { e.preventDefault(); createProto({ dbName: 'test.db' })}}>Create Proto</button>
        </div>
      )}
      {proto && (
        <ProtoContext.Provider value={proto}>
          <GeneralLayout>
            <Routes>
              {/* <Route path="/budgets" element={<Budgets />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/recurringTransactions" element={<RecurringTransactions />} /> */}
              <Route path="/labels" element={<Labels />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </GeneralLayout>
        </ProtoContext.Provider>
      )}
    </>
  );
}

export default App;
