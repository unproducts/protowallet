import { EndRecurrenceBy } from "@protowallet/lookups";

export type IdEntity = {
  id: number;
};

export type FullTimestampedEntity = {
  createdAt: Date;
  updatedAt: Date;
};

export type GeneralTimestamedEntity = Omit<FullTimestampedEntity, 'updatedAt'>;

export type RecurringEntity = {
  startDate: Date;
  endToken?: Date | number;
  endTokenType: EndRecurrenceBy;
  cronExpr: string;
};