import React, { useState } from 'react';

export type AccordionProps = {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
};

function Accordion(props) {
  const [open, setOpen] = useState(props.show);

  return (
    <div className="rounded-sm px-2 py-1 border border-slate-200">
      <button className="flex items-center justify-between w-full group" aria-expanded={open} onClick={() => setOpen(!open)}>
        {props.title && (typeof props.title === 'string' ? <div className="text-sm text-slate-800 font-medium">{props.title}</div> : props.title)}
        <svg className={`w-8 h-8 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 ${open && 'rotate-180'}`} viewBox="0 0 32 32">
          <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <div className={`text-sm ${!open && 'hidden'}`}>{props.children}</div>
    </div>
  );
}

export default Accordion;
