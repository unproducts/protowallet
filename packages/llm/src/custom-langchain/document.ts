// Code is imported from langchainjs.

/**
 * Interface for interacting with a document.
 */

export interface DocumentInput<Metadata extends Record<string, any> = Record<string, any>> {
  pageContent: string;
  metadata?: Metadata;
}

export class Document<T extends Record<string, any> = Record<string, any>> {
  pageContent: string;
  metadata?: T;
  constructor(fields: DocumentInput<T>) {
    this.pageContent = fields.pageContent ? fields.pageContent.toString() : '';
    this.metadata = fields.metadata;
  }
}
