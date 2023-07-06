import React from 'react';
import CategoryCard, { CategoryCardProps } from './CategoryCard';

const Categories = () => {
  const dummyCategory1: CategoryCardProps = {
    category: {
      id: 1,
      title: 'Category 1',
      parent: 0,
    },
    subcategories: [
      {
        id: 1,
        title: 'Subcategory 1',
        parent: 1,
      },
      {
        id: 2,
        title: 'Subcategory 2',
        parent: 1,
      },
    ],
  };
  const dummyCategory2: CategoryCardProps = {
    category: {
      id: 2,
      title: 'Category 2',
      parent: 0,
    },
    subcategories: [
      {
        id: 3,
        title: 'Subcategory 3',
        parent: 2,
      },
      {
        id: 4,
        title: 'Subcategory 4',
        parent: 2,
      },
    ],
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Categories ✨</h1>
        </div>
        {/* Add card button */}
        {/* <NewAccountModal /> */}
      </div>

      {/* Credit cards */}
      <div className="space-y-4">
        {/* Card 1 */}
        <CategoryCard {...dummyCategory1} />
        <CategoryCard {...dummyCategory2} />
      </div>
    </div>
  );
};

export default Categories;
