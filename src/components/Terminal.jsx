import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const Terminal = ({ onClose }) => {
  const [lines, setLines] = useState(['Welcome to SagarOS Terminal. Type `help` to begin.']);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  const handleCommand = (cmd) => {
    const lower = cmd.toLowerCase();
    switch (lower) {
      case 'help':
        return ['Available commands:', 'skills', 'projects', 'clear'];
      case 'skills':
        return ['- React', '- Node.js', '- Express', '- MongoDB', '- Tailwind'];
      case 'projects':
        return ['- Workout Tracker', '- Speech Transcription CLI', '- Retro Portfolio'];
      case 'clear':
        return [];
      default:
        return [`Command not recognized: ${cmd}`];
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const output = handleCommand(input);
    setLines((prev) =>
      input.toLowerCase() === 'clear'
        ? []
        : [...prev, `C:\\User\\Sagar> ${input}`, ...output]
    );
    setInput('');
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  return (
    <Rnd
      default={{ x: 150, y: 150, width: 500, height: 300 }}
      bounds="parent"
      className="border border-black shadow-md"
    >
      <div className="bg-black text-green-400 font-mono h-full flex flex-col text-sm">
        {/* Title bar */}
        <div className="flex justify-between items-center text-white bg-gray-900 px-2 py-1 text-xs">
          <span>Terminal</span>
          <button onClick={onClose} className="bg-red-600 w-5 h-5 text-center leading-none">×</button>
        </div>

        {/* Terminal output */}
        <div className="flex-1 overflow-auto px-2 py-1">
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* Input line */}
        <form onSubmit={onSubmit} className="flex items-center px-2 py-1 border-t border-gray-700">
          <span className="text-green-400 whitespace-nowrap mr-1">C:\User\Sagar&gt;</span>
          <input
            ref={inputRef}
            className="bg-black text-green-400 outline-none flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </Rnd>
  );
};

export default Terminal;
