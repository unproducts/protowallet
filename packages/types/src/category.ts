import { GeneralTimestamedEntity, IdEntity } from "./base";

export type Category = {
  parent: number;
  logoId?: number;
  title: string;
  description?: string;
} & IdEntity & GeneralTimestamedEntity;

export type DetailedCategory = Category & {
  children: Category[];
};
