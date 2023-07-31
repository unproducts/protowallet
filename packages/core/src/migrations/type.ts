export type Migration = {
  version: number;
  apply: (db: Loki) => Promise<void>;
};
