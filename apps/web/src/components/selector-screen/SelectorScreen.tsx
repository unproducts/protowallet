import React from 'react';

// @ts-ignore
import ProtoLogo from '../../assets/proto-logo.png';
import DBSelector from './DbSelector';

export type SelectorScreenProps = {
  dbSelected: (dbName: string) => void;
};

function SelectorScreen(props: SelectorScreenProps) {
  const keys = Object.keys(localStorage);
  const [dbNames, setDbNames] = React.useState(keys.filter((key) => key.endsWith('.protodb')).map((key) => key.replace('.protodb', '')));

  const deleteDb = (dbName: string) => {
    const dbKey = `${dbName}.protodb`;
    localStorage.removeItem(dbKey);
    setDbNames(dbNames.filter((name) => name !== dbName));
  };

  return (
    <div className="min-h-screen h-full flex flex-col after:flex-1">
      <div className="mb-6">
        {/* Header */}
        <div className="flex items-center justify-start text-black text-xl font-bold h-16 px-4 mb-8 sm:px-6 lg:px-8">
          {/* Logo */}
          <img className="h-8 mr-2 w-auto" src={ProtoLogo} alt="Workflow" />
          Protowallet
        </div>
        <DBSelector dbNames={dbNames} setSelectedDB={props.dbSelected} deleteDB={deleteDb} />
      </div>
    </div>
  );
}

export default SelectorScreen;
