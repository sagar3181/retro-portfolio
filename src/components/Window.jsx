import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import folderIcon from '../assets/folder.png';

const menuItems = {
  File: ['Open', 'Close', 'Properties'],
  Edit: ['Undo', 'Cut', 'Copy', 'Paste'],
  View: ['Large Icons', 'Details'],
  Go: ['Back', 'Forward', 'Up'],
  Favorites: ['Add to Favorites'],
  Tools: ['Options'],
  Help: ['About'],
};

const Window = ({ title, onClose }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [history, setHistory] = useState(['root']);
  const menuRef = useRef(null);

  const current = history[history.length - 1];

  const goBack = () => {
    if (history.length > 1) {
      setHistory((h) => h.slice(0, h.length - 1));
    }
  };

  const handleFolderClick = (folderName) => {
    setHistory((h) => [...h, folderName]);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Rnd
      default={{ x: 100, y: 100, width: 550, height: 400 }}
      bounds="parent"
      className="bg-[#c0c0c0] font-pixel text-xs border border-black shadow-md"
    >
      {/* Title Bar */}
      <div className="flex justify-between bg-[#000080] text-white px-2 py-1">
        <span>{title}</span>
        <button
          onClick={onClose}
          className="w-5 h-5 bg-[#c0c0c0] text-black text-[10px] leading-none border border-black hover:bg-red-600 hover:text-white"
        >
          ×
        </button>
      </div>

      {/* Menu Bar */}
      <div ref={menuRef} className="relative flex gap-3 bg-[#dcdcdc] px-2 py-1 border-b border-gray-500 text-black">
        {Object.keys(menuItems).map((menu) => (
          <div key={menu} className="relative">
            <button
              className={`hover:bg-blue-600 hover:text-white px-1 ${activeMenu === menu ? 'bg-blue-600 text-white' : ''}`}
              onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
            >
              {menu}
            </button>
            {activeMenu === menu && (
              <div className="absolute left-0 top-full w-32 bg-[#dcdcdc] border border-black z-50 shadow-lg">
                {menuItems[menu].map((item) => (
                  <div key={item} className="px-2 py-1 hover:bg-blue-600 hover:text-white cursor-default">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 bg-[#e0e0e0] px-2 py-1 border-b border-gray-500">
        <button
          className="border border-black px-1 bg-[#dcdcdc] text-[10px] text-black"
          onClick={goBack}
          disabled={history.length <= 1}
        >
          ←
        </button>
        <button className="border border-black px-1 bg-[#dcdcdc] text-[10px] text-black">→</button>
        <button className="border border-black px-1 bg-[#dcdcdc] text-[10px] text-black">↑</button>
        <button className="border border-black px-1 bg-[#dcdcdc] text-[10px] text-black">Folder</button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center bg-white px-2 py-1 border-b border-gray-500">
        <span className="text-gray-700 text-[10px]">Address</span>
        <input
          value={`C:\\AboutMe${history.slice(1).map(p => `\\${p.replaceAll(' ', '')}`).join('')}`}
          readOnly
          className="ml-2 bg-white border border-gray-400 text-[10px] px-1 w-full text-black"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap gap-4 p-4 bg-white h-full overflow-auto text-black">
        {current === 'root' && (
          <>
            <div className="flex flex-col items-center w-16 cursor-pointer" onDoubleClick={() => handleFolderClick('Who I Am')}>
              <img src={folderIcon} alt="Folder" className="w-8 h-8" />
              <span className="text-[10px] text-center mt-1">Who I Am</span>
            </div>
            <div className="flex flex-col items-center w-16 cursor-pointer" onDoubleClick={() => handleFolderClick('Tech Stack')}>
              <img src={folderIcon} alt="Folder" className="w-8 h-8" />
              <span className="text-[10px] text-center mt-1">Tech Stack</span>
            </div>
            <div className="flex flex-col items-center w-16 cursor-pointer" onDoubleClick={() => handleFolderClick('Projects')}>
              <img src={folderIcon} alt="Folder" className="w-8 h-8" />
              <span className="text-[10px] text-center mt-1">Projects</span>
            </div>
          </>
        )}

        {current === 'Who I Am' && (
          <p className="text-xs leading-relaxed">
            I'm Sagar, a full-stack developer focused on React, Node.js, and building nostalgic UI experiences.
          </p>
        )}
        {current === 'Tech Stack' && (
          <ul className="list-disc text-xs pl-4">
            <li>React, Next.js</li>
            <li>Node.js, Express</li>
            <li>MongoDB, PostgreSQL</li>
            <li>Tailwind CSS</li>
          </ul>
        )}
        {current === 'Projects' && (
          <ul className="list-disc text-xs pl-4">
            <li>Workout Tracker App</li>
            <li>Speech Transcription CLI</li>
            <li>This Retro Portfolio</li>
          </ul>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#dcdcdc] text-black border-t border-white px-2 py-1 text-[10px] flex justify-between">
        <span>{current === 'root' ? '3 object(s)' : '3 object(s)'}</span>
        <span>{title}</span>
      </div>
    </Rnd>
  );
};

export default Window;
