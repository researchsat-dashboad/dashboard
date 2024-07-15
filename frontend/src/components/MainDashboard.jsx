import { useState } from 'react';
import { useDisclosure, Modal, ModalBody, ModalContent } from '@nextui-org/react';
import BaseLayout from '../layout/BaseLayout';
import TemperatureChart from './charts/TemperatureChart';
import SpectChart from './charts/SpectChart';
import HumidityChart from './charts/HumidityChart';
import PressureChart from './charts/PressureChart';
import PressureChartFull from './charts/PressureChartFull';
import HumidityChartFull from './charts/HumidityChartFull';
import TemperatureChartFull from './charts/TermperatureChartFull';
import SpectChartFull from './charts/SpectChartFull';
import AccelerationChart from './charts/AccelerationChart';
import AccelerationChartFull from './charts/AccelerationChartFull';

export default function MainDashboard({
  spectData,
  tempData,
  humidityData,
  pressureData,
  accelerationData
}) {
  const [activeData, setActiveData] = useState([]);
  const [currentActiveChart, setCurrentActiveChart] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setCurrentActiveChart(null);

      setActiveData([]);
    }
  });

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
    } else if (name === 'acceleration') {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        acx: entry.acx,
        acy: entry.acy,
        acz: entry.acz,
        signal: entry.signal
      }));
    } else {
      dataArr = await data.map((entry) => ({
        dateTime: entry.dateTime,
        [name]: entry[name]
      }));
    }

    setActiveData(dataArr);
  }

  // Expand chart to full screen onClick function
  function renderActiveChart() {
    switch (currentActiveChart) {
      case 'pressure':
        return <PressureChartFull pressureData={activeData} />;

      case 'humidity':
        return <HumidityChartFull humidityData={activeData} />;

      case 'temperature':
        return <TemperatureChartFull temperatureData={activeData} />;

      case 'spect':
        return <SpectChartFull spectData={activeData} />;

      case 'acceleration':
        return <AccelerationChartFull accelerationData={activeData} />;
    }
  }

  const onSelectActiveChart = (chartName) => async () => {
    setCurrentActiveChart(chartName);

    await getFullSensorData(chartName);

    onOpen();
  };

  return (
    <BaseLayout>
      <div className='grid grid-cols-3 grid-rows-[30vh_30vh_30vh] w-full'>
        <div className='col-start-1 col-span-2'>
          <div className='flex justify-center'>
            <img src='stitchedImage.jpg' className='w-[60vh]' />
          </div>
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border-l-1 border-white'>
          <PressureChart
            pressureData={pressureData}
            dataPoints={20}
            handleChartClick={onSelectActiveChart}
          />
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border-t-1 border-l-1 border-white'>
          <HumidityChart humidityData={humidityData} handleChartClick={onSelectActiveChart} />
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border-t-1 border-l-1 border-white'>
          <TemperatureChart tempData={tempData} handleChartClick={onSelectActiveChart} />
        </div>
        <div className='p-8 col-start-1 col-span-1 row-span-2 row-start-3 flex flex-col text-center border-t-1 border-white'>
          <SpectChart spectData={spectData} handleChartClick={onSelectActiveChart} />
        </div>
        <div className='p-6 col-start-2 col-span-1 row-span-2 row-start-3 flex flex-col text-center border-t-1 border-l-1 border-white'>
          <AccelerationChart
            accelerationData={accelerationData}
            handleChartClick={onSelectActiveChart}
            // flightStage={flightStage}
          />
        </div>
      </div>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalContent className='bg-background p-8'>
          {() => <ModalBody>{renderActiveChart()}</ModalBody>}
        </ModalContent>
      </Modal>
    </BaseLayout>
  );
}
