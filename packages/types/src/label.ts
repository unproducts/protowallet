import { GeneralTimestamedEntity, IdEntity } from "./base";

export type Label = {
  value: string;
  accent: string;
} & IdEntity & GeneralTimestamedEntity;
