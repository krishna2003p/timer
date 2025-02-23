import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Trash2, RotateCcw, Pencil } from 'lucide-react';
import { Timer } from '../types/timer';
import { formatTime } from '../utils/time';
import {  useTimerStore } from '../store/useTimerStore';
import { toast } from 'sonner';
import { EditTimerModal } from './EditTimerModal';
import { TimerAudio } from '../utils/audio';
import { TimerControls } from './TimerControls';
import { TimerProgress } from './TimerProgress';

interface TimerItemProps {
  timer: Timer;
}

export const TimerItem: React.FC<TimerItemProps> = ({ timer }) => {
  const { timers ,toggleTimer, deleteTimer, updateTimers, restartTimer } = useTimerStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerAudio = TimerAudio.getInstance();
  const hasEndedRef = useRef(false);
  const [isPlay, setIsPlay] = useState(false);

  

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlay) {
        timerAudio.play().catch(console.error);
      } 
    }, 1000); // Runs every 1 second
  
    return () => clearInterval(interval); // Cleanup when component unmounts
  }); // Empty dependency array ensures it runs continuously
  

  useEffect(() => {
    if (timer.isRunning) {
      // setIsPlay(true);

      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          updateTimers(timer.id);
        }, 1000);
      }
    } else {

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };


  }, [timer.isRunning, timer.id, updateTimers,timers]);

  useEffect(() => {
    if (timer.remainingTime <= 0 && isPlay) {
      hasEndedRef.current = true;

      toast.success(`Timer "${timer.title}" has ended!`, {
        duration: Infinity,
        action: {
          label: 'Dismiss',
          onClick: () => {
            setIsPlay(false);
          },
        },
      });

      clearInterval(intervalRef.current!);
    }
  }, [timer.remainingTime, timer.title, timerAudio]);

  const handleRestart = useCallback(() => {
    hasEndedRef.current = false;
    restartTimer(timer.id);
  }, [restartTimer, timer.id]);

  const handleDelete = useCallback(() => {
    timerAudio.stop();
    deleteTimer(timer.id);
  }, [deleteTimer, timer.id, timerAudio]);

  const handleToggle = useCallback(() => {
    if (timer.remainingTime <= 0) {
      alert("Hello");
      hasEndedRef.current = false;
    }
    toggleTimer(timer.id);
    let duration = timer.duration;
    setTimeout(() => {
      setIsPlay(true);
    }, duration*1000);

  }, [toggleTimer, timer.id, timer.remainingTime]);

  return (
    <>
      <div className="relative bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-102 overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
            <path
              d="M50 20V50L70 70"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{timer.title}</h3>
              <p className="text-gray-600 mt-1">{timer.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors"
                title="Edit Timer"
              >
                <Pencil className="w-5 h-5" />
              </button>
              <button
                onClick={handleRestart}
                className="p-2 rounded-full hover:bg-blue-50 text-blue-500 transition-colors"
                title="Restart Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                title="Delete Timer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center mt-6">
            <div className="text-4xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(timer.remainingTime)}
            </div>

            <TimerProgress progress={(timer.remainingTime / timer.duration) * 100} />

            <TimerControls
              isRunning={timer.isRunning}
              remainingTime={timer.remainingTime}
              duration={timer.duration}
              onToggle={handleToggle}
              onRestart={handleRestart}
            />
          </div>
        </div>
      </div>

      <EditTimerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        timer={timer}
      />
    </>
  );
};