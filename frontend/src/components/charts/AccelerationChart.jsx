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
import formatDateTick from '../../services/formatDateTick';
import Loader from '../../services/Loader';
import ChartContainer from './ChartContainer';

export default function AccelerationChart({ accelerationData, handleChartClick }) {
  const data = accelerationData.slice(-50);

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
          <p className='data'>{`X: ${payload[0].value.toFixed(2)}`}</p>
          <p className='data'>{`Y: ${payload[1].value.toFixed(2)}`}</p>
          <p className='data'>{`Z: ${payload[2].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer title='Acceleration/Time' onZoom={handleChartClick('acceleration')}>
      {accelerationData.length == 0 ? (
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
              tick={{ dy: 15, fill: 'white', fontSize: 12 }}
              interval={Math.ceil(data.length / 10)}
              stroke='white'
            />
            <YAxis tick={{ fill: 'white', dx: -10, fontSize: 12 }} angle={0} stroke='white' />
            <Tooltip content={CustomTooltip} />
            <Legend
              verticalAlign='bottom'
              align='center'
              wrapperStyle={{ paddingTop: '40px' }} // Add padding to separate the legend from the chart
            />
            <Line type='monotone' dataKey='acx' name='X-axis' stroke='#FFFF00' dot={false} />
            <Line type='monotone' dataKey='acy' name='Y-axis' stroke='#fc0f03' dot={false} />
            <Line type='monotone' dataKey='acz' name='Z-axis' stroke='#c603fc' dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
