import React from 'react';
import { IconProps } from '../../icons/props';
import FoodIcon from '../../icons/FoodIcon';
import EntertainmentIcon from '../../icons/EntertainmentIcon';
import ShoppingIcon from '../../icons/ShoppingIcon';
import TransportationIcon from '../../icons/TransportationIcon';
import HamburgerIcon from '../../icons/HamburgerIcon';
import BillIcon from '../../icons/BillIcon';
import AppleFruitIcon from '../../icons/AppleFruitIcon';

/**
 * Category ID to Icon mapping
 * Key: Category ID
 * Value: [Icon Component, Icon Background Color]
 */
const IdToIcon: Record<number, [React.FC<IconProps>, string]> = {
  1: [FoodIcon, '#227C9D'],
  2: [EntertainmentIcon, '#17C3B2'],
  3: [ShoppingIcon, '#995f02'],
  4: [TransportationIcon, '#FE6D73'],
  5: [BillIcon, '#525252'],
  6: [AppleFruitIcon, '#063970'],
  99: [HamburgerIcon, '#000000'], // Others Category
};

export type CategoryIconProps = {
  logoId: number;
  className?: string;
};

const CategoryIcon = (props: CategoryIconProps) => {
  const { logoId } = props;
  const [Icon, backgroundColor] = IdToIcon[logoId];
  return (
    <div className={props.className + ' rounded-full flex items-center justify-center text-white'} style={{ backgroundColor }}>
      <Icon strokeColor="#ffffff" className="h-3/4 w-3/4 m-1" />
    </div>
  );
};

export default CategoryIcon;
