import { IdEntity } from "./base";

export type Category = {
  parent: number;
  logoId?: number;
  title: string;
  description?: string;
} & IdEntity;

export type DetailedCategory = Category & {
  children: Category[];
};
