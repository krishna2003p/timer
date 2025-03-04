import { useState , useEffect} from 'react';
import { Plus, Clock } from 'lucide-react';
import { TimerList } from './components/TimerList';
import { AddTimerModal } from './components/AddTimerModal';
import { Toaster } from 'sonner';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [position, setPosition] = useState("top-right");

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 768) {
        setPosition("bottom-center"); // Show at bottom in mobile
      } else {
        setPosition("top-right"); // Show at top-right in desktop
      }
    };

    updatePosition(); // Set position on initial load
    window.addEventListener("resize", updatePosition);
    
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position={position} />
      <div className="container mx-auto px-4 py-8">
        <div className='flex justify-between items-center'>
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer</h1>
          </div>
          <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Timer
          </button>
          </div>
        </div>
        
        <div className="mt-5">
          <TimerList />
        </div>
        
        <AddTimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default Home;