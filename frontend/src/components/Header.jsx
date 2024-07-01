import { Navbar, NavbarContent, Image, Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';

export default function Header({ isLive, toggleLive, spectData }) {
  const [time, setTime] = useState('Loading...');

  useEffect(() => {
    if (spectData?.length > 0) {
      const latestDataPoint = new Date(spectData[spectData.length - 1].dateTime);
      const adelaideTime = latestDataPoint.toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne'
      });
      setTime(adelaideTime);
    }
  }, [spectData]);

  return (
    <Navbar
      maxWidth='full'
      className='max-w-full py-4 min-h-[120px] md:min-h-[80px] bg-rsBlue'
      height='auto'
    >
      <NavbarContent justify='center'>
        <Image
          src='/logo/rs-logo.png'
          alt='ResearchSat logo'
          className='w-full max-h-[50px] md:w-auto'
        />
      </NavbarContent>
      <NavbarContent justify='left'>
        <div className='flex flex-row items-center gap-6'>
          <span className='text-white text-l'>Latest data: {time}</span>
          {isLive ? (
            <Button variant='solid' color='primary' onClick={toggleLive}>
              <span className='relative flex h-8 w-8 mr-4 justify-center align-middle place-items-center'>
                <span className='animate-ping absolute h-full w-full rounded-full bg-white opacity-75'></span>
                <span className='relative inline-flex rounded-full h-4 w-4 bg-white'></span>
              </span>
              LIVE
            </Button>
          ) : (
            <Button variant='solid' color='primary' onClick={toggleLive}>
              Watch Live
            </Button>
          )}
        </div>
      </NavbarContent>
    </Navbar>
  );
}
