export default function FlightStageTab({ flightStage }) {
  return (
    <div className='bg-white p-3 rounded-xl border-4 border-solid border-black mt-2 text-center flex justify-center flex-col w-[24rem]'>
      <p className='text-2xl mb-1'>Flight Stage:</p>
      <p className='text-3xl'>{flightStage}</p>
    </div>
  );
}
