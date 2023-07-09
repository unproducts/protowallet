import React from 'react';
import { ComputedBudget } from '../../types';
import BudgetIcon from '../../icons/BudgetIcon';
import { formatAmount, formatDate } from '../../utils/Utils';

export type BudgetCardProps = {
  budget: ComputedBudget;
  isSelected: boolean;
};

const BudgetCard = (props: BudgetCardProps) => {
  const budget = props.budget;
  const primary500 = '#1a1a1a';
  const progress = Math.round((budget.spent / budget.amount) * 100);
  return (
    <label className="cursor-pointer w-full">
      <div className={`relative p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out ${props.isSelected ? 'border-2 border-primary-500' : ''}`}>
        <div className="absolute left-0 top-0 bg-primary-100 h-full z-0" style={{ width: `${progress}%` }}/>
        <div className="relative flex justify-between items-center z-10">
          {/* Card */}
          <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
            <BudgetIcon className="w-6 h-6" strokeColor={props.isSelected ? primary500 : undefined} />
            <div>
              <div className="text-sm font-medium text-slate-800">{budget.title}</div>
              <div className="text-xs">
                {formatDate(budget.startDate)}&nbsp;{budget.endDate && <>- {formatDate(budget.endDate)}</>}
              </div>
            </div>
          </div>
          {/* Card limits */}
          <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
            <div className="text-sm">
              {formatAmount(budget.spent, 'USD')}/ {formatAmount(budget.amount, 'USD')}
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default BudgetCard;
