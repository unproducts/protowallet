import { Entities } from "./entities-lookup";
import { ApplicationFeed, initializeFeed } from "./feeds";
import { RepositoryProvider, makeProvider } from "./repository-provider";

export type ProtowalletCoreOptions = {
  dbName: string;
};

export class ProtowalletCore {
  private options: ProtowalletCoreOptions;
  private applicationFeed: ApplicationFeed;
  private repositoryProvider: RepositoryProvider;

  constructor(options: ProtowalletCoreOptions) {
    this.options = options;
    
    const db = new Loki(this.options.dbName);
    this.applicationFeed = initializeFeed(db);

    this.repositoryProvider = makeProvider(this.applicationFeed);
  }

  getRepository(entity: Entities) {
    return this.repositoryProvider(entity);
  }
}
