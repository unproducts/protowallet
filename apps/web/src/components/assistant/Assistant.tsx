import React from 'react';
import { fileToDataUri } from '../../utils/Utils';
import { features } from '@protowallet/llm';

const AssistantPage = () => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) return;
    const file = e.target.files[0];
    console.log(file);
    const dataURI = await fileToDataUri(file);
    features.extractTransactions(dataURI, "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");

  };
  return (
    <div className="mx-auto flex max-w-screen-sm justify-center w-full">
      <div className="h-1/4 w-full rounded-md bg-gradient-to-r from-logoPink via-primary-500 to-logoBlue p-0.5">
        <div className="h-full w-full rounded-md bg-white p-2">
            <div className="text-sm font-semibold text-slate-800 mb-2">Import Transactions FROM ANYWHERE</div>
            <form className="rounded bg-slate-100 border border-dashed border-slate-300 text-center px-5 py-8">
              <svg className="inline-flex w-4 h-4 fill-slate-400 mb-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4c-.3 0-.5.1-.7.3L1.6 10 3 11.4l4-4V16h2V7.4l4 4 1.4-1.4-5.7-5.7C8.5 4.1 8.3 4 8 4ZM1 2h14V0H1v2Z" />
              </svg>
              <label htmlFor="upload" className="block text-sm text-slate-500 italic">
                Attach PDF file.
              </label>
              <input className="sr-only" id="upload" type="file" onChange={handleFileUpload} />
            </form>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
