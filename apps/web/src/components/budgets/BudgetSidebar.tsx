import React from 'react';
import { ComputedBudget, Transaction } from '../../types';
import { formatAmount, formatDate } from '../../utils/Utils';

export type BudgetSidebarProps = {
  budget: ComputedBudget;
  underlyingTransactions: Transaction[];
};

const BudgetSidebar = (props: BudgetSidebarProps) => {
  const { budget, underlyingTransactions } = props;
  const amountProgress = Math.round((budget.spent / budget.amount) * 100);
  const today = new Date();
  const isActive = today >= budget.startDate && (budget.endDate ? today <= budget.endDate : true);
  return (
    <div>
      <div className="lg:sticky lg:top-16 bg-slate-50 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 lg:w-[390px] lg:h-[calc(100vh-64px)]">
        <div className="py-8 px-4 lg:px-8">
          <div className="max-w-sm mx-auto lg:max-w-none">
            <div className="text-slate-800 font-semibold text-center mb-6">Budget Summary</div>

            {/* Details */}
            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-800 mb-1">Details</div>
              <ul>
                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div className="text-sm">Title</div>
                  <div className="text-sm font-medium text-slate-800 ml-2">{budget.title}</div>
                </li>
                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div className="text-sm">Effective</div>
                  <div className="text-sm font-medium text-slate-800 ml-2">{formatDate(budget.startDate) + " - " + formatDate(budget.endDate)}</div>
                </li>
                <li className="flex items-center justify-between py-3 border-b border-slate-200">
                  <div className="text-sm">Status</div>
                  <div className="flex items-center whitespace-nowrap">
                    {
                      isActive ?
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> :
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                    }
                    <div className="text-sm font-medium text-slate-800">{ isActive ? 'Active': 'Inactive' }</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-800 mb-4">Spending Details</div>
              <div className="pb-4 border-b border-slate-200">
                <div className="flex justify-between text-sm mb-2">
                  <div className="italic">
                    {formatAmount(budget.spent, 'INR')} <span className="text-slate-400">/</span> {formatAmount(budget.amount, 'INR')}
                  </div>
                </div>
                <div className="relative w-full h-2 bg-slate-300">
                  <div className="absolute inset-0 bg-emerald-500" aria-hidden="true" style={{ width: `${amountProgress}%` }} />
                </div>
              </div>
            </div>

            {/* Edit / Delete */}
            <div className="flex items-center space-x-3 mt-6">
              <div className="w-1/2">
                <button className="btn w-full border-slate-200 hover:border-slate-300 text-slate-600">
                  <svg className="w-4 h-4 fill-current text-slate-500 shrink-0" viewBox="0 0 16 16">
                    <path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z" />
                  </svg>
                  <span className="ml-2">Edit</span>
                </button>
              </div>
              <div className="w-1/2">
                <button className="btn w-full border-slate-200 hover:border-slate-300 text-rose-500">
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                    <path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z" />
                  </svg>
                  <span className="ml-2">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSidebar;
