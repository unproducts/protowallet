import { Document } from '.';
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export class WebPDFLoader {
  private blob: Blob;

  constructor(blob: Blob) {
    this.blob = blob;
  }

  async load(): Promise<Document<Record<string, any>>[]> {
    const buffer = await this.blob.arrayBuffer();
    const metadata = { source: 'blob', blobType: this.blob.type };
    return this.parse(buffer, metadata);
  }

  async parse(raw: ArrayBuffer, metadata: Document<Record<string, any>>['metadata']): Promise<Document[]> {
    const text = await this._parse(raw);
    const document = new Document({
      metadata,
      pageContent: text,
    });
    return [document];
  }

  private async _parse(raw: ArrayBuffer): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const pdfDocLoadingTask = pdfjs.getDocument(raw);
        pdfDocLoadingTask.promise.then((pdfDocument) => {
          const pagesPromises = [];
          for (let i = 0; i < pdfDocument.numPages; i++) {
            pagesPromises.push(pdfDocument.getPage(i + 1));
          }
          Promise.all(pagesPromises).then((pages) => {
            const textPromises: Promise<any>[] = [];
            pages.forEach((page) => {
              textPromises.push(page.getTextContent());
            });
            Promise.all(textPromises).then((texts) => {
              let finalString = '';
              texts.forEach((text) => {
                // @ts-ignore
                text.items.forEach((item) => {
                  // @ts-ignore
                  finalString += item.str + ' ';
                });
              });
              resolve(finalString);
            });
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
