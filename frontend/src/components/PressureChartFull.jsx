import React from 'react';
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
import formatDateTick from '../utils/formatDateTick';

const calculateMovingAverage = (data, windowSize) => {
  const movingAverageData = [];

  for (let i = 0; i < data.length; i += 20) {
    let sum = 0;
    let count = 0;

    for (let j = Math.max(0, i - windowSize + 1); j <= i; j++) {
      sum += data[j].pressure;
      count++;
    }

    const average = sum / count;
    movingAverageData.push({ dateTime: data[i].dateTime, pressure: average });
  }

  return movingAverageData;
};

export default function PressureChartFull({ pressureData }) {
  if (!pressureData) {
    // Loading placeholder so things don't break
    return <div>Loading</div>;
  }


  const data = pressureData;

  const movingAverageData = calculateMovingAverage(pressureData, 100);
  const minPressure = Math.min(...movingAverageData.map((entry) => entry.pressure));

  // Custom tooltip formatter (optional, for better formatting)
  const CustomTooltip = ({ active, payload, label }) => {
    let time;
    if (label) {
      time = label.split('T')[1].split('.')[0];
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
    <>
      <div className='text-center'>
        <h1 className='text-[2rem] text-white'>Pressure/Time Graph</h1>
      </div>
      <ResponsiveContainer width='100%' height='95%'>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 25, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#5d5e5e' />
          <XAxis
            dataKey='dateTime'
            tickFormatter={formatDateTick}
            tick={{ dy: 20, fill: 'gray' }}
            interval={Math.ceil(data.length / 100)}
          />
          <YAxis
            dataKey='pressure'
            tick={{ fill: 'gray', dy: -15 }}
            angle={-45}
            domain={[minPressure, 'auto']}
          >
            <Label value={'Pressure Pa'} angle={-90} fill='white' dx={-30} />
          </YAxis>
          <Tooltip content={CustomTooltip} />
          {/* <Legend /> */}
          <Line
            type='monotone'
            data={movingAverageData}
            dataKey='pressure'
            stroke='#fff'
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
