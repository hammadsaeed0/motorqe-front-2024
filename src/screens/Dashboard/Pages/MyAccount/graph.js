import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import visits from "../../../../assets/icons/visits.png";
import { Base_url } from '../../../../utils/Base_url';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LineChart = () => {
  const chartRef = useRef(null);
  const user = useSelector((state) => state.authReducer);
  const [analytics, setAnalytics] = useState({ dailyViews: [] });

  useEffect(() => {
    const param = {
      user: user?.userToken,
    };

    axios
      .post(`${Base_url}/user/my-analytic`, param)
      .then((res) => {
        console.log(res, "/user button click");
        setAnalytics(res?.data?.data); // Update analytics with response data
      })
      .catch((error) => {
        console.error('Error fetching analytics data', error);
      });
  }, [user?.userToken]);

  const data = {
    labels: analytics?.dailyViews?.map((view) => view.date), // Dates from dailyViews
    datasets: [
      {
        label: 'Views',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: analytics?.dailyViews?.map((view) => view.views), 
      },
      {
        label: 'Clicks',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(255,0,0,1)',
        pointBorderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: analytics?.dailyViews?.map((view) => view.clicks), 
      },
    ],
  };

  const options = {
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
        display: false, // Disable datalabels (optional)
      },
    },
  };

  return (
    <div>
      <div className="h-[520px] w-[700px] bg-[#F3F3F5] p-5 rounded-[20px]">
        <div className="flex justify-between relative items-center pt-[30px]">
          <div className="flex gap-2 items-center">
            <img src={visits} alt="visits" />
            <strong>Visits</strong>
          </div>

          {/* <div className="flex gap-2 relative items-center pr-[20px]">
            <strong className="text-[#FB5722]">Last 24 hours</strong>
            <strong className="text-[#0C0CB8]">Last 7 days</strong>
            <strong className="text-[#0C0CB8]">Last 30 days</strong>
          </div> */}
        </div>
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
