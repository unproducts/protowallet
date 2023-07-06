import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { initProto } from './integrations/proto';

import './css/style.css';
import './ChartjsConfig';

import GeneralLayout from './components/GeneralLayout';
// import Budgets from './components/budgets/budgets';
// import Accounts from './components/accounts/Accounts';
// import Transactions from './components/transactions/Transactions';
// import RecurringTransactions from './components/recurring transactions/recurringTransactions';
import Labels from './components/labels/Labels';
// import Categories from './components/categories/Categories';

function App() {
  const location = useLocation();
  initProto({
    dbName: 'test.db',
  });
  useEffect(() => {
    console.log('location.pathname', location.pathname);
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
      <GeneralLayout>
        <Routes>
          {/* <Route path="/budgets" element={<Budgets />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/recurringTransactions" element={<RecurringTransactions />} /> */}
          <Route path="/labels" element={<Labels />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
        </Routes>
      </GeneralLayout>
    </>
  );
}

export default App;
