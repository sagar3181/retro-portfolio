import React, { useState } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import icon from '../assets/computer.png';
import terminalIcon from '../assets/terminal.png';
import folderIcon from '../assets/folder.png';
import Terminal from './Terminal';


const Desktop = () => {
  const [windows, setWindows] = useState({
    about: false,
    whoiam: false,
    tech: false,
    projects: false,
  });

  const openWindow = (key) => setWindows((w) => ({ ...w, [key]: true }));
  const closeWindow = (key) => setWindows((w) => ({ ...w, [key]: false }));

  return (
    <div className="w-screen h-screen bg-teal-800 font-pixel text-sm text-white relative overflow-hidden">
      {/* Desktop Icon */}
      <div
        className="absolute top-10 left-10 cursor-pointer text-center"
        onDoubleClick={() => openWindow('about')}
      >
        <img src={icon} alt="About" className="w-10 h-10 mx-auto" />
        <span>My Computer</span>
      </div>

      {/* About Me Window */}
      {windows.about && (
        <Window title="About Me" onClose={() => closeWindow('about')}>
          <div className="flex gap-4 p-2">
            {/* Folder Icons */}
            <div
              className="text-center cursor-pointer"
              onDoubleClick={() => openWindow('whoiam')}
            >
              <img src={folderIcon} alt="Who I Am" className="w-10 h-10 mx-auto" />
              <p>Who I Am</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onDoubleClick={() => openWindow('tech')}
            >
              <img src={folderIcon} alt="Tech Stack" className="w-10 h-10 mx-auto" />
              <p>Tech Stack</p>
            </div>
            <div
              className="text-center cursor-pointer"
              onDoubleClick={() => openWindow('projects')}
            >
              <img src={folderIcon} alt="Projects" className="w-10 h-10 mx-auto" />
              <p>Projects</p>
            </div>
          </div>
        </Window>
      )}

      {/* Who I Am Window */}
      {windows.whoiam && (
        <Window title="Who I Am" onClose={() => closeWindow('whoiam')}>
          <p>
            I'm Sagar, a full-stack developer focused on React, Node.js, and building nostalgic UI experiences.
          </p>
        </Window>
      )}

      {/* Tech Stack Window */}
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

      {/* Projects Window */}
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
        <Terminal
          onClose={() => closeWindow('terminal')}
          onCommandRequest={(key) => openWindow(key)}
        />
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

      {/* Terminal */}
      <div
      className="absolute top-32 left-10 cursor-pointer text-center"
      onDoubleClick={() => openWindow('terminal')}
      >
      <img src={terminalIcon} alt="Terminal" className="w-10 h-10 mx-auto" />
      <span>Terminal</span>
      </div>
    </div>
  );
};

export default Desktop;
