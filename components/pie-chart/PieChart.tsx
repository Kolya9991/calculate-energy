'use client'
import { FC } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { IDeviceProps } from "@/types/calculateDevice";

interface IPieChartProps {
  data: IDeviceProps[]
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: FC<IPieChartProps> = ({ data }) => {
  // Подготовка данных для круговой диаграммы
  const chartData = {
    labels: data.map(item => item.nameDevice),
    datasets: [{
      label: 'кВт в місяць',
      data: data.map(item => item.kwMonth),
      backgroundColor: [
        '#ff6384',
        '#36a2eb',
        '#cc65fe',
        '#ffce56',
        '#ff8744',
        '#44ff76',
        '#4454ff',
        '#71ff44',
        '#ff4444',
        '#44ffd1'
      ],
      hoverBackgroundColor: [
        '#ff6384',
        '#36a2eb',
        '#cc65fe',
        '#ffce56',
        '#ff8744',
        '#44ff76',
        '#4454ff',
        '#71ff44',
        '#ff4444',
        '#44ffd1'
      ]
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20 // Устанавливаем отступ для элементов внутри легенды
        },
        title: {
          display: true,
          text: 'Назви приладів',
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    }
  };


  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
