import React from "react";

export default function MinMaxAmountInput({ setSelectedMinAmmount, setSelectedMaxAmmount }) {
  /*  TO DO 
      Add a check on max amount filter
  */
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
        Min
      </label>
      <input
        id="placeholder"
        className="form-input w-full"
        type="number"
        placeholder=""
        onChange={(event) => setSelectedMinAmmount(event.target.value)}
      />
      <label className="block text-sm font-medium mb-1" htmlFor="placeholder">
        Max
      </label>
      <input
        id="placeholder"
        className="form-input w-full"
        type="number"
        placeholder=""
        onChange={(event) => setSelectedMaxAmmount(event.target.value)}
      />
    </div>
  );
}
