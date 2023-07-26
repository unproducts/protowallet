import React from 'react';
import DeleteIcon from '../../icons/DeleteIcon';
import { Link } from 'react-router-dom';

export type DBSelectorProps = {
  dbNames: string[];
  setSelectedDB: (dbName: string) => void;
  deleteDB: (dbName: string) => void;
};

const DBSelector = (props: DBSelectorProps) => {
  const [selectedDB, setSelectedDB] = React.useState<string>(props.dbNames[0]);
  const [newDBName, setNewDBName] = React.useState<string>('');

  const checkBoxSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDB(e.target.value);
  };

  const submit = () => {
    if (selectedDB == '') return;
    props.setSelectedDB(selectedDB);
  };

  return (
    <div className="px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl flex items-center justify-center text-slate-800 font-bold mb-6">✨ Available Databases ✨</h1>
        {/* Form */}
        <form onSubmit={submit}>
          <div className="space-y-3 mb-8">
            {props.dbNames.map((dbName) => (
              <label className="relative block cursor-pointer" key={dbName}>
                <input
                  type="radio"
                  name="radio-buttons"
                  value={dbName}
                  className="peer sr-only"
                  checked={dbName == selectedDB}
                  onChange={checkBoxSelected}
                />
                <div className="flex justify-between items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                  <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                    <path stroke="currentColor" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                    <path stroke="currentColor" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
                    <path stroke="currentColor" d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z" />
                  </svg>
                  <span>{dbName}</span>
                  <button
                    className="text-red-400 hover:text-red-500 border rounded-lg p-2"
                    onClick={(e) => {
                      e.preventDefault();
                      props.deleteDB(dbName);
                    }}
                  >
                    <DeleteIcon className="w-5 h-5" />
                  </button>
                </div>
                <div
                  className="absolute inset-0 border-2 border-transparent peer-checked:border-primary-400 rounded pointer-events-none"
                  aria-hidden="true"
                ></div>
              </label>
            ))}
            <label className="relative block cursor-pointer">
              <input
                type="radio"
                name="radio-buttons"
                value={newDBName}
                className="peer sr-only"
                checked={newDBName == selectedDB}
                onChange={checkBoxSelected}
              />
              <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
                  <path stroke="currentColor" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
                  <path stroke="currentColor" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
                  <path stroke="currentColor" d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z" />
                </svg>
                <input
                  type="text"
                  placeholder="New Database Name"
                  className="w-full"
                  onChange={(e) => {
                    setNewDBName(e.target.value);
                    checkBoxSelected(e);
                  }}
                />
              </div>
              <div
                className="absolute inset-0 border-2 border-transparent peer-checked:border-primary-400 rounded pointer-events-none"
                aria-hidden="true"
              ></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <Link to='/home' className="btn bg-primary-500 hover:bg-primary-600 text-white ml-auto hover:shadow" onClick={submit}>
              Launch App
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DBSelector;
