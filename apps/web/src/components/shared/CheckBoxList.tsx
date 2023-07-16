import React from 'react';
import { IdEntity } from '@protowallet/types';

export default function CheckboxList<T extends IdEntity | string>(options: {
  filterOptions: T[];
  selectedFilters: T[];
  setSelectedFilters: (t: T[]) => void;
  getDisplayValue: (t: T) => string;
}) {
  const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>, value: T) => {
    if (event.target.checked) {
      options.setSelectedFilters([...options.selectedFilters, value]);
    } else {
      const currselectedFilters = [...options.selectedFilters];
      if (typeof value === 'string') {
        options.setSelectedFilters(currselectedFilters.filter((f) => f != value));
        return;
      } else if (typeof value === 'object') {
        // @ts-ignore
        options.setSelectedFilters(currselectedFilters.filter((f) => f.id != value.id));
        return;
      }
    }
  };

  const displayableFilterOptions = options.filterOptions.map(options.getDisplayValue);

  return (
    <ul className="space-y-2">
      {options.filterOptions.map((filter, index) => (
        <li key={index}>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" onChange={(event) => onCheckHandler(event, filter)} />
            <span className="text-sm text-slate-600 font-medium ml-2 italic">{displayableFilterOptions[index]}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
