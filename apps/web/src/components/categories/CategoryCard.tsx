import React from 'react';
import Accordion from '../shared/Accordion';
import CategoryIcon from './CategoryIcon';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import { DetailedCategory, Category } from '@protowallet/types';
import NewUpdateCategoryAction from './NewUpdateCategoryAction';
import { CreateCategoryOptions, UpdateCategoryOptions } from '@protowallet/core/dist/repositories';
import SimplePlusIcon from '../../icons/SimplePlusIcon';

export type CategoryCardProps = {
  category: DetailedCategory;
  createCategoryFn: (category: CreateCategoryOptions) => void;
  updateCategoryFn: (category: UpdateCategoryOptions) => void;
  deleteCategoryFn: (category: Category) => void;
};

export type CategoryEntryProps = {
  isSubcategory: boolean;
  category: Category;
  parentCategory?: Category;
  createCategoryFn: (category: CreateCategoryOptions) => void;
  updateCategoryFn: (category: UpdateCategoryOptions) => void;
  deleteCategoryFn: (category: Category) => void;
};

const CategoryEntry = (props: CategoryEntryProps) => {
  const { category, parentCategory, isSubcategory } = props;

  const logoId = (isSubcategory ? parentCategory?.logoId : category.logoId) as number;

  return (
    <div className={`flex items-center justify-between h5 font-bold w-full p-1 my-2 ${isSubcategory && 'w-4/5 ml-6'}`}>
      <span className="flex items-center">
        <CategoryIcon className="w-8 h-8 mr-4" logoId={logoId} />
        <span>{category.title}</span>
      </span>
      {isSubcategory && (
        <span className="flex items-center justify-start w-5/6">
          <NewUpdateCategoryAction
            buttonClassName={'text-slate-400 hover:text-slate-500 border rounded-lg p-2 mr-1'}
            category={category}
            parent={parentCategory?.id as number}
            updateCategoryFn={props.updateCategoryFn}
          >
            <EditIcon className="w-5 h-5" />
          </NewUpdateCategoryAction>
          <button
            className="text-red-400 hover:text-red-500 border rounded-lg p-2"
            onClick={(e) => {
              e.preventDefault();
              props.deleteCategoryFn(category);
            }}
          >
            <DeleteIcon className="w-5 h-5" />
          </button>
        </span>
      )}
    </div>
  );
};

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Accordion
      title={
        <CategoryEntry
          category={props.category as Category}
          isSubcategory={false}
          updateCategoryFn={props.updateCategoryFn}
          deleteCategoryFn={props.deleteCategoryFn}
          createCategoryFn={props.createCategoryFn}
        />
      }
    >
      {props.category.children.map((subcategory) => (
        <CategoryEntry
          key={subcategory.id}
          category={subcategory}
          parentCategory={props.category}
          isSubcategory={true}
          updateCategoryFn={props.updateCategoryFn}
          deleteCategoryFn={props.deleteCategoryFn}
          createCategoryFn={props.createCategoryFn}
        />
      ))}
      <NewUpdateCategoryAction
        buttonClassName={'text-slate-400 hover:text-slate-500 flex items-center justify-start h5 font-bold p-1 my-2 w-4/5 ml-6'}
        parent={props.category.id}
        updateCategoryFn={props.updateCategoryFn}
        createCategoryFn={props.createCategoryFn}
      >
        <SimplePlusIcon className="w-4 h-4 mr-3" /> Add Subcategory
      </NewUpdateCategoryAction>
    </Accordion>
  );
};

export default CategoryCard;
