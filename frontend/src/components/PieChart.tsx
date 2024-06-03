import React from "react"
import { Pie } from 'react-chartjs-2';
import jsonToDatasetForBarChart from "../utils/jsonToDataset";


export default function PieChart(props : {
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
        <>
            <Pie data={props.jsonData} options={options}></Pie>
        </>
    )
}