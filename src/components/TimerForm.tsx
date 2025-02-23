import React from 'react';

interface TimerFormProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  hours: number;
  setHours: (value: number) => void;
  minutes: number;
  setMinutes: (value: number) => void;
  seconds: number;
  setSeconds: (value: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitText: string;
}

export const TimerForm: React.FC<TimerFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  hours,
  setHours,
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  onSubmit,
  onCancel,
  submitText,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
          className="border border-gray-300 outline-none rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 w-full px-3 py-2"
          placeholder="Enter timer title"
        />
        <p className="mt-1 text-sm text-gray-500">{title.length}/50 characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="border border-gray-300 rounded-md outline-none shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 w-full px-3 py-2"
          placeholder="Enter timer description (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Duration <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Hours</label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours || ''}
              onChange={(e) => setHours(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes || ''}
              onChange={(e) => setMinutes(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds || ''}
              onChange={(e) => setSeconds(Number(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-300 focus:border-gray-300 outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};
