import BaseLayout from '../layout/BaseLayout';

function GridDashboard() {
  return (
    <BaseLayout>
      <div className='grid grid-cols-3 grid-rows-[30vh_30vh_30vh] w-full text-white text-[2.5rem]'>
        <div className='p-8 col-start-1 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 1</h1>
        </div>
        <div className='p-8 col-start-2 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 2</h1>
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 3</h1>
        </div>
        <div className='p-8 col-start-1 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 4</h1>
        </div>
        <div className='p-8 col-start-2 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 5</h1>
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 6</h1>
        </div>
        <div className='p-8 col-start-1 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 7</h1>
        </div>
        <div className='p-8 col-start-2 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 8</h1>
        </div>
        <div className='p-8 col-start-3 col-span-1 row-span-1 flex flex-col text-center border border-white'>
          <h1>Sensor 9</h1>
        </div>
      </div>
    </BaseLayout>
  );
}

export default GridDashboard;
