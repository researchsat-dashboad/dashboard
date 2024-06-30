import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import formatDateTick from '../services/formatDateTick';
import Loader from '../services/Loader';
import ChartContainer from './ChartContainer';

export default function SpectChart({ spectData, handleChartClick }) {
  const data = spectData.slice(-50);

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
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '10px',
            border: '1px solid #ccc'
          }}
        >
          <p className='label'>{`Time: ${time}`}</p>
          <p className='data'>{`Violet (450nm): ${payload[0].value.toFixed(2)}`}</p>
          <p className='data'>{`Blue (500nm): ${payload[1].value.toFixed(2)}`}</p>
          <p className='data'>{`Green (550nm): ${payload[2].value.toFixed(2)}`}</p>
          <p className='data'>{`Yellow (570nm): ${payload[3].value.toFixed(2)}`}</p>
          <p className='data'>{`Orange (600nm): ${payload[4].value.toFixed(2)}`}</p>
          <p className='data'>{`Red (650nm): ${payload[5].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer title='Spectral Graph' onZoom={handleChartClick('spect')}>
      {spectData.length == 0 ? (
        <Loader />
      ) : (
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 20, right: 30, bottom: 15 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
            <XAxis
              dataKey='dateTime'
              tickFormatter={formatDateTick}
              tick={{ dy: 10, fill: 'gray' }}
              interval={Math.ceil(data.length / 10)}
            />
            <YAxis tick={{ fill: 'gray', dy: -15 }} angle={-45} />
            <Tooltip content={CustomTooltip} />
            <Legend
              verticalAlign='bottom'
              align='center'
              wrapperStyle={{ paddingTop: '40px' }} // Add padding to separate the legend from the chart
            />
            <Line
              type='monotone'
              dataKey='spectV'
              name='Violet (450nm)'
              stroke='#8F00FF'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='spectB'
              name='Blue (500nm)'
              stroke='#1c53e7'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='spectG'
              name='Green (550nm)'
              stroke='#2e6930'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='spectY'
              name='Yellow (570nm)'
              stroke='#FFFF00'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='spectD'
              name='Orange (600nm)'
              stroke='#FFA500'
              dot={false}
            />
            <Line
              type='monotone'
              dataKey='spectR'
              name='Red (650nm)'
              stroke='#FF0000'
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
