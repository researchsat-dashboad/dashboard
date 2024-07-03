import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer
} from 'recharts';
import formatDateTick from '../services/formatDateTick';
import ChartContainer from './ChartContainer';

const calculateMovingAverage = (data, windowSize) => {
  const movingAverageData = [];

  for (let i = 0; i < data.length; i += 5) {
    let spectVSum = 0;
    let spectBSum = 0;
    let spectGSum = 0;
    let spectYSum = 0;
    let spectDSum = 0;
    let spectRSum = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
      spectVSum += data[j].spectV;
      spectBSum += data[j].spectB;
      spectGSum += data[j].spectG;
      spectYSum += data[j].spectY;
      spectDSum += data[j].spectD;
      spectRSum += data[j].spectR;
      count++;
    }

    const spectVAverage = spectVSum / count;
    const spectBAverage = spectBSum / count;
    const spectGAverage = spectGSum / count;
    const spectYAverage = spectYSum / count;
    const spectDAverage = spectDSum / count;
    const spectRAverage = spectRSum / count;

    movingAverageData.push({
      dateTime: data[i].dateTime,
      spectV: spectVAverage,
      spectB: spectBAverage,
      spectG: spectGAverage,
      spectY: spectYAverage,
      spectD: spectDAverage,
      spectR: spectRAverage
    });
  }

  return movingAverageData;
};

export default function SpectChartFull({ spectData }) {
  // console.log(spectData);
  if (!spectData) {
    // Loading placeholder so things don't break
    return <div>Loading</div>;
  }

  const data = spectData;

  const movingAverageData = calculateMovingAverage(spectData, 5);

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
    <ChartContainer title='Spectral/Time Graph'>
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
            tick={{ dy: 15, fill: 'white', fontSize: 12 }}
            interval={Math.ceil(data.length / 100)}
          />
          <YAxis tick={{ fill: 'white', dx: -10, fontSize: 16 }} angle={0}>
            <Label value={'Spectral Value'} angle={-90} fill='white' dx={-45} />
          </YAxis>
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
          <Line type='monotone' dataKey='spectB' name='Blue (500nm)' stroke='#1c53e7' dot={false} />
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
          <Line type='monotone' dataKey='spectR' name='Red (650nm)' stroke='#FF0000' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
