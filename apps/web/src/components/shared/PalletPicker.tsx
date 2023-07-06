import React, { useState } from 'react';
import { SetStateActionType } from '../../types';

export type PalletPickerProps = {
  setPalletNumber: SetStateActionType<number>;
};

export const TOTAL_PALLETS = 4;

export const Pallet = (palletNumber: number) => {
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-accent-${palletNumber}-300`}>
      <div className={`w-6 h-6 flex items-center justify-center rounded-full bg-accent-${palletNumber}-200`}>
        <div className={`w-4 h-4 rounded-full bg-accent-${palletNumber}-100`} />
      </div>
    </div>
  );
};

const PalletPicker = (props: PalletPickerProps) => {
  const [selectedPalletNumber, setSelectedPalletNumber] = useState<number>(1);
  const handlePalletSelection = (palletNumber: number) => {
    setSelectedPalletNumber(palletNumber);
    props.setPalletNumber(palletNumber);
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {[...Array(TOTAL_PALLETS + 1).keys()].map((palletNumber) => {
        if (palletNumber === 0) {
          return;
        }
        return (
          <div
            key={palletNumber}
            className={`cursor-pointer ${selectedPalletNumber === palletNumber ? 'border-2 border-primary-500 p-0.5 rounded-full' : ''}`}
            onClick={() => handlePalletSelection(palletNumber)}
          >
            {Pallet(palletNumber)}
          </div>
        );
      })}
    </div>
  );
};

export default PalletPicker;
