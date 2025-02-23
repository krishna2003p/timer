import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';
import { TimerForm } from './TimerForm';
import { Timer } from '../types/timer';

interface EditTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer: Timer;
}

export const EditTimerModal: React.FC<EditTimerModalProps> = ({ isOpen, onClose, timer }) => {
  const [title, setTitle] = useState(timer.title);
  const [description, setDescription] = useState(timer.description);
  const [hours, setHours] = useState(Math.floor(timer.duration / 3600));
  const [minutes, setMinutes] = useState(Math.floor((timer.duration % 3600) / 60));
  const [seconds, setSeconds] = useState(timer.duration % 60);

  const { editTimer } = useTimerStore();

  useEffect(() => {
    if (isOpen) {
      setTitle(timer.title);
      setDescription(timer.description);
      setHours(Math.floor(timer.duration / 3600));
      setMinutes(Math.floor((timer.duration % 3600) / 60));
      setSeconds(timer.duration % 60);
    }
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    editTimer(timer.id, {
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Edit Timer</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <TimerForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitText="Save Changes"
        />
      </div>
    </div>
  );
};
