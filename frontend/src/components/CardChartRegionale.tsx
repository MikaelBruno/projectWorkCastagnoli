import "./CardChartRegionale.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {calculateCompletedTotals, CategoryTotals} from "../utils/CalculateConstructionStatics";
import ConstructionStatisticsTable from "./ConstructionStatisticsTable";
import { CardChartProps } from "../models/CardChartProps";
import { jsonToDatasetForBarChart } from "../utils/jsonToDataset";
import { Pie, Bar, Doughnut, Line, Radar, PolarArea, Bubble, Scatter, Chart } from "react-chartjs-2";
import { ArcElement, ChartData, LineElement, PointElement } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrazione dei componenti necessari di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);
export default function CardChartRegionale(props: {
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
                    color: 'rgba(251, 255, 241, 0.4)',
                },
                ticks: {
                    color: 'rgba(251, 255, 241, 0.4)'
                }
            },
            y: {
                grid: {
                    color: 'rgba(251, 255, 241, 0.4)',
                },
                ticks: {
                    color: 'rgba(251, 255, 241, 0.4)'
                }
            },
        }
    };

    const cardChartProps = props.cardChartProps;
    const { title, text, littleTable, url, firstChartAllowedType, firstChartallowMoreHeight, region, years} = cardChartProps;
    const [dataFisrtChart, setDataFisrtChart] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [stastics, setStastics] = useState<CategoryTotals>();
    const [firstComponent, setFirstComponent] = useState<React.JSX.Element | null>(null);
    const [typeChart, setTypeChart] = useState<string>(firstChartAllowedType[0])
    const [year, setYear] = useState<string>(years != undefined ? years[0] : "tutti")

    useEffect(() => {
        const urlRegion =  `${url+region}\\${year}`
        axios.get(urlRegion).then(response => {
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                const keys = Object.keys(data)
                console.log(keys)
                setDataFisrtChart(jsonToDatasetForBarChart(data[keys[0]]));
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
    }, [url, region, year]);

    useEffect(() => {
        if (!loading && dataFisrtChart && dataFisrtChart.labels) {
            handleChangeChartType(firstChartAllowedType[0]);
        }
    }, [loading, dataFisrtChart]);

    function handleChangeChartYear(value: string) {
        setYear(value)
    }

    function handleChangeChartType(type: string) {
        if (!dataFisrtChart || !dataFisrtChart.labels) {
            console.error("Dati del primo grafico non validi:", dataFisrtChart);
            return;
        }

        switch (type) {
            
            case "bar chart":
                setFirstComponent(<Bar data={dataFisrtChart} options={options} />);
                break;
            case "pie":
                setFirstComponent(<Pie data={dataFisrtChart} options={optionsCircle}/>);
                break;
            case "line":
                setFirstComponent(<Line data={dataFisrtChart} options={options}/>);
                break;
            case "doughnut":
                setFirstComponent(<Doughnut data={dataFisrtChart} options={optionsCircle}/>);
                break;
            default:
                setFirstComponent(null);
                break;
        }
        setTypeChart(type)
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
                                <div className="selection">
                                    <select className="card-chart-select" value={typeChart} onChange={ e => {
                                        handleChangeChartType(e.target.value)
                                        }}>
                                        {firstChartAllowedType.map( x => <option value={x}>{x}</option>)}
                                    </select>
                                    {years != undefined ? 
                                        <select className="card-chart-select" value={year} onChange={ e => {
                                            handleChangeChartYear(e.target.value)
                                            }}>
                                            {years.map( x => <option value={x}>{x}</option>)}
                                        </select> : null
                                    }
                                </div>
                                
                                {firstComponent != null && firstComponent}
                            </div>
                            
                        </>
                    )}
                </div>
            </div>
            
        </div> 
    </div>
        
    );
}
/*
<div className={secondChartallowMoreHeight? "high": ""}>
                                <select className="card-chart-select" defaultValue={secondChartAllowedType[0]} onChange={ e => {
                                    handleChangeChartType(e.target.value,1)
                                    }}>
                                    {secondChartAllowedType.map( x => <option value={x}>{x}</option>)}
                                </select>
                                {secondComponent != null && secondComponent}
                            </div>*/