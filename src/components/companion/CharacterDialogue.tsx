import React from 'react';
import { X } from 'lucide-react';

interface CharacterDialogueProps {
  message: string;
  emoji?: string;
  visible: boolean;
  onClose?: () => void;
  position?: 'left' | 'right';
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  message,
  emoji = '✨',
  visible,
  onClose,
  position = 'left',
}) => {
  if (!visible) return null;

  return (
    <div
      className={`absolute bottom-full mb-3 z-30 transition-all duration-300 pointer-events-auto select-none ${
        position === 'left' ? 'right-0 sm:right-full sm:mr-3' : 'left-0 sm:left-full sm:ml-3'
      }`}
      style={{
        animation: 'popIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      }}
    >
      <div className="relative max-w-[210px] sm:max-w-[240px] px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-md border border-emerald-500/30 dark:border-emerald-500/30 shadow-xl shadow-emerald-500/10 text-xs text-[#18181b] dark:text-[#f4f4f5] font-medium leading-snug">
        <div className="flex items-start gap-2">
          <span className="text-base shrink-0 select-none animate-bounce">{emoji}</span>
          <p className="flex-1 text-[11px] sm:text-xs text-[#27272a] dark:text-[#e4e4e7] pr-3 font-sans">
            {message}
          </p>
          {onClose && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-[#a1a1aa] hover:text-[#18181b] dark:hover:text-white p-0.5 rounded-full transition-colors"
              aria-label="Close dialogue"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Speech Bubble Arrow Tail */}
        <div
          className={`absolute top-full w-0 h-0 border-solid border-t-8 border-t-white/95 dark:border-t-[#18181b]/95 border-x-8 border-x-transparent border-b-0 ${
            position === 'left' ? 'right-8' : 'left-8'
          }`}
        />
      </div>
    </div>
  );
};
