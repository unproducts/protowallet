import React, { useState, useEffect } from 'react';
import RecurringTransactionTableItem from './recurringTransactionTableItem';

function RecurringTransactionTable({
  // selectedItems
}) {

  const invoices = Array.from({ length: 10 }, (_, index) => ({
    title: `Title ${index + 1}`,
    account: `Account ${index + 1}`,
    amount: `$${Math.floor(Math.random() * 10000)}`,
    category: `Category ${index + 1}`,
    recordType: Math.random() < 0.5 ? 'Income' : 'Expense',
    startDate: `${Math.floor(Math.random() * 30) + 1}/07/2021`,
    repeat: Math.random() < 0.5 ? 'on' : 'off',
  }));
  // const invoices = [
  //   {
  //     title: 'Salary',
  //     account: 'ABC Bank',
  //     amount: '$129,000',
  //     category: 'Wage',
  //     recordType: 'Income',
  //     startDate: '22/07/2021',
  //     repeat: 'on',
  //   },
  //   {
  //     id: '1',
  //     invoice: '#779912',
  //     total: '$59.00',
  //     status: 'Paid',
  //     customer: 'Mark Cameron',
  //     issueddate: '19/07/2021',
  //     paiddate: '20/07/2021',
  //   },
  //   {
  //     id: '2',
  //     invoice: '#889924',
  //     total: '$89.00',
  //     status: 'Paid',
  //     customer: 'Sergio Gonnelli',
  //     issueddate: '17/07/2021',
  //     paiddate: '19/07/2021',
  //     type: 'One-time',
  //   },
  //   {
  //     id: '3',
  //     invoice: '#897726',
  //     total: '$129.00',
  //     status: 'Due',
  //     customer: 'Manuel Garbaya',
  //     issueddate: '04/07/2021',
  //     paiddate: '-',
  //   },
  //   {
  //     id: '4',
  //     invoice: '#123567',
  //     total: '$129.00',
  //     status: 'Due',
  //     customer: 'Cool Robot',
  //     issueddate: '04/07/2021',
  //     paiddate: '-',
  //   },
  //   {
  //     id: '5',
  //     invoice: '#896644',
  //     total: '$129.00',
  //     status: 'Paid',
  //     customer: 'Mark Cameron',
  //     issueddate: '04/07/2021',
  //     paiddate: '09/07/2021',
  //     type: 'One-time',
  //   },
  //   {
  //     id: '6',
  //     invoice: '#136988',
  //     total: '$69.00',
  //     status: 'Paid',
  //     customer: 'Glenn Thomas',
  //     issueddate: '01/07/2021',
  //     paiddate: '01/07/2021',
  //     type: 'One-time',
  //   },
  //   {
  //     id: '7',
  //     invoice: '#442206',
  //     total: '$129.00',
  //     status: 'Overdue',
  //     customer: 'Dominik Lamakani',
  //     issueddate: '22/06/2021',
  //     paiddate: '-',
  //   },
  //   {
  //     id: '8',
  //     invoice: '#764321',
  //     total: '$89.00',
  //     status: 'Paid',
  //     customer: 'Brian Halligan',
  //     issueddate: '21/06/2021',
  //     paiddate: '29/06/2021',
  //     type: 'One-time',
  //   },
  //   {
  //     id: '9',
  //     invoice: '#908764',
  //     total: '$129.00',
  //     status: 'Due',
  //     customer: 'Carolyn McNeail',
  //     issueddate: '17/06/2021',
  //     paiddate: '-',
  //   }
  // ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState<any>([]);
  const [list, setList] = useState<any>([]);

  useEffect(() => {
    setList(invoices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    // selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Invoices <span className="text-slate-400 font-medium">67</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Account</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Category</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Record Type</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Start Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Repeat</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                list.map(invoice => {
                  return (
                    <RecurringTransactionTableItem
                      key={invoice.id}
                      id={invoice.title}
                      invoice={invoice.account}
                      total={invoice.account}
                      status={invoice.amount}
                      customer={invoice.category}
                      issueddate={invoice.recordType}
                      paiddate={invoice.startDate}
                      type={invoice.repeat}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(invoice.id)}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default RecurringTransactionTable;
