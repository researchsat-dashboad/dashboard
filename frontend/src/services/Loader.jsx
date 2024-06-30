import { helix } from 'ldrs';

helix.register();

const Loader = ({ size = '75', speed = '2.5', color = 'white' }) => {
  return (
    <div className='flex flex-col justify-center align-middle place-items-center h-[100%] w-[100%]'>
      <l-helix size={size} speed={speed} color={color}></l-helix>
      <p className='pt-4 text-[1.5rem] text-white'>Loading...</p>
    </div>
  );
};

export default Loader;
