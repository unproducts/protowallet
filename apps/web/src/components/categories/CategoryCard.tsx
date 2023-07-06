import React from 'react';
import { Category } from '../../types';
import Accordion from '../shared/Accordion';
import CategoryIcon from './CategoryIcon';
import EditIcon from '../../icons/EditIcon';
import DeleteIcon from '../../icons/DeleteIcon';

export type CategoryCardProps = {
  category: Category;
  subcategories: Category[];
};

export type CategoryEntryProps = {
  category: Category;
  isSubcategory?: boolean;
};

const CategoryEntry = (props: CategoryEntryProps) => {
  const { category, isSubcategory } = props;
  return (
    <div className={`flex items-center justify-between h5 font-bold w-full p-1 my-2 ${isSubcategory && 'w-4/5 ml-6'}`}>
      <span className="flex items-center">
        <CategoryIcon className="w-8 h-8 mr-4" categoryId={isSubcategory ? category.parent : category.id} />
        <span>{category.title}</span>
      </span>
      {isSubcategory && (
        <span className="flex items-center justify-around">
          <button className="text-slate-400 hover:text-slate-500 border rounded-lg p-0.5 mr-1">
            <EditIcon className="w-5 h-5" />
          </button>
          <button className="text-red-400 hover:text-red-500 border rounded-lg p-0.5">
            <DeleteIcon className="w-5 h-5" />
          </button>
        </span>
      )}
    </div>
  );
};

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Accordion title={<CategoryEntry category={props.category} />}>
      {props.subcategories.map((subcategory) => (
        <CategoryEntry key={subcategory.id} category={subcategory} isSubcategory={true} />
      ))}
    </Accordion>
  );
};

export default CategoryCard;
