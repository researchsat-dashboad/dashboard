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
import ChartContainer from './ChartContainer';

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
    <ChartContainer title='Temperature/Time Graph' onZoom={handleChartClick('temperature')}>
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
              tick={{ dy: 15, fill: 'white', fontSize: 12 }}
              interval={Math.ceil(data.length / 5)}
              stroke='white'
            />
            <YAxis
              dataKey='temperature'
              tick={{ fill: 'white', dx: -10, fontSize: 12 }}
              stroke='white'
            >
              <Label value={'Temperature (°C)'} angle={-90} fill='white' dx={-45} />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            {/* <Legend /> */}
            <Line type='monotone' dataKey='temperature' stroke='#fff' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
