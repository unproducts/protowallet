import ModalBasic from '../shared/ModalBasic';
import React, { useState } from 'react';
import RecurringTransactionForm from './recurringTransactionForm';

export default function RecurringTransactionModal() {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  return (
    <div>
      {/* Send Feedback */}
      <div className="m-1.5">
        {/* Start */}
        <button
          className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
          aria-controls="feedback-modal"
          onClick={(e) => {
            e.stopPropagation();
            setFeedbackModalOpen(true);
          }}
        >
          <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">New Recurring Transaction</span>{' '}
        </button>
        <ModalBasic id="feedback-modal" modalOpen={feedbackModalOpen} setModalOpen={setFeedbackModalOpen} title="Send Feedback">
          {/* Modal content */}
          <RecurringTransactionForm />
          {/* Modal footer */}
          <div className="px-5 py-4 border-t border-slate-200">
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeedbackModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Send</button>
            </div>
          </div>
        </ModalBasic>
        {/* End */}
      </div>
    </div>
  );
}
