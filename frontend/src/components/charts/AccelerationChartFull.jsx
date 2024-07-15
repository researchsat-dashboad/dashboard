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
import formatDateTick from '../../services/formatDateTick';
import ChartContainer from './ChartContainer';

const calculateMovingAverage = (data, windowSize) => {
  const movingAverageData = [];

  for (let i = 0; i < data.length; i += 5) {
    let acxSum = 0;
    let acySum = 0;
    let aczSum = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
      acxSum += data[j].acx;
      acySum += data[j].acy;
      aczSum += data[j].acz;
      count++;
    }

    const acxAverage = acxSum / count;
    const acyAverage = acySum / count;
    const aczAverage = aczSum / count;

    movingAverageData.push({
      dateTime: data[i].dateTime,
      acx: acxAverage,
      acy: acyAverage,
      acz: aczAverage
    });
  }

  return movingAverageData;
};

export default function AccelerationChartFull({ accelerationData }) {
  // console.log(spectData);
  if (!accelerationData) {
    // Loading placeholder so things don't break
    return <div>Loading</div>;
  }

  const data = accelerationData;

  const movingAverageData = calculateMovingAverage(accelerationData, 50);

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
          <p className='data'>{`X: ${payload[0].value.toFixed(2)}`}</p>
          <p className='data'>{`Y: ${payload[1].value.toFixed(2)}`}</p>
          <p className='data'>{`Z: ${payload[2].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ChartContainer title='Acceleration/Time'>
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
            stroke='white'
          />
          <YAxis tick={{ fill: 'white', dx: -10, fontSize: 16 }} angle={0} stroke='white'>
            <Label value={'Acceleration'} angle={-90} fill='white' dx={-30} />
          </YAxis>
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
    </ChartContainer>
  );
}
