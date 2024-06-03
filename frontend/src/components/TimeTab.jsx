import { useState } from 'react';

export default function TimeTab() {
  const [time, setTime] = useState('Loading...');

  function getTime() {
    let time = new Date();

    let formattedTime = time.toLocaleString('en-us', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });

    setTime(formattedTime);
  }

  setInterval(getTime, 1000);

  return (
    <div className='bg-white p-3 rounded-xl border-4 border-solid border-black text-center flex justify-center flex-col w-[24rem]'>
      <p className='text-2xl mb-1'>Local Time:</p>
      <p className='text-3xl'>{time}</p>
    </div>
  );
}
