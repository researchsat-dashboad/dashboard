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

export default function HumidityChart({ humidityData, handleChartClick }) {
  const data = humidityData.slice(-20);

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
          <p className='data'>{`Humidity: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer onZoom={handleChartClick('humidity')} title='Humidity/Time Graph'>
      {humidityData.length == 0 ? (
        <Loader />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
            <XAxis
              dataKey='dateTime'
              tickFormatter={formatDateTick}
              tick={{ dy: 15, fill: 'white', fontSize: 12 }}
              interval={Math.ceil(data.length / 5)}
            />
            <YAxis
              dataKey='humidity'
              tick={{ fill: 'white', dy: -5, dx: -10, fontSize: 12 }}
              angle={-25}
            >
              <Label value={'Humidity (%)'} angle={-90} fill='white' dx={-45} />
            </YAxis>
            <Tooltip content={CustomTooltip} />
            {/* <Legend /> */}
            <Line type='monotone' dataKey='humidity' stroke='#fff' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
