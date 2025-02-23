import React, { useState, useEffect } from 'react';
import { X, PlusCircle } from 'lucide-react';
import { useTimerStore } from '../store/useTimerStore';
import { TimerForm } from './TimerForm';
import { validateTimerForm } from '../utils/validation';

interface AddTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTimerModal: React.FC<AddTimerModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const { addTimer } = useTimerStore();

  // ✅ Reset form when the modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateTimerForm({ title, description, hours, minutes, seconds });
    
    if (!isValid) {
      // setErrors('Please correct the errors before submitting.');
      return;
    }
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    addTimer({
      title: title.trim(),
      description: description.trim(),
      duration: totalSeconds,
      remainingTime: totalSeconds, // Default remaining time
      isRunning: false, // Timer should start as paused
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold">Add Timer</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
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
          submitText="Add Timer"
        />
      </div>
    </div>
  );
};
