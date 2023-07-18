import later, { ScheduleData } from '@breejs/later';

import { RecurringEntity, StrictRange } from '@protowallet/types';
import { EndRecurrenceBy } from '@protowallet/lookups';

export type RecurringEntityToFlatMapper<T> = (entity: RecurringEntity, timestamp: Date, index: number) => T;
export type FlattenOptions<T> = {
  dateRange: StrictRange<Date>;
  toFlatMapper: RecurringEntityToFlatMapper<T>;
};

export class RecurringEntityFlattener {
  async flattenEntities<T>(recurringEntities: RecurringEntity[], options: FlattenOptions<T>): Promise<T[]> {
    const flattenedEntities: T[] = [];
    for (let index = 0; index < recurringEntities.length; index++) {
      const recurringEntity = recurringEntities[index];
      let calculatedDateRange: StrictRange<Date>;
      if (recurringEntity.startDate < options.dateRange.from) {
        calculatedDateRange = {
          from: options.dateRange.from,
          to: options.dateRange.to,
        };
      } else {
        calculatedDateRange = {
          from: recurringEntity.startDate,
          to: options.dateRange.to,
        };
      }
      options.dateRange = calculatedDateRange;
      const flattenedEntity = await this.flattenEntity(recurringEntity, options);
      flattenedEntities.push(...flattenedEntity);
    }
    return flattenedEntities;
  }

  async flattenEntity<T>(recurringEntity: RecurringEntity, options: FlattenOptions<T>): Promise<T[]> {
    const { dateRange, toFlatMapper } = options;

    const cronExpr: string = recurringEntity.cronExpr;
    const generateFrom: Date = dateRange.from;
    const generateTill: Date = dateRange.to;

    const schedule: ScheduleData = later.parse.cron(cronExpr);

    let timestamps: Date[];
    if (recurringEntity.endTokenType == EndRecurrenceBy.Count) {
      const count = recurringEntity.endToken as number;
      timestamps = later.schedule(schedule).next(count, recurringEntity.startDate) as Date[];
    } else if (recurringEntity.endTokenType == EndRecurrenceBy.EndDate) {
      const endDate: Date = recurringEntity.endToken as Date;
      timestamps = later.schedule(schedule).next(500, generateFrom, endDate) as Date[];
    } else if (recurringEntity.endTokenType == EndRecurrenceBy.NeverEnd) {
      timestamps = later.schedule(schedule).next(500, generateFrom, generateTill) as Date[];
    } else {
      timestamps = [];
    }

    const generatedEntities: T[] = [];

    for (let index = 0; index < timestamps.length; index++) {
      const timestamp = timestamps[index];

      if (timestamp > generateTill) break;
      else if (timestamp < generateFrom) continue;

      generatedEntities.push(toFlatMapper(recurringEntity, timestamp, index));
    }
    return generatedEntities;
  }
}
