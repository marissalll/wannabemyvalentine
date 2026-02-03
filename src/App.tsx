import './App.css';
import { useNavigate } from 'react-router-dom';
import Background from './components/Background';
import { negativeTexts, positiveTexts } from './buttonTexts';
import { useState, useEffect } from 'react';


function App() {
  const navigate = useNavigate();

  // No button
  const [size, setSize] = useState(1);
  const [textIndex, setTextIndex] = useState(0);
  const [noClicks, setNoClicks] = useState(0);
  const MAX_NO_CLICKS = 15;

  // Yes button
  const [yesClicks, setYesClicks] = useState(0);
  const [yesText, setYesText] = useState(0);

  // Handle No button click
  const handleNoClick = () => {
    setNoClicks((prev) => prev + 1);
    setSize((prev) => Math.max(0.4, prev - 0.05));
    setTextIndex((prev) => (prev + 1) % negativeTexts.length);
  };

  // Handle Yes button click

  useEffect(() => {
    if (yesClicks !== positiveTexts.length) return;

    alert('Yay good choice baby x');
    navigate('/yes');
  }, [yesClicks, navigate]);


  const handleYesClick = () => {
    setYesClicks((prev) => prev + 1);
    setYesText((prev) => (prev + 1) % positiveTexts.length);
  };


  return (
    <div className="max-w-screen h-screen overflow-hidden relative p-4 md:p-8 text-center">
      <Background />

      {/* Main container */}
      <div className="flex flex-col gap-12 md:gap-24 mt-24 md:mt-32 justify-center relative">

        {/* Animated star heading */}
        <h1 className="absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 text-2xl md:text-5xl font-bold text-pink-400 z-50 animate-fade-in">
          ✨Hannah✨
        </h1>

        {/* Main Valentine heading */}
        <h1 className="text-3xl md:text-6xl mb-8 md:mb-14 z-50 white-shadow">
          Will you be my Valentine?
        </h1>

        {/* Buttons container */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 xl:gap-32 z-50">

          {/* Yes button */}
          <button
            onClick={handleYesClick}
            className="inline-block bg-green-600 text-slate-100 border-2 border-solid border-green-800 px-6 py-3 md:px-12 md:py-6 text-center rounded-[20%] text-sm md:text-2xl mx-1 my-1 cursor-pointer hover:bg-green-800 duration-300 max-w-xs md:max-w-sm"
          >
            <b>{positiveTexts[yesText]}</b>
          </button>

          {/* No button */}
          {noClicks < MAX_NO_CLICKS && (
            <button
              onClick={handleNoClick}
              onMouseOver={() => setSize((s) => Math.max(0.4, s - 0.05))}
              onMouseOut={() => setSize((s) => Math.min(1, s + 0.05))}
              style={{
                transform: `scale(${size})`

              }}
              className="inline-block bg-red-600 text-slate-100 border-2 border-solid border-red-800 px-6 py-3 md:px-12 md:py-6 text-center rounded-[20%] text-sm md:text-2xl mx-1 my-1 cursor-pointer transition-all duration-300 max-w-xs md:max-w-sm"
            >
              {negativeTexts[textIndex]}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
