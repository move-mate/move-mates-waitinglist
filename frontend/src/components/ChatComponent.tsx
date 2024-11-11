import React from 'react';
import { X } from 'lucide-react';

interface ChatComponentProps {
  onClose: () => void;
  isWaitlistOpen?: boolean;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ onClose, isWaitlistOpen }) => {
  return (
    <div className={`bg-white rounded-xl shadow-2xl overflow-hidden transition-opacity duration-300 ${
      isWaitlistOpen ? 'opacity-30 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Header */}
      <div className="bg-[#081427] p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/images/bot.png" 
            alt="Chat Assistant" 
            className="w-10 h-10 rounded-full border-2 border-[#FE6912]"
          />
          <span className="text-white font-semibold">MoveMates Assistant</span>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-[#FE6912] transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="h-[450px] md:h-[500px] overflow-y-auto p-4 bg-gray-50">
        <div className="flex gap-2 mb-4">
          <img 
            src="/assets/images/bot.png" 
            alt="Assistant" 
            className="w-8 h-8 rounded-full border-2 border-[#FE6912]"
          />
          <div className="bg-[#081427] text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
            <p className="mb-3">Hello! I'm here to help you. Please select your role:</p>
            
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="userRole" 
                  value="customer"
                  className="w-4 h-4 accent-[#FE6912]"
                />
                <span>I'm a mover</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="userRole" 
                  value="mover"
                  className="w-4 h-4 accent-[#FE6912]"
                />
                <span>I'm a business</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="userRole" 
                  value="business"
                  className="w-4 h-4 accent-[#FE6912]"
                />
                <span>I'm a driver</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Input Area */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE6912]"
          />
          <button className="bg-[#FE6912] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;