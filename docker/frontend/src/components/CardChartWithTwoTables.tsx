import "./CardChartWithTwoTables.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CardChartProps } from "../models/CardChartProps";
import { jsonToDatasetForBarChart } from "../utils/jsonToDataset";
import { Pie, Bar, Doughnut, Line} from "react-chartjs-2";
import { ArcElement, Filler, LineElement, PointElement } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrazione dei componenti necessari di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);
export default function CardChartWithTwoTables(props: {
    readonly cardChartProps : CardChartProps
}) {
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
    const cardChartProps = props.cardChartProps;
    const { title, text, url, firstChartAllowedType, firstChartallowMoreHeight, } = cardChartProps;
    const [dataFisrtChart, setDataFisrtChart] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [firstComponent, setFirstComponent] = useState<React.JSX.Element | null>(null);
    const [firstTableData, setFirstTableData] = useState<any>(null);
    const [secondTableData, setSecondTableData] = useState<any>(null);


    useEffect(() => {
        axios.get(url).then(response => {
            
            if (response.status === 200) {
                const data = response.data;
                const keys = Object.keys(data)

                setDataFisrtChart(jsonToDatasetForBarChart(data[keys[0]]));
                setFirstTableData(data[keys[1]]["fibra"])
                setSecondTableData(data[keys[1]]["fwa"])
                setLoading(false);
            } else {
                console.error("Errore nella chiamata AJAX:", response.status);
            }
        }).catch(error => {
            console.error("Errore nella chiamata AJAX:", error);
        }).finally(() => {
            
        });
    }, [url]);

    useEffect(() => {
        handleChangeChartType(firstChartAllowedType[1])
    }, [dataFisrtChart,loading])

    function handleChangeChartType(type: string) {
        if (!dataFisrtChart || !dataFisrtChart.labels) {
            console.error("Dati del primo grafico non validi:", dataFisrtChart);
            return;
        }

        let data;
        data = dataFisrtChart

        switch (type) {
            case "bar chart":
                setFirstComponent(<Bar data={data} options={options}/>);
                break;
            case "pie":
                setFirstComponent(<Pie data={data} options={optionsCircle}/>);
                break;
            case "line":
                console.log(data)
                setFirstComponent(<Line data={data} options={options}/>);
                break;
            case "doughnut":
                setFirstComponent(<Doughnut data={data} options={optionsCircle}/>);
                break;
            default:
                setFirstComponent(null);
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
                </div>
            </div> 
            <div className="card-chart-chart-container">
                <div className="card-chart-chart">
                    {!loading && (
                        <>
                            <div className={firstChartallowMoreHeight? "high": ""}>
                                {firstComponent !== null && firstComponent}
                            </div>
                            <div className="table-container">
                                <p>Fibra</p>
                                {firstTableData && <TableComponent data={firstTableData} />}
                            </div>
                            <div className="table-container">
                                <p>FWA</p>
                                {secondTableData && <TableComponent data={secondTableData} />}
                                
                            </div>
                        </>
                    )}
                </div>
            </div>
            
        </div> 
    </div>
        
    );
}

interface Incremento {
    Incremento: number;
    Valori: number;
  }
  
  interface Data {
    [year: string]: Incremento;
  }
  
  const TableComponent: React.FC<{ data: Data }> = ({ data }) => {
    return (
      <table className="table">
        <thead>
          <tr className="horizzontal-line">
            <th className="year-column">Anno</th>
            <th>Valori</th>
            <th>Incremento %</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {Object.keys(data).map((year) => (
            <tr key={year}>
              <td className="year-column">{year}</td>
              <td className="number-column">{data[year].Valori}</td>
              <td className="number-column">{data[year].Incremento.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  