import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group">
      <div className="cursor-help">{children}</div>
      <div className="absolute bottom-full mb-2 hidden group-hover:block">
        <div className="bg-food-brown text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Tooltip; 