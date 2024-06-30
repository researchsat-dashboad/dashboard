import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';

export default function Navbar({ isLive, setIsLive, spectData }) {
  const [time, setTime] = useState('Loading...');

  const toggleLive = () => {
    setIsLive((value) => !value);
  };

  useEffect(() => {
    if (spectData.length > 0) {
      const latestDataPoint = new Date(spectData[spectData.length - 1].dateTime)
        .toUTCString()
        .split('G')[0];
      setTime(latestDataPoint);
    }
  }, [spectData]);

  return (
    <div className='w-100vw bg-rsBlue relative'>
      <div className='flex justify-center'>
        <a href='https://www.researchsat.space/' target='_blank'>
          <img
            src='/logo/rs-logo.png'
            alt='ResearchSat logo'
            className='h-[30px] lg:h-[60px] my-2 lg:my-4 hover:scale-[1.05] transition-all duration-300 delay-100'
          />
        </a>

        {isLive ? (
          <Button onClick={toggleLive}>
            <span className='relative flex h-8 w-8 mr-4 justify-center align-middle place-items-center'>
              <span className='animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-4 w-4 bg-red-500'></span>
            </span>
            Live
          </Button>
        ) : (
          <Button onClick={toggleLive}>Watch Live</Button>
        )}
      </div>
      <div className='flex justify-end px-4 pb-2'>
        <p className='text-white text-[1rem]'>Latest data: {time}</p>
      </div>
    </div>
  );
}
