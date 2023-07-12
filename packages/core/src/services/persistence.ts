import { ApplicationMode } from '@protowallet/types';

export class PersistenceService {
  private lokiDb: Loki;
  private mode: ApplicationMode;
  // @ts-ignore
  private serverUrl: string | null;

  constructor(db: Loki, mode: ApplicationMode, serverUrl: string | undefined) {
    this.lokiDb = db;
    this.mode = mode;
    if (mode != 'web' && !serverUrl) {
      throw new Error('serverUrl must be set when mode is not web');
    }
    this.serverUrl = serverUrl || null;
  }

  async processSyncRequest(): Promise<void> {
    const { lokiDb } = this;
    lokiDb.saveDatabase();
    if (this.mode === 'desktop') {
    } else if (this.mode === 'docker') {
    } else if (this.mode === 'web') {
    }
  }
}
