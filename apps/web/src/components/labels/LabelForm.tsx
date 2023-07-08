import React, { useState } from 'react';
import { CreateLabelOptions, UpdateLabelOptions } from '@protowallet/core/dist/repositories';
import { Label } from '@protowallet/types';
import { OkCancelAction } from '../../constants/enums';
import { utils } from '@protowallet/common';

export type LabelFormProps = {
  label?: Label;
  createLabelFn?: (label: CreateLabelOptions) => void;
  updateLabelFn?: (label: UpdateLabelOptions) => void;
  actionCompleteFn?: (actionPerformed: OkCancelAction, label?: Label) => void;
};

function LabelForm(props: LabelFormProps) {
  const { createLabelFn, updateLabelFn } = props;
  const isUpdating = !!props.label && props.label.id !== 0;

  const labelId = props.label?.id || 0;
  const [name, setName] = useState<string>(props.label?.value || '');
  const accent = props.label && props.label.accent || utils.generateRandomColor();

  const saveLabel = () => {
    if (isUpdating) {
      updateLabelFn && updateLabelFn({ id: labelId, value: name, accent });
    } else {
      createLabelFn && createLabelFn({ value: name, accent });
    }
    props.actionCompleteFn && props.actionCompleteFn(OkCancelAction.Ok);
  };

  return (
    <div className="px-5 py-4">
      <div className="space-y-3">
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          className="form-input w-full px-2 py-1"
          type="text"
          required
          value={name}
          onChange={({ target: { value } }) => {
            setName(value);
          }}
        />
        <div className="flex flex-wrap justify-end space-x-2">
          {props.actionCompleteFn && (
            <button
              className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
              onClick={() => props.actionCompleteFn && props.actionCompleteFn(OkCancelAction.Cancel)}
            >
              Cancel
            </button>
          )}
          <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={saveLabel}>
            {isUpdating ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LabelForm;
