import React from 'react';

const Highlighter = (rawTagName: any, props: any, ...children: any) => {
  if (rawTagName === 'mark')
    return (
      <mark className={'inline rounded-sm bg-primary/20 px-1 py-1 dark:bg-[#201f2f] dark:text-white'}>
        {children}
      </mark>
    );

  return React.createElement(rawTagName, props, ...children);
};

export default Highlighter;
