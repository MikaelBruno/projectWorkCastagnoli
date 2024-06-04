import "./CardChart.scss";
import React, { useEffect, useState } from "react";

import axios from "axios";
import {calculateCompletedTotals, CategoryTotals} from "../utils/CalculateConstructionStatics";
import ConstructionStatisticsTable from "./ConstructionStatisticsTable";
import { CardChartProps } from "../models/CardChartProps";
import { jsonToDatasetForBarChart } from "../utils/jsonToDataset";
import { Pie, Bar, Doughnut, Line, Radar, PolarArea, Bubble, Scatter, Chart } from "react-chartjs-2";
import { ArcElement, ChartData, LineElement, PointElement } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { screen } from "@testing-library/react";

// Registrazione dei componenti necessari di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);
export default function CardChart(props: {
    readonly cardChartProps : CardChartProps
}) {
    const options = {
        maintainAspectRatio: false, 
        responsive: true ,
        plugins: {
          title: {
              display: true
          }
        }
    };

    const cardChartProps = props.cardChartProps;
    const { title, text, littleTable, url: url} = cardChartProps;
    const [dataFisrtChart, setDataFisrtChart] = useState<any>({});
    const [dataSecondChart, setDataSecondChart] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [stastics, setStastics] = useState<CategoryTotals>();
    const [firstComponent, setFirstComponent] = useState<React.JSX.Element | null>(null);
    const [secondComponent, setSecondComponent] = useState<React.JSX.Element | null>(null);


    useEffect(() => {
        axios.get(url).then(response => {
            console.log("chiamo il porco di dio")
            if (response.status === 200) {
                const data = response.data;
                const keys = Object.keys(data)
                setDataFisrtChart(jsonToDatasetForBarChart(data[keys[0]]));
                setDataSecondChart(jsonToDatasetForBarChart(data[keys[1]]));
                console.log(dataFisrtChart)
                setLoading(false);
                if (littleTable) {
                    setStastics(calculateCompletedTotals(data));
                }
            } else {
                console.error("Errore nella chiamata AJAX:", response.status);
            }
        }).catch(error => {
            console.error("Errore nella chiamata AJAX:", error);
        }).finally(() => {
            
        });
    }, [url, littleTable]);

    useEffect(() => {
        if (!loading && dataFisrtChart && dataFisrtChart.labels) {
            handleChangeChartType("bar chart",0);
            handleChangeChartType("bar chart",1);
        }
    }, [loading, dataFisrtChart]);

    function handleChangeChartType(type: string, chart: number) {
        if (!dataFisrtChart || !dataFisrtChart.labels) {
            console.error("Dati del primo grafico non validi:", dataFisrtChart);
            return;
        }

        let setComponent;
        let data;
        if (chart === 0) {
            setComponent = setFirstComponent
            data = dataFisrtChart
        } else if (chart === 1) {
            setComponent = setSecondComponent
            data = dataSecondChart
        }

        if (!setComponent) {
            return;
        }

        switch (type) {
            case "bar chart":
                setComponent(<Bar data={data} options={options}/>);
                break;
            case "pie":
                setComponent(<Pie data={data} options={options}/>);
                break;
            case "line":
                setComponent(<Line data={data} options={options}/>);
                break;
            case "Doughnut":
                setComponent(<Doughnut data={data} options={options}/>);
                break;
            default:
                setComponent(null);
                break;
        }
    }

    return (
    <div className="card-char-container">
        <div className="card-chart">
            <div className="card-chart-text">
                <p className="card-chart-title">{title}</p>
                <div className="card-chart-undertitle">
                    <p className="card-chart-subtext">{text}</p>
                    <div className="card-chart-space"></div>
                    <div className="card-chart-table">
                        {littleTable && stastics && (
                            <ConstructionStatisticsTable totals={stastics} />
                        )}
                    </div>
                </div>
            </div> 
            <div className="card-chart-chart-container">
                <div className="card-chart-chart">
                    {!loading && (
                        <>
                            <div>
                                <select className="card-chart-select" defaultValue={"bar chart"} onChange={ e => {
                                    handleChangeChartType(e.target.value,0)
                                    }}>
                                    <option value="bar chart">Bar chart</option>
                                    <option value="pie">Pie</option>
                                    <option value="line">Line</option>
                                    <option value="Doughnut">Doughnut</option>
                                </select>
                                {firstComponent != null && firstComponent}
                            </div>
                            <div>
                                <select className="card-chart-select" defaultValue={"bar chart"} onChange={ e => {
                                    handleChangeChartType(e.target.value,1)
                                    }}>
                                    <option value="bar chart">Bar chart</option>
                                    <option value="pie">Pie</option>
                                    <option value="line">Line</option>
                                    <option value="Doughnut">Doughnut</option>
                                </select>
                                {secondComponent != null && secondComponent}
                            </div>
                        </>
                    )}
                </div>
            </div>
            
        </div> 
    </div>
        
    );
}