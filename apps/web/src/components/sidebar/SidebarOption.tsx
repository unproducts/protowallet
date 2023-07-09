import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { IconProps } from '../../icons/props';

import AccountIcon from '../../icons/AccountIcon';
import AnalyticsIcon from '../../icons/AnalyticsIcon';
import SettingsIcon from '../../icons/SettingsIcon';
import TransactionIcon from '../../icons/TransactionIcon';
import LabelsIcon from '../../icons/LabelsIcon';
import CategoriesIcon from '../../icons/CategoriesIcon';
import TriggersIcon from '../../icons/TriggersIcon';
import HomeIcon from '../../icons/HomeIcon';
import BudgetIcon from '../../icons/BudgetIcon';
import RecurringTransactionIcon from '../../icons/RecurringTransactionIcon';

export type SidebarOptionProps = {
  pathName: string;
  icon: string;
  label: string;
};

const IconsRecord: Record<string, React.FC<IconProps>> = {
  HomeIcon,
  AccountIcon,
  AnalyticsIcon,
  SettingsIcon,
  TransactionIcon,
  LabelsIcon,
  CategoriesIcon,
  TriggersIcon,
  BudgetIcon,
  RecurringTransactionIcon,
};

const SidebarOption = (props: SidebarOptionProps) => {
  const location = useLocation();
  const { pathname } = location;
  // @vite-ignore
  const SidebarIcon: React.FC<IconProps> = IconsRecord[props.icon];

  const primary500 = '#1a1a1a';
  const generalSlate = '#94a3b8';
  return (
    <li className="mr-0.5 md:mr-0 md:mb-0.5">
      <NavLink
        end
        to={props.pathName}
        className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap ${pathname.includes(props.pathName) && 'bg-primary-100 border border-primary-500'}`}
      >
        {SidebarIcon && (
          <SidebarIcon
            className={`w-5 h-5 shrink-0 text-slate-400 mr-2 ${pathname.includes(props.pathName) && 'text-primary-500'}`}
            strokeColor={pathname.includes(props.pathName) ? primary500 : generalSlate}
          />
        )}
        <span className={`text-sm font-medium ${pathname.includes(props.pathName) ? 'text-primary-600' : 'hover:text-slate-700'}`}>
          {props.label}
        </span>
      </NavLink>
    </li>
  );
};

export default SidebarOption;
