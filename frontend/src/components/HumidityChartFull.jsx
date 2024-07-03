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
import ChartContainer from './ChartContainer';

const calculateMovingAverage = (data, windowSize) => {
  const movingAverageData = [];

  for (let i = 0; i < data.length; i += 10) {
    let sum = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
      sum += data[j].humidity;
      count++;
    }

    const average = sum / count;
    movingAverageData.push({ dateTime: data[i].dateTime, humidity: average });
  }

  return movingAverageData;
};

export default function HumidityChartFull({ humidityData }) {
  if (!humidityData) {
    // Loading placeholder so things don't break
    return <div>Loading</div>;
  }

  const data = humidityData;

  const movingAverageData = calculateMovingAverage(humidityData, 10);

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
          <p className='data'>{`Humidity: ${payload[0].value.toFixed(2).toLocaleString()} %`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer title='Humidity/Time Graph'>
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
            tick={{ dy: 15, fill: 'white', fontSize: 16 }}
            interval={Math.ceil(data.length / 100)}
          />
          <YAxis
            dataKey='humidity'
            tick={{ fill: 'white', dy: -5, dx: -15, fontSize: 16 }}
            angle={-25}
          >
            <Label value={'Humidity (%)'} angle={-90} fill='white' dx={-45} />
          </YAxis>
          <Tooltip content={CustomTooltip} />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='humidity' stroke='#fff' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
