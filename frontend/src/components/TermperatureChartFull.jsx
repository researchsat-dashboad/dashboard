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

const calculateMovingAverage = (data, windowSize) => {
  const movingAverageData = [];

  for (let i = 0; i < data.length; i += 5) {
    let sum = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
      sum += data[j].temperature;
      count++;
    }

    const average = sum / count;
    movingAverageData.push({ dateTime: data[i].dateTime, temperature: average });
  }

  return movingAverageData;
};

export default function TemperatureChartFull({ temperatureData }) {
  if (!temperatureData) {
    // Loading placeholder so things don't break
    return <div>Loading</div>;
  }

  const data = temperatureData;

  const movingAverageData = calculateMovingAverage(temperatureData, 50);

  // Custom tooltip formatter (for better formatting)
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
      <div className='text-center'>
        <h1 className='text-[2rem] text-white'>Temperature/Time Graph</h1>
      </div>
      <ResponsiveContainer width='100%' height='95%'>
        <LineChart
          width={730}
          height={250}
          data={movingAverageData}
          margin={{ top: 25, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            tick={{ dy: 20, fill: 'gray' }}
            interval={Math.ceil(data.length / 100)}
          />
          <YAxis dataKey='temperature' tick={{ fill: 'gray', dy: -15 }} angle={-45}>
            <Label value={'Temperature °C'} angle={-90} fill='white' dx={-30} />
          </YAxis>
          <Tooltip content={CustomTooltip} />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='temperature' stroke='#fff' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
