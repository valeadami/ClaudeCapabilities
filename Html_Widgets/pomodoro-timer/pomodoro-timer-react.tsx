import React, { useState, useEffect, useCallback } from 'react';
import { Coffee, Plus, Minus, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TomatoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-24 h-24 text-red-500 animate-pulse"
  >
    <path
      d="M50 10 C30 10 10 30 10 50 C10 80 40 90 50 90 C60 90 90 80 90 50 C90 30 70 10 50 10"
      fill="currentColor"
    />
    <path
      d="M30 15 Q40 5 50 15 Q60 5 70 15"
      fill="none"
      stroke="#4CAF50"
      strokeWidth="4"
    />
  </svg>
);

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [minutes, setMinutes] = useState(workTime);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playSound = useCallback((frequency, duration) => {
    if (isMuted) return;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }, [isMuted]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setIsBreak(!isBreak);
          setMinutes(isBreak ? workTime : breakTime);
          setSeconds(0);
          playSound(880, 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, workTime, breakTime, playSound]);

  const toggleTimer = () => {
    if (!isActive) {
      playSound(440, 0.5);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(workTime);
    setSeconds(0);
    setIsBreak(false);
  };

  const adjustTime = (isWork, increment) => {
    if (isActive) return;
    const setter = isWork ? setWorkTime : setBreakTime;
    const currentValue = isWork ? workTime : breakTime;
    const newValue = Math.max(5, Math.min(60, currentValue + increment));
    setter(newValue);
    if ((isWork && !isBreak) || (!isWork && isBreak)) {
      setMinutes(newValue);
      setSeconds(0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const progress = ((isBreak ? breakTime : workTime) * 60 - (minutes * 60 + seconds)) / ((isBreak ? breakTime : workTime) * 60) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-500 to-yellow-500 p-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-96">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {isBreak ? 'Break Time!' : 'Pomodoro Timer'}
          </h1>
          <Button onClick={toggleMute} className="bg-gray-200 text-gray-700 p-2 rounded-full">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </Button>
        </div>
        <div className="flex justify-center mb-4">
          {isBreak ? (
            <Coffee className="w-24 h-24 text-blue-500 animate-bounce" />
          ) : (
            <TomatoIcon />
          )}
        </div>
        <div className="text-6xl font-bold text-center mb-4 text-gray-700">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <Progress value={progress} className="w-full mb-4" />
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-center mb-2">Work Time</p>
            <div className="flex items-center justify-center">
              <Button onClick={() => adjustTime(true, -5)} disabled={isActive} className="px-2 py-1 bg-gray-200 text-gray-700">
                <Minus size={16} />
              </Button>
              <span className="mx-2 text-xl">{workTime}</span>
              <Button onClick={() => adjustTime(true, 5)} disabled={isActive} className="px-2 py-1 bg-gray-200 text-gray-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
          <div>
            <p className="text-center mb-2">Break Time</p>
            <div className="flex items-center justify-center">
              <Button onClick={() => adjustTime(false, -5)} disabled={isActive} className="px-2 py-1 bg-gray-200 text-gray-700">
                <Minus size={16} />
              </Button>
              <span className="mx-2 text-xl">{breakTime}</span>
              <Button onClick={() => adjustTime(false, 5)} disabled={isActive} className="px-2 py-1 bg-gray-200 text-gray-700">
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Button onClick={toggleTimer} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={resetTimer} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
