import { Button } from '@nextui-org/react';
import { FiZoomIn } from 'react-icons/fi';

const ChartContainer = ({ title, children, onZoom }) => {
  return (
    <>
      <div className='flex flex-row gap-3 justify-between items-center mb-6 px-7'>
        <h4 className='text-2xl text-white flex-grow text-left'>{title}</h4>
        {onZoom ? (
          <Button isIconOnly variant='solid' color='primary' onClick={onZoom}>
            <FiZoomIn className='w-6 h-6' />
          </Button>
        ) : null}
      </div>
      {children}
    </>
  );
};

export default ChartContainer;
