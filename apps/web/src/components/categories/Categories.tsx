import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import SinglePageHeader from '../shared/SinglePageHeader';
import { EntitiesEnum } from '@protowallet/core';
import { CategoryRepository, CreateCategoryOptions, UpdateCategoryOptions } from '@protowallet/core/dist/repositories';
import { Category, DetailedCategory } from '@protowallet/types';
import { useProto } from '../../hooks/use-proto';

const Categories = () => {
  const proto = useProto();
  const categoryRepository = proto.getRepository(EntitiesEnum.Category) as CategoryRepository;

  const [categories, setCategories] = useState<DetailedCategory[]>([]);

  const refreshCategories = () => {
    categoryRepository.getAll_Detailed().then(setCategories);
  };

  useEffect(refreshCategories, []);

  const createCategory = (options: CreateCategoryOptions) => {
    console.log('createCategory', options);
    categoryRepository.create(options).then((_) => {
      refreshCategories();
    });
  };
  const deleteCategory = (category: Category) => {
    categoryRepository.delete(category.id).then(() => {
      refreshCategories();
    });
  };
  const updateCategcategory = (options: UpdateCategoryOptions) => {
    categoryRepository.update(options).then((_) => {
      refreshCategories();
    });
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      <SinglePageHeader title="Categories" />

      {/* Credit cards */}
      <div className="space-y-4">
        {/* Card 1 */}
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} updateCategoryFn={updateCategcategory} createCategoryFn={createCategory} deleteCategoryFn={deleteCategory} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
