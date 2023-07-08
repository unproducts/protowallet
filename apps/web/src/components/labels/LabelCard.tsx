import React from 'react';
import LabelsIcon from '../../icons/LabelsIcon';
import { Label } from '../../types';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import NewUpdateLabelAction from './NewUpdateLabelAction';

export type LabelCardProps = {
  label: Label;
  updateLabelFn: (label: Label) => void;
  deleteLabelFn: (label: Label) => void;
};

const LabelCard = (props: LabelCardProps) => {
  return (
    <>
      <div className="flex justify-between border rounded-md px-4 py-2">
        <span className="flex items-center font-medium">
          <div className="h-6 w-6 rounded mr-2 font-bold" style={{ backgroundColor: props.label.accent }}></div>
          {props.label.value}
        </span>
        <span className="flex items-center justify-around">
          <NewUpdateLabelAction
            buttonClassName={'text-slate-400 hover:text-slate-500 rounded-lg border p-2 mr-1'}
            label={props.label}
            updateLabelFn={props.updateLabelFn}
          >
            <EditIcon className='w-5 h-5'/>
          </NewUpdateLabelAction>
          <button
            className="text-red-400 hover:text-red-500 border rounded-lg p-2"
            onClick={(e) => {
              e.preventDefault();
              props.deleteLabelFn(props.label);
            }}
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </span>
      </div>
    </>
  );
};

export default LabelCard;
