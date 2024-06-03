export default function EnvironmentSensorTab({ envSensor }) {
  if (!envSensor) {
    return <div>Environment data loading</div>;
  }

  return (
    <div className='bg-white p-3 rounded-xl border-4 border-solid border-black w-[24rem] mt-2'>
      <div className='flex flex-row justify-between'>
        <p className='text-2xl pl-2'>Temp (C)</p>
        <p className='text-2xl pr-2'>{envSensor.temperature.toFixed(3)}</p>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-2xl pl-2'>Pressure (kPa)</p>
        <p className='text-2xl pl-2'>{envSensor.pressure.toFixed(3)}</p>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-2xl pl-2'>Humidity (%)</p>
        <p className='text-2xl pl-2'>{envSensor.humidity.toFixed(3)}</p>
      </div>
    </div>
  );
}
