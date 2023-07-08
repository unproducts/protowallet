import { CreateCategoryOptions, UpdateCategoryOptions } from '@protowallet/core/dist/repositories';
import { Category } from '@protowallet/types';
import React, { useState } from 'react';
import { OkCancelAction } from '../../constants/enums';

export type CategoryFormProps = {
  category?: Category;
  parent: number;
  createCategoryFn?: (category: CreateCategoryOptions) => void;
  updateCategoryFn?: (category: UpdateCategoryOptions) => void;
  actionCompleteFn?: (actionPerformed: OkCancelAction, category?: Category) => void;
};

function CategoryForm(props: CategoryFormProps) {
  const { createCategoryFn, updateCategoryFn } = props;
  const isUpdating = !!props.category && props.category.id !== 0;

  const categoryId = props.category?.id || 0;
  const [name, setName] = useState<string>(props.category?.title || '');

  const saveCategory = () => {
    if (isUpdating) {
      updateCategoryFn && updateCategoryFn({ id: categoryId, title: name });
    } else {
      createCategoryFn && createCategoryFn({ title: name, parent: props.parent });
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
          <button className="btn-sm bg-primary-500 hover:bg-primary-600 text-white" onClick={saveCategory}>
            {isUpdating ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryForm;
