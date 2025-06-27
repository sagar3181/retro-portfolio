import React from 'react';
import startIcon from '../assets/start.png'; // download a Win98-style start icon

const Taskbar = ({ activeWindowTitle }) => {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed bottom-0 left-0 w-full h-7 bg-[#c0c0c0] border-t border-l border-white shadow-inner flex items-center justify-between px-1 font-pixel text-xs z-50">
      
      {/* Start Button */}
      <button className="flex items-center gap-1 bg-[#dcdcdc] px-2 py-0.5 border border-t-white border-l-white border-b-gray-600 border-r-gray-600 shadow-[inset_1px_1px_0px_white]">
        <img src={startIcon} alt="Start" className="w-4 h-4" />
        <span className="mt-[1px]">Start</span>
      </button>

      {/* Active Window Title */}
      <div className="flex-1 text-center text-black">
        {activeWindowTitle || 'Ready'}
      </div>

      {/* Clock */}
      <div className="bg-[#dcdcdc] border border-t-white border-l-white border-b-gray-600 border-r-gray-600 px-2 py-0.5 text-black shadow-[inset_1px_1px_0px_white]">
        {time}
      </div>
    </div>
  );
};

export default Taskbar;
