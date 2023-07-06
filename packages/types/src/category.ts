import { IdEntity } from "./base";

export type Category = {
  parent: number;
  logoId?: string;
  title: string;
  description?: string;
} & IdEntity;
