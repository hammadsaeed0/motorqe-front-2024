// LineChart.js
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import visits from  "../../../../assets/icons/visits.png"
const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const newChart = new Chart(chartRef.current, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            grid: {
              display: false, // Hide horizontal grid lines (X-axis)
            },
          },
          y: {
            grid: {
              display: true, // Show vertical grid lines (Y-axis)
            },
          },
        },
        plugins: {
          datalabels: {
            // ... (your datalabels configuration)
          },
        },
      },
    });

    return () => {
      newChart.destroy();
    };
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'My First Dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second Dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(255,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [1],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [35, 40, 55, 65, 75, 60, 45],
      },
    ],
  };

  return (
    <div>
      <div className='h-[520px] w-[700px] bg-[#F3F3F5] p-5 rounded-[20px]'>
       <div className='flex justify-between relative items-center pt-[30px] pb-[50px] '>  
       <div className='flex gap-2 '>
            <img src={visits} alt="" />
            <strong>Visits</strong>
        </div>

        <div className='flex gap-2 relative items-center  pr-[20px]'>
        
            <strong className='text-[#FB5722]'>Last 24 hours</strong>
            <strong className='text-[#0C0CB8]'> Last 7 days</strong>
            <strong className='text-[#0C0CB8]'>Last 30 days</strong>
        </div>
       </div>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default LineChart;
