import React, { useEffect, useState } from 'react';
import Accordion from '../shared/Accordion';
import Datepicker from '../shared/Datepicker';
import DateSelect from '../shared/DateSelect';
import CheckboxList from '../shared/CheckBoxList';
import { Account, Category, Label } from '@protowallet/types';
import { FindTransactionsOptions } from '@protowallet/core/dist/repositories';
import { RecordType } from '@protowallet/lookups';

export type DateSelectedType = 'Today' | 'Last 7 Days' | 'Last Month' | 'Last 12 Months' | 'All Time' | 'Custom';

export type TransactionsFilterBarOptions = {
  accounts: Account[];
  categories: Category[];
  labels: Label[];
  setFilterQuery: (q: FindTransactionsOptions) => void;
};

function TransactionsFilterBar(options: TransactionsFilterBarOptions) {
  const [dateSelectedType, setDateSelectedType] = useState<DateSelectedType>('Last 7 Days');

  // Filters
  const [selectedAccounts, setSelectedAccounts] = useState<Account[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
  const [selectedRecordType, setSelectedRecordType] = useState<RecordType[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000));
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const filterQuery: FindTransactionsOptions = {
      dateRange: {
        from: selectedStartDate,
        to: selectedEndDate,
      },
    };
    if (selectedAccounts?.length) {
      filterQuery.accounts = selectedAccounts.map((acc) => acc.id);
    }
    if (selectedCategories?.length) {
      filterQuery.categories = selectedCategories.map((ctg) => ctg.id);
    }
    if (selectedLabels?.length) {
      filterQuery.labels = selectedLabels.map((l) => l.id);
    }
    if (selectedRecordType?.length) {
      filterQuery.recordTypes = selectedRecordType;
    }
    options.setFilterQuery(filterQuery);
  }, [selectedAccounts, selectedCategories, selectedLabels, selectedRecordType, selectedStartDate, selectedEndDate]);

  useEffect(() => {
    switch (dateSelectedType) {
      case 'Today':
        setSelectedStartDate(new Date());
        setSelectedEndDate(new Date());
        break;
      case 'Last 7 Days':
        setSelectedStartDate(new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
      case 'Last Month':
        setSelectedStartDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
      case 'Last 12 Months':
        setSelectedStartDate(new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000));
        setSelectedEndDate(new Date());
        break;
    }
  }, [dateSelectedType]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 p-5 min-w-80">
      <i className="text-sm text-primary-500">Filter Results</i>
      <div className="grid md:grid-cols-2 xl:grid-cols-1 gap-6 pt-4">
        {/* Accounts */}
        <div>
          <Accordion
            children={
              <CheckboxList
                filterOptions={options.accounts}
                selectedFilters={selectedAccounts}
                setSelectedFilters={setSelectedAccounts}
                getDisplayValue={(t) => t.name}
              ></CheckboxList>
            }
            title={'Accounts'}
            show={true}
          ></Accordion>
        </div>
        {/* Categories */}
        <div>
          <Accordion
            children={
              <CheckboxList
                filterOptions={options.categories}
                selectedFilters={selectedCategories}
                setSelectedFilters={setSelectedCategories}
                getDisplayValue={(t) => t.title}
              ></CheckboxList>
            }
            title={'Categories'}
            show={false}
          ></Accordion>
        </div>
        {/* Labels */}
        <div>
          <Accordion
            children={
              <CheckboxList
                filterOptions={options.labels}
                selectedFilters={selectedLabels}
                setSelectedFilters={setSelectedLabels}
                getDisplayValue={(t) => t.value}
              ></CheckboxList>
            }
            title={'Labels'}
            show={false}
          ></Accordion>
        </div>
        {/* Record Type */}
        <Accordion
          children={
            <CheckboxList
              filterOptions={[RecordType.Expense, RecordType.Income, RecordType.Transfer]}
              selectedFilters={selectedRecordType}
              setSelectedFilters={setSelectedRecordType}
              getDisplayValue={(t) => {
                switch (t) {
                  case RecordType.Expense:
                    return 'Expense';
                  case RecordType.Income:
                    return 'Income';
                  case RecordType.Transfer:
                    return 'Transfer';
                }
              }}
            />
          }
          title={'Record Type'}
          show={false}
        ></Accordion>
        {/* Date*/}
        <div>
          <div className="text-sm text-slate-800 font-medium">Date</div>
          <DateSelect onChange={setDateSelectedType}></DateSelect>
          <br />
          {dateSelectedType === 'Custom' ? (
            <div>
              <div className="text-sm text-slate-800 font-medium">Custom Date</div>
              <Datepicker align={'middle'} setSelectedStartDate={setSelectedStartDate} setSelectedEndDate={setSelectedEndDate}></Datepicker>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TransactionsFilterBar;
