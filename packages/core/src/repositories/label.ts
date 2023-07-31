import { IdEntity, Label } from '@protowallet/types';
import { AbstractRepositoryAdapter } from './base';
import { EntityNotFoundException, EntityNotValidException, utils } from '@protowallet/common';
import { PrefsProvider } from '../services/prefs-manager';

export type CreateLabelOptions = Omit<Label, 'id' | 'createdAt'>;
export type UpdateLabelOptions = Partial<Label> & IdEntity;

export class LabelRepository extends AbstractRepositoryAdapter<Label> {
  constructor(feed: Collection<Label>, prefs: PrefsProvider) {
    super(feed, prefs);
  }

  async create(options: CreateLabelOptions): Promise<Label> {
    const label: Label = {
      id: utils.generateRandomId(),
      value: options.value,
      accent: options.accent,
      createdAt: new Date(),
    };
    return this._save(label);
  }

  async update(options: UpdateLabelOptions): Promise<Label> {
    const label = await this.get(options.id);
    if (!label) {
      throw EntityNotFoundException('Label', options.id);
    }
    label.value = options.value || label.value;
    label.accent = options.accent || label.accent;
    return this._update(label);
  }

  async validate(entity: Label): Promise<void> {
    const case1 = !!(entity.id && entity.id > 0);
    const case2 = !!(entity.value && entity.value.length > 0);
    const case3 = !!entity.accent;
    const isValid = case1 && case2 && case3;
    if (!isValid) {
      throw EntityNotValidException('Label', entity);
    }
  }
}
