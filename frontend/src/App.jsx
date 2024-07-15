import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainDashboard from './components/MainDashboard';
import Header from './components/Header';
import GridDashboard from './components/GridDashboard';

function App() {
  const location = useLocation();

  const [spectData, setSpectData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [accelerationData, setAccelerationData] = useState([]);

  // if (accelerationData?.length > 0) {
  //   const signal = accelerationData[accelerationData.length - 1].signal;

  //   if (signal === 'LO') {
  //     setFlightStage({
  //       colour: '#a87403',
  //       stage: 'Lift off'
  //     });
  //   } else if (signal === 'uG') {
  //     setFlightStage({
  //       colour: '#006603',
  //       stage: 'Microgravity'
  //     });
  //   } else if (signal === "uG OFF") {
  //     setFlightStage({
  //       colour: "#660042",
  //       stage: "Re-entry"
  //     })
  //   }
  // }

  return (
    <>
      <Header
        spectData={spectData}
        setSpectData={setSpectData}
        setPressureData={setPressureData}
        setTempData={setTempData}
        setHumidityData={setHumidityData}
        setAccelerationData={setAccelerationData}
        // flightStage={flightStage}
        // setFlightStage={setFlightStage}
      />
      <Routes location={location}>
        <Route
          path='/'
          element={
            <MainDashboard
              spectData={spectData}
              tempData={tempData}
              humidityData={humidityData}
              pressureData={pressureData}
              accelerationData={accelerationData}
              // flightStage={flightStage}
            />
          }
        ></Route>
        <Route path='/grid' element={<GridDashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
