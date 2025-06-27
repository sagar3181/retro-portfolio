import React, { useState } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import icon from '../assets/computer.png';
import terminalIcon from '../assets/terminal.png';
import folderIcon from '../assets/folder.png';
import wallpaper from '../assets/wallpaper.jpg';
import Terminal from './Terminal';

const Desktop = () => {
  const [windows, setWindows] = useState({
    about: false,
    whoiam: false,
    tech: false,
    projects: false,
    terminal: false
  });

  const openWindow = (key) => setWindows((w) => ({ ...w, [key]: true }));
  const closeWindow = (key) => setWindows((w) => ({ ...w, [key]: false }));

  const icons = [
    {
      key: 'about',
      label: 'My Computer',
      icon: icon
    },
    {
      key: 'terminal',
      label: 'Terminal',
      icon: terminalIcon
    }
  ];

  return (
    <div
      className="w-screen h-screen bg-cover bg-center font-pixel text-sm text-white relative overflow-hidden"
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {/* Grid of desktop icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-y-4">
        {icons.map(({ key, label, icon }) => (
          <div
            key={key}
            onDoubleClick={() => openWindow(key)}
            className="w-20 text-center cursor-pointer select-none"
          >
            <img src={icon} alt={label} className="w-10 h-10 mx-auto drop-shadow-[1px_1px_0_rgba(0,0,0,1)]" />
            <span className="text-white text-xs drop-shadow-[1px_1px_0_rgba(0,0,0,1)] leading-tight block mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.about && (
        <Window title="About Me" onClose={() => closeWindow('about')}>
          <div className="flex gap-4 p-2">
            <div className="text-center cursor-pointer" onDoubleClick={() => openWindow('whoiam')}>
              <img src={folderIcon} alt="Who I Am" className="w-10 h-10 mx-auto" />
              <p>Who I Am</p>
            </div>
            <div className="text-center cursor-pointer" onDoubleClick={() => openWindow('tech')}>
              <img src={folderIcon} alt="Tech Stack" className="w-10 h-10 mx-auto" />
              <p>Tech Stack</p>
            </div>
            <div className="text-center cursor-pointer" onDoubleClick={() => openWindow('projects')}>
              <img src={folderIcon} alt="Projects" className="w-10 h-10 mx-auto" />
              <p>Projects</p>
            </div>
          </div>
        </Window>
      )}

      {windows.whoiam && (
        <Window title="Who I Am" onClose={() => closeWindow('whoiam')}>
          <p>I'm Sagar, a full-stack developer focused on React, Node.js, and building nostalgic UI experiences.</p>
        </Window>
      )}

      {windows.tech && (
        <Window title="Tech Stack" onClose={() => closeWindow('tech')}>
          <ul className="list-disc pl-4">
            <li>React, Next.js</li>
            <li>Node.js, Express</li>
            <li>MongoDB, PostgreSQL</li>
            <li>Tailwind CSS</li>
          </ul>
        </Window>
      )}

      {windows.projects && (
        <Window title="Projects" onClose={() => closeWindow('projects')}>
          <ul className="list-disc pl-4">
            <li>Workout Tracker App</li>
            <li>Speech Transcription CLI</li>
            <li>This Retro Portfolio</li>
          </ul>
        </Window>
      )}

      {windows.terminal && (
        <Terminal onClose={() => closeWindow('terminal')} onCommandRequest={(key) => openWindow(key)} />
      )}

      {/* Taskbar */}
      <Taskbar
        activeWindowTitle={
          windows.whoiam
            ? 'Who I Am'
            : windows.tech
            ? 'Tech Stack'
            : windows.projects
            ? 'Projects'
            : windows.about
            ? 'About Me'
            : ''
        }
      />
    </div>
  );
};

export default Desktop;
