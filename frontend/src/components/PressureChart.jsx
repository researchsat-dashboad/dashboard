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
import formatDateTick from '../services/formatDateTick';

export default function PressureChart({ pressureData, dataPoints, handleChartClick }) {
  let data;

  if (dataPoints) {
    data = pressureData.slice(-dataPoints);
  } else {
    data = pressureData;
  }

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
    <>
      <div className="relative">
        <h3 className='text-white text-[1.5rem] my-2'>Pressure/Time Graph</h3>
        <img
          src='expand-icon.svg'
          className='h-[25px] px-2 cursor-pointer absolute right-[10px] top-[1px]'
          onClick={() => handleChartClick('pressure')}
        />
      </div>
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
            tick={{ dy: 15, fill: 'gray' }}
            interval={Math.ceil(data.length / 5)}
          />
          <YAxis
            dataKey='pressure'
            tick={{ fill: 'gray', dy: -12 }}
            angle={-45}
            domain={[minPressure, 'auto']}
          >
            <Label value={'Pressure Pa'} angle={-90} fill='white' dx={-30} />
          </YAxis>
          <Tooltip content={CustomTooltip} />
          {/* <Legend /> */}
          <Line type='monotone' dataKey='pressure' stroke='#fff' dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
