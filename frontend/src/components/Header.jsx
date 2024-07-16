import { Navbar, NavbarContent, Image } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataFetcher from '../services/DataFetcher';

export default function Header({
  spectData,
  setSpectData,
  setTempData,
  setHumidityData,
  setPressureData,
  setAccelerationData
}) {
  const [time, setTime] = useState('Loading...');
  const [flightStage, setFlightStage] = useState('');
  const [stageStyle, setStageStyle] = useState({
    colour: '',
    stage: 'Loading...'
  });

  useEffect(() => {
    if (spectData?.length > 0) {
      const latestDataPoint = new Date(spectData[spectData.length - 1].dateTime);
      const timezone = latestDataPoint.toLocaleString('en-AU', {
        timeZone: 'Australia/Melbourne'
      });
      setTime(timezone);
    }
  }, [spectData]);

  useEffect(() => {
    if (flightStage === 'LO') {
      setStageStyle({
        colour: '#a16e00',
        stage: 'Lift Off'
      });
    } else if (flightStage === 'uG') {
      setStageStyle({
        colour: '#257d00',
        stage: 'Microgravity'
      });
    } else if (flightStage === 'uG OFF') {
      setStageStyle({
        colour: '#a10025',
        stage: 'Re-entry'
      });
    }
  }, [flightStage]);

  return (
    <Navbar
      maxWidth='full'
      className='max-w-full py-4 min-h-[120px] md:min-h-[80px] bg-rsBlue'
      height='auto'
    >
      <NavbarContent justify='center'>
        <Link to='/'>
          <Image
            src='/logo/rs-logo.png'
            alt='ResearchSat logo'
            className='w-full max-h-[50px] md:w-auto'
          />
        </Link>
      </NavbarContent>
      <div className='flex text-white w-auto'>
        <NavbarContent>
          <Link to='/'>
            <p className='bg-gray-600 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-500 delay-50'>
              Main dashboard
            </p>
          </Link>
          <Link to='/grid'>
            <p className='bg-gray-600 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-500 delay-50'>
              Grid dashboard
            </p>
          </Link>
        </NavbarContent>
      </div>
      <NavbarContent justify='left'>
        <p
          className='text-white px-8 py-2 rounded-xl w-[300px] text-center'
          style={{ backgroundColor: stageStyle.colour }}
        >
          Flight Stage: {stageStyle.stage}
        </p>
        <div className='flex flex-row items-center gap-6'>
          <span className='text-white text-l'>Latest data: {time}</span>
          <DataFetcher
            setSpectData={setSpectData}
            setTempData={setTempData}
            setHumidityData={setHumidityData}
            setPressureData={setPressureData}
            setAccelerationData={setAccelerationData}
            setFlightStage={setFlightStage}
          />
        </div>
      </NavbarContent>
    </Navbar>
  );
}
