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
import formatDateTick from '../../services/formatDateTick';
import formatPressureUnit from '../../services/formatPressureUnit';
import Loader from '../../services/Loader';
import ChartContainer from './ChartContainer';

export default function PressureChart({ pressureData, handleChartClick }) {
  const data = pressureData.slice(-50);

  const minPressure = Math.min(...data.map((entry) => entry.pressure));

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
          <p className='data'>{`Pressure: ${payload[0].value.toLocaleString()} Pa`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer title='Pressure/Time' onZoom={handleChartClick('pressure')}>
      {pressureData.length == 0 ? (
        <Loader />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 15, right: 30, left: 20, bottom: 30 }}
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
              dataKey='pressure'
              tick={{ fill: 'white', dx: -5, fontSize: 12 }}
              angle={0}
              domain={[minPressure, 'auto']}
              stroke='white'
              tickFormatter={formatPressureUnit}
            >
              <Label value={'Pressure (Kpa)'} angle={-90} fill='white' dx={-45} />
            </YAxis>
            <Tooltip content={CustomTooltip} />
            <Line type='monotone' dataKey='pressure' stroke='#fff' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
