import React, { useState } from 'react';
import { Mic, MicOff, X, Volume2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useWorkNest } from '../../context/WorkNestContext';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceResult: (text: string, detectedService?: string) => void;
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onVoiceResult
}) => {
  const { language } = useWorkNest();
  const [isListening, setIsListening] = useState(true);
  const [recognizedText, setRecognizedText] = useState('');

  if (!isOpen) return null;

  const samplePrompts = [
    {
      lang: 'मराठी (Nashik Local)',
      text: 'माझ्या स्वयंपाकघरातील नळ खूप गळत आहे, पाणी वाया जात आहे.',
      category: 'plumbing'
    },
    {
      lang: 'मराठी (Nashik Local)',
      text: 'हॉलमधील फॅन चालू केल्यावर स्पार्किंग होत आहे आणि खटका गरम होतो.',
      category: 'electrician'
    },
    {
      lang: 'हिंदी',
      text: 'गीजर चालू करते ही मेन MCB ट्रिप हो रही है, वायरिंग चेक करवानी है.',
      category: 'electrician'
    },
    {
      lang: 'English',
      text: 'Need 3BHK deep cleaning before housewarming puja this weekend.',
      category: 'cleaning'
    }
  ];

  const handleSelectSample = (prompt: typeof samplePrompts[0]) => {
    setRecognizedText(prompt.text);
    setIsListening(false);
    setTimeout(() => {
      onVoiceResult(prompt.text, prompt.category);
      onClose();
    }, 800);
  };

  const handleManualDone = () => {
    if (recognizedText) {
      onVoiceResult(recognizedText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200/80 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-coop-100 rounded-full blur-3xl opacity-40 -mr-20 -mt-20 pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-coop-100 text-coop-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-coop-700" />
            <span>Voice-First AI Input (Marathi / Hindi / English)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {isListening ? 'Listening in Nashik Dialect...' : 'Captured Voice Note'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Speak naturally in your mother tongue. Our model detects the service and problem accurately.
          </p>
        </div>

        {/* Animated Microphone / Sound Wave Visualizer */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative mb-6">
            {isListening && (
              <>
                <span className="absolute -inset-4 rounded-full bg-coop-500/20 animate-ping duration-1000" />
                <span className="absolute -inset-8 rounded-full bg-coop-500/10 animate-pulse duration-700" />
              </>
            )}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 ${
                isListening ? 'bg-gradient-to-br from-coop-600 to-coop-800 scale-105' : 'bg-slate-500'
              }`}
            >
              {isListening ? <Mic className="w-9 h-9 animate-pulse" /> : <MicOff className="w-9 h-9" />}
            </button>
          </div>

          {/* Sound wave bars */}
          {isListening && (
            <div className="flex items-center space-x-1.5 h-8">
              {[40, 75, 90, 60, 100, 45, 80, 65, 95, 50, 85, 30].map((height, i) => (
                <div
                  key={i}
                  style={{
                    height: `${height}%`,
                    animationDelay: `${i * 0.08}s`
                  }}
                  className="w-1 bg-coop-600 rounded-full animate-pulse"
                />
              ))}
            </div>
          )}
        </div>

        {/* Recognized Preview Text or Quick Simulation Prompts */}
        <div className="space-y-3 mb-6">
          {recognizedText ? (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl">
              <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                Detected Voice Input:
              </span>
              <p className="text-sm font-medium text-emerald-950 italic">
                "{recognizedText}"
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                <span>Or click to test a sample voice note:</span>
                <span className="text-[10px] text-coop-700 font-bold">Try one-click ⬇</span>
              </p>
              <div className="space-y-2">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSample(prompt)}
                    className="w-full text-left p-2.5 rounded-xl border border-slate-200 hover:border-coop-400 hover:bg-coop-50/50 transition flex items-center justify-between group text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">
                        {prompt.lang}
                      </span>
                      <span className="text-slate-800 font-medium group-hover:text-coop-900">
                        "{prompt.text}"
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-coop-700 group-hover:translate-x-1 transition shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          {recognizedText && (
            <button
              onClick={handleManualDone}
              className="px-5 py-2 bg-coop-700 hover:bg-coop-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>Use This Voice Note</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
