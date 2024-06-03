import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { jsonToDatasetForBarChart } from "../utils/jsonToDataset";  
import "./VerticalBarChart.scss";
import BarChartDataJsonDTO from "../models/BarChartDataJsonDTO";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function VerticalBarChart(props : {
    jsonData: any,//string per la chiave esterna
    chartTitle: string
}) {

    const {jsonData, chartTitle} = props
    const data =  jsonToDatasetForBarChart(jsonData);

    const options = {
        maintainAspectRatio: false, 
        responsive: true ,
        plugins: {
          title: {
              display: true,
              text: chartTitle
          }
        }
    };

    return (
        <div className="vertical-bar-chart-container">
            <Bar data={data} options={options} />
        </div>
    );
}
