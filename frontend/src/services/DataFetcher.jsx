import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import axios from 'axios';

const DataFetcher = ({
  setSpectData,
  setTempData,
  setHumidityData,
  setPressureData,
  setAccelerationData
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const fetchData = async () => {
    try {
      await axios.get('http://localhost:4001/process-data', {
        headers: { 'Content-Type': 'application/json' }
      });

      const response = await fetch('http://localhost:4001/mission/data?limit=50', {
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      const temperatureArr = data.map((entry) => ({
        dateTime: entry.dateTime,
        temperature: entry.temperature
      }));

      const humidityArr = data.map((entry) => ({
        dateTime: entry.dateTime,
        humidity: entry.humidity
      }));

      const pressureArr = data.map((entry) => ({
        dateTime: entry.dateTime,
        pressure: entry.pressure
      }));

      const spectArr = data.map((entry) => ({
        dateTime: entry.dateTime,
        spectV: entry.spectV,
        spectB: entry.spectB,
        spectG: entry.spectG,
        spectY: entry.spectY,
        spectD: entry.spectD,
        spectR: entry.spectR
      }));

      const accelerationArr = data.map((entry) => ({
        dateTime: entry.dateTime,
        acx: entry.acx,
        acy: entry.acy,
        acz: entry.acz,
        signal: entry.signal
      }));

      setTempData(temperatureArr);
      setHumidityData(humidityArr);
      setPressureData(pressureArr);
      setSpectData(spectArr);
      setAccelerationData(accelerationArr);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }
  };

  const startFetching = () => {
    if (!intervalId) {
      fetchData(); // Fetch data immediately when starting
      const id = setInterval(fetchData, 30 * 60 * 1000); // Fetch data every 30 minutes
      setIntervalId(id);
      setIsFetching(true);
    }
  };

  const stopFetching = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsFetching(false);
    }
  };

  const toggleFetching = () => {
    if (isFetching) {
      stopFetching();
    } else {
      startFetching();
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup interval on component unmount
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div>
      {isFetching ? (
        <Button variant='solid' color='primary' onClick={toggleFetching}>
          <span className='relative flex h-8 w-8 mr-4 justify-center align-middle place-items-center'>
            <span className='animate-ping absolute h-full w-full rounded-full bg-white opacity-75'></span>
            <span className='relative inline-flex rounded-full h-4 w-4 bg-white'></span>
          </span>
          LIVE
        </Button>
      ) : (
        <Button variant='solid' color='primary' onClick={toggleFetching}>
          Watch Live
        </Button>
      )}
    </div>
  );
};

export default DataFetcher;
