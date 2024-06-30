import { useState, useEffect } from 'react';
import BaseLayout from './layout/BaseLayout';
import Navbar from './components/Navbar';
import TemperatureChart from './components/TemperatureChart';
import SpectChart from './components/SpectChart';
import HumidityChart from './components/HumidityChart';
import PressureChart from './components/PressureChart';
import PressureChartFull from './components/PressureChartFull';
import HumidityChartFull from './components/HumidityChartFull';
import TemperatureChartFull from './components/TermperatureChartFull';
import SpectChartFull from './components/SpectChartFull';

function App() {
  const [spectData, setSpectData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(null);
  const [fullScreenChart, setFullScreenChart] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    getData();
  }, [isLive]);

  // Single API call for all data points, query limited to 50
  async function getData() {
    const response = await fetch('http://localhost:4001/mission/data?limit=50');
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

    setTempData(temperatureArr);
    setHumidityData(humidityArr);
    setPressureData(pressureArr);
    setSpectData(spectArr);
  }

  // Call individual API endpoints for full data set for sensor type, passed in as sensor 'name'
  async function getFullSensorData(name) {
    // console.log('Getting data triggered');
    const response = await fetch(`http://localhost:4001/mission/data/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    let dataArr = [];

    if (name === 'spect') {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        spectV: entry.spectV,
        spectB: entry.spectB,
        spectG: entry.spectG,
        spectY: entry.spectY,
        spectD: entry.spectD,
        spectR: entry.spectR
      }));
    } else {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        [name]: entry[name]
      }));
    }

    return dataArr;
  }

  // Expand chart to full screen onClick function
  async function handleChartClick(name) {
    // console.log('Chart clicked, expanding');
    try {
      const fetchedData = await getFullSensorData(name);

      switch (name) {
        case 'pressure':
          setFullScreenChart(() => <PressureChartFull pressureData={fetchedData} />);
          break;
        case 'humidity':
          setFullScreenChart(() => <HumidityChartFull humidityData={fetchedData} />);
          break;
        case 'temperature':
          setFullScreenChart(() => <TemperatureChartFull temperatureData={fetchedData} />);
          break;
        case 'spect':
          setFullScreenChart(() => <SpectChartFull spectData={fetchedData} />);
          break;
      }

      setIsFullScreen(true);
    } catch (err) {
      alert('Error fetching data; please try again');
      return;
    }
  }

  function exitFullScreen() {
    setIsFullScreen(false);
    setFullScreenChart(null);
  }

  return (
    <BaseLayout>
      <div className='grid grid-cols-3 grid-rows-[30vh_30vh_30vh] gap-2  w-full'>
        <div className='h-[300px]'>
          <div className='bg-gray-300 text-[2rem]'>Image placeholder</div>
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <PressureChart
            pressureData={pressureData}
            dataPoints={20}
            handleChartClick={handleChartClick}
          />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <HumidityChart humidityData={humidityData} handleChartClick={handleChartClick} />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <TemperatureChart tempData={tempData} handleChartClick={handleChartClick} />
        </div>
        <div className='col-start-1 col-span-2 row-span-2 row-start-3 flex flex-col text-center'>
          <SpectChart spectData={spectData} handleChartClick={handleChartClick} />
        </div>
      </div>
    </BaseLayout>
  );
}

export default App;
