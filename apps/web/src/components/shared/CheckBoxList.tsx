import React from 'react';

export default function CheckboxList<T>(options: {
  filterOptions: T[],
  selectedFilters: T[],
  setSelectedFilters: (t: T[]) => void,
  setDisplayValue: (t: T) => string,
}) {
  const onCheckHandler = (event, value) => {
    if (event.target.checked) {
      options.setSelectedFilters([...options.selectedFilters, value]);
    } else {
      const currselectedFilters = [...options.selectedFilters];
      options.setSelectedFilters(currselectedFilters.filter((f) => f !== value));
    }
  };

  const displayableFilterOptions = options.filterOptions.map(options.setDisplayValue);

  return (
    <ul className="space-y-2">
      {options.filterOptions.map((filter, index) => (
        <li key={displayableFilterOptions[index] + index}>
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" onChange={(event) => onCheckHandler(event, filter)} />
            <span className="text-sm text-slate-600 font-medium ml-2 italic">{displayableFilterOptions[index]}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
