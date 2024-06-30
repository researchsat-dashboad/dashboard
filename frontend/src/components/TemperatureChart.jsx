import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer
} from 'recharts';
import formatDateTick from '../services/formatDateTick';
import Loader from '../services/Loader';

export default function TemperatureChart({ tempData, handleChartClick }) {
  const data = tempData.slice(-20);

  // Custom tooltip formatter (optional, for better formatting)
  const CustomTooltip = ({ active, payload, label }) => {
    let time;
    if (label) {
      const utcDate = new Date(label);
      const timeString = String(utcDate);
      const timeOnly = timeString.split(' ');
      time = timeOnly[4];
    }

    if (active && payload && payload.length) {
      return (
        <div
          className='custom-tooltip'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            border: '1px solid #ccc'
          }}
        >
          <p className='label'>{`Time: ${time}`}</p>
          <p className='data'>{`Temperature: ${payload[0].value.toFixed(2)}°C`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className='relative'>
        <h3 className='text-white text-[1.5rem] my-2'>Temperature/Time Graph</h3>
        <img
          src='expand-icon.svg'
          className='h-[25px] px-2 cursor-pointer absolute right-[10px] top-[15px]'
          onClick={() => handleChartClick('temperature')}
        />
      </div>
      {tempData.length == 0 ? (
        <Loader />
      ) : (
        <ResponsiveContainer width='100%' height='90%'>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
            <XAxis
              dataKey='dateTime'
              tickFormatter={formatDateTick}
              tick={{ dy: 10, fill: 'gray' }}
              interval={Math.ceil(data.length / 5)}
            />
            <YAxis dataKey='temperature' tick={{ fill: 'gray' }} angle={-45}>
              <Label value={'Temperature (°C)'} angle={-90} fill='white' dx={-15} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Line type='monotone' dataKey='temperature' stroke='#fff' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
