export default function TelemetrySensorTab({ teleSensor }) {
  if (!teleSensor) {
    return <div>Telemetry data loading</div>;
  }

  return (
    <div className='bg-white p-3 rounded-xl border-4 border-solid border-black w-[24rem] mt-2'>
      <div className='flex flex-row justify-between'>
        <p className='text-2xl pl-2'>X-axis</p>
        <p className='text-2xl pr-2'>{teleSensor.AXC.toFixed(6)}</p>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-2xl pl-2'>Y-axis</p>
        <p className='text-2xl pl-2'>{teleSensor.AXY.toFixed(6)}</p>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-2xl pl-2'>Z-axis</p>
        <p className='text-2xl pl-2'>{teleSensor.AXZ.toFixed(6)}</p>
      </div>
    </div>
  );
}
