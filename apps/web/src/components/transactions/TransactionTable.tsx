import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import TransactionItem from './TransactionTableItem';

import Image01 from './TransactionImage';

type Transaction = {
  id: string;
  image: () => JSX.Element;
  name: string;
  date: string;
  status: string;
  amount: string;
}

type TransactionTableProps = {
  setTransactions: Dispatch<SetStateAction<any>>;
}

function TransactionsTable({
  setTransactions: selectedItems
}: TransactionTableProps) {

  const transactions: Transaction[] = [
    {
      id: '0',
      image: Image01,
      name: 'Form Builder CP',
      date: '22/01/2022',
      status: 'Expense',
      amount: '-$1,299.22',
    },
    {
      id: '1',
      image: Image01,
      name: 'Imperial Hotel ****',
      date: '22/01/2022',
      status: 'Income',
      amount: '-$1,029.77',
    },
    {
      id: '2',
      image: Image01,
      name: 'Aprilynne Pills',
      date: '22/01/2022',
      status: 'Expense',
      amount: '+$499.99',
    },
    {
      id: '3',
      image: Image01,
      name: 'Google Limited UK',
      date: '22/01/2022',
      status: 'Income',
      amount: '-$1,029.77',
    },
    {
      id: '4',
      image: Image01,
      name: 'Acme LTD UK',
      date: '22/01/2022',
      status: 'Expense',
      amount: '+$2,179.36',
    },
    {
      id: '5',
      image: Image01,
      name: 'Google Limited UK',
      date: '22/01/2022',
      status: 'Transfer',
      amount: '-$1,029.77',
    },
    {
      id: '6',
      image: Image01,
      name: 'Uber',
      date: '22/01/2022',
      status: 'Income',
      amount: '-$272.88',
    },
    {
      id: '7',
      image: Image01,
      name: 'PublicOne Inc.',
      date: '22/01/2022',
      status: 'Income',
      amount: '-$199.87',
    },
    {
      id: '8',
      image: Image01,
      name: 'Github Inc.',
      date: '22/01/2022',
      status: 'Income',
      amount: '-$42.87',
    },
    {
      id: '9',
      image: Image01,
      name: 'Form Builder PRO',
      date: '22/01/2022',
      status: 'Income',
      amount: '-$112.44',
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [list, setList] = useState<Transaction[]>([]);

  useEffect(() => {
    setList(transactions);
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
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white">
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 border-t border-b border-slate-200">
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
                  <div className="font-semibold text-left">Payment Date</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-right">Amount</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 border-b border-slate-200">
              {list.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.id}
                    id={transaction.id}
                    image={transaction.image}
                    name={transaction.name}
                    date={transaction.date}
                    status={transaction.status}
                    amount={transaction.amount}
                    handleClick={handleClick}
                    isChecked={isCheck.includes(transaction.id)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTable;