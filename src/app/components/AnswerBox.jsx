import { useState, useEffect } from 'react';

const AnsweBox = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const typingSpeed = 77;
  
    useEffect(() => {
        let index = 0;
        let lastTime = 0;
    
        const type = (time) => {
          if (time - lastTime >= typingSpeed) {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            lastTime = time;
          }
    
          if (index < text.length) {
            requestAnimationFrame(type);
          }
        };
    
        setDisplayedText(''); // Reset text when a new response is passed
        requestAnimationFrame(type);
    
        return () => cancelAnimationFrame(type);
      }, [text]);

  return ( <div className=" w-full h-full p-4  duration-150 border rounded hover:border-zinc-100/80 border-zinc-600 focus-within:border-zinc-100/80 focus-within:ring-0 ">
    Answer Generated:  {displayedText}
    </div>);  // '|' simulates the cursor
};

export default AnsweBox;
