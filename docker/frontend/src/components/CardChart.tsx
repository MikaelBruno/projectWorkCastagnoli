import "./CardChart.scss";
import React, { useEffect, useState } from "react";

import axios from "axios";
import {calculateCompletedTotals, CategoryTotals} from "../utils/CalculateConstructionStatics";
import ConstructionStatisticsTable from "./ConstructionStatisticsTable";
import { CardChartProps } from "../models/CardChartProps";
import { jsonToDatasetForBarChart } from "../utils/jsonToDataset";
import { Pie, Bar, Doughnut, Line} from "react-chartjs-2";
import { ArcElement, LineElement, PointElement } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrazione dei componenti necessari di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);
export default function CardChart(props: {
    readonly cardChartProps : CardChartProps
}) {

    const optionsCircle = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
              labels: {
                  usePointStyle: true,
                  color: 'white',
                  font: {
                      size: 16
                  }
              }
            }
        }
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
              labels: {
                  usePointStyle: true,
                  color: 'white',
                  font: {
                      size: 16
                  }
              }
            }
        },
        scales : {
            x: {
                grid: {
                    color: 'rgba(251, 255, 241, 0.4)', // Cambia il colore delle righe verticali
                },
                ticks: {
                    color: 'rgba(251, 255, 241, 0.4)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(251, 255, 241, 0.4)', // Cambia il colore delle righe orizzontali
                },
                ticks: {
                    color: 'rgba(251, 255, 241, 0.4)'
                }
            },
        }
    };

    const cardChartProps = props.cardChartProps;
    const { title, text, littleTable, url, firstChartAllowedType, secondChartAllowedType, firstChartallowMoreHeight, secondChartallowMoreHeight} = cardChartProps;
    const [dataFisrtChart, setDataFisrtChart] = useState<any>({});
    const [dataSecondChart, setDataSecondChart] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [stastics, setStastics] = useState<CategoryTotals>();
    const [firstComponent, setFirstComponent] = useState<React.JSX.Element | null>(null);
    const [secondComponent, setSecondComponent] = useState<React.JSX.Element | null>(null);
    const [chartTypeFirstChart, setchartTypeFirstChart] = useState<string> (firstChartAllowedType[0])
    const [chartTypeSecondChart, setchartTypeSecondChart] = useState<string> (secondChartAllowedType[0])


    useEffect(() => {
        axios.get(url).then(response => {
            console.log("chiamo il porco di dio")
            if (response.status === 200) {
                const data = response.data;
                const keys = Object.keys(data)
                setDataFisrtChart(jsonToDatasetForBarChart(data[keys[0]]));
                setDataSecondChart(jsonToDatasetForBarChart(data[keys[1]]));
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
            handleChangeChartType(firstChartAllowedType[0],0);
            handleChangeChartType(secondChartAllowedType[0],1);
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
            setchartTypeFirstChart(type)
        } else if (chart === 1) {
            setComponent = setSecondComponent
            data = dataSecondChart
            setchartTypeSecondChart(type)
        }

        if (!setComponent || !setchartTypeSecondChart) {
            return;
        }

        switch (type) {
            
            case "bar chart":
                setComponent(<Bar data={data} options={options} />);
                break;
            case "pie":
                setComponent(<Pie data={data} options={optionsCircle}/>);
                break;
            case "line":
                setComponent(<Line data={data} options={options}/>);
                break;
            case "doughnut":
                setComponent(<Doughnut data={data} options={optionsCircle}/>);
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
                            <div className={firstChartallowMoreHeight? "high": ""}>
                                <select className="card-chart-select" value={chartTypeFirstChart} onChange={ e => {
                                    handleChangeChartType(e.target.value,0)
                                    }}>
                                    {firstChartAllowedType.map( x => <option value={x}>{x}</option>)}
                                </select>
                                {firstComponent !== null && firstComponent}
                            </div>
                            <div className={secondChartallowMoreHeight? "high": ""}>
                                <select className="card-chart-select" value={chartTypeSecondChart} onChange={ e => {
                                    handleChangeChartType(e.target.value,1)
                                    }}>
                                    {secondChartAllowedType.map( x => <option value={x}>{x}</option>)}
                                </select>
                                {secondComponent !== null && secondComponent}
                            </div>
                        </>
                    )}
                </div>
            </div>
            
        </div> 
    </div>
        
    );
}