import { Prefs } from '@protowallet/types';
import { ApplicationFeed } from '../feeds';
import { GeneralDocumentIds } from '@protowallet/lookups';
import { EntityNotFoundException } from '@protowallet/common';

export class PrefsProvider {
  private prefs: Prefs;
  private feed: ApplicationFeed;

  constructor(feed: ApplicationFeed) {
    this.feed = feed;
    const prefs = feed.generalDocuments.findOne({ id: GeneralDocumentIds.PREFS });
    if (!prefs) {
      throw EntityNotFoundException('Prefs', GeneralDocumentIds.PREFS);
    }
    this.prefs = prefs.data as Prefs;
  }

  getPrefs() {
    return this.prefs;
  }

  setPrefs(prefs: Prefs) {
    this.prefs = prefs;
    this.feed.generalDocuments.update({ id: GeneralDocumentIds.PREFS, data: this.prefs });
  }

  getPreferredCurrency() {
    return this.prefs.currency;
  }
}
