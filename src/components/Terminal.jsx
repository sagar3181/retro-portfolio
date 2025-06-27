import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';

const Terminal = ({ onClose, onCommandRequest }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef();

  // Load history and previous lines
  useEffect(() => {
    const savedLines = JSON.parse(localStorage.getItem('terminal_lines')) || [
      'Welcome to SagarOS Terminal. Type `help` to begin.'
    ];
    const savedHistory = JSON.parse(localStorage.getItem('terminal_history')) || [];
    setLines(savedLines);
    setHistory(savedHistory);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('terminal_lines', JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    localStorage.setItem('terminal_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  const handleCommand = (cmd) => {
    const lower = cmd.toLowerCase().trim();

    if (lower === 'clear') return [];

    switch (lower) {
      case 'help':
        return [
          'Available commands:',
          '- help: Show available commands',
          '- about: Show info about me',
          '- skills: List technologies I use',
          '- projects: List key projects',
          '- open projects: Open Projects window',
          '- open tech: Open Tech Stack window',
          '- open whoiam: Open Who I Am window',
          '- clear: Clear the terminal screen',
        ];
      case 'about':
        return [
          "I'm Sagar, a full-stack developer passionate about React, Node, and nostalgic UIs!",
        ];
      case 'skills':
        return ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'];
      case 'projects':
        return ['- Workout Tracker', '- Retro Portfolio', '- Speech Transcription CLI'];
      default:
        if (lower.startsWith('open ')) {
          const windowKey = lower.replace('open ', '');
          if (['tech', 'projects', 'whoiam'].includes(windowKey)) {
            return [`[Opening ${windowKey} window...]`];
          }
        }
        return [`Command not recognized: ${cmd}. Try 'help'.`];
    }
  };

  const typeOut = (messages) => {
    let i = 0;
    const addNext = () => {
      if (i < messages.length) {
        setLines((prev) => [...prev, messages[i]]);
        i++;
        setTimeout(addNext, 30); // Typing speed
      }
    };
    addNext();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    const lower = cmd.toLowerCase();

    if (!cmd) return;

    const output = handleCommand(cmd);

    if (lower.startsWith('open ')) {
      const windowKey = lower.replace('open ', '');
      onCommandRequest?.(windowKey);
    }

    setLines((prev) => [...prev, `C:\\User\\Sagar> ${cmd}`]);
    setInput('');
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (lower === 'clear') {
      setLines([]);
    } else {
      typeOut(output);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setHistoryIndex((i) => {
        const newIndex = i === -1 ? history.length - 1 : Math.max(i - 1, 0);
        setInput(history[newIndex] || '');
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      setHistoryIndex((i) => {
        const newIndex = Math.min(i + 1, history.length);
        setInput(history[newIndex] || '');
        return newIndex;
      });
    }
  };

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

        {/* Output */}
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
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </form>
      </div>
    </Rnd>
  );
};

export default Terminal;
