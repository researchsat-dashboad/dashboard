import { useState, useEffect } from 'react'
import SensorChart from './components/SensorChart'
import Navbar from './components/Navbar'
import FlightStageTab from './components/FlightStageTab'
import TimeTab from './components/TimeTab'
import EnvironmentSensorTab from './components/EnvironmentSensorTab'
import TelemetrySensorTab from './components/TelemetrySensorTab'

function App() {

  const [sensorData, setSensorData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const response = await fetch('http://localhost:4001/mission')
    const data = await response.json()
    console.log(data.sensor_data[0].spectroscopy)
    setSensorData(data.sensor_data[0].spectroscopy)
  }


  return (
    <>
      <Navbar />
      <div className="grid grid-cols-3 grid-rows-3 gap-2 border-black border-dashed border-2">
        <div className="col-start-1 col-span-2 row-span-3  h-[300px]">
          <div className="bg-gray-300">Image placeholder</div>
        </div>
        <div className="col-start-3 col-span-1 row-span-1 flex justify-center">
          <TimeTab />
        </div>
        <div className="col-start-3 col-span-1 row-span-1  flex justify-center">
          <FlightStageTab />
        </div>
        <div className="col-start-3 col-span-1 row-span-1 flex justify-center">
          <EnvironmentSensorTab />
        </div>
        <div className="col-start-3 col-span-1 row-span-1 flex justify-center">
          <TelemetrySensorTab />
        </div>
      </div>
      <SensorChart data={sensorData}/>
      <h1 className='p-4 text-pink-500'>Vite + React + Tailwindcss</h1>;
    </>
)
}

export default App;
