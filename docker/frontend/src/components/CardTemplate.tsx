import React, {useEffect, useState} from "react";
import "./CardTemplate.scss"
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { ArcElement, LineElement, PointElement } from "chart.js";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrazione dei componenti necessari di Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


export default function CardTemplate (
    props : {
        readonly firstRegion : string;
        readonly secondRegion : string;
    }
) {

    const [dataFirstChart, setDataFirstChart] = useState<DataChart | null>(null)
    const [dataSecondChart, setDataSecondChart] = useState<DataChart | null>(null)
    const [dataThirdChart, setDataThirdChart] = useState<DataChart | null>(null)
    const [yearFwa, setYearFwa] = useState("Tutti")
    const [yearFiber, setYearFiber] = useState("Tutti")
    const {firstRegion, secondRegion} = props

    const yearOfFwa = ["Tutti","2020","2021","2022"]
    const yearOfFiber = ["Tutti","2019","2020","2021","2022","2023"]

    useEffect(() => {
        axios.get(`http://localhost:5000/comparison/${firstRegion}/${secondRegion}/${yearFiber}/Stato Fibra`).then(response => {
            console.log("chiamo il porco di dio")
            if (response.status === 200) {
                const data = response.data;
                setDataFirstChart(jsonToBarChartDataset(data))
            } else {
                console.error("Errore nella chiamata AJAX:", response.status);
            }
        }).catch(error => {
            console.error("Errore nella chiamata AJAX:", error);
        }).finally(() => {
            
        });
    }, [firstRegion, secondRegion, yearFiber]);

    useEffect(() => {
        axios.get(`http://localhost:5000/comparison/${firstRegion}/${secondRegion}/${yearFwa}/Stato FWA`).then(response => {
            console.log("chiamo il porco di dio")
            if (response.status === 200) {
                const data = response.data;
                setDataSecondChart(jsonToBarChartDataset(data))
            } else {
                console.error("Errore nella chiamata AJAX:", response.status);
            }
        }).catch(error => {
            console.error("Errore nella chiamata AJAX:", error);
        }).finally(() => {
            
        });
    }, [firstRegion, secondRegion, yearFwa]);

    useEffect(() => {
        axios.get(`http://localhost:5000/comparison/${firstRegion}/${secondRegion}/pcn`).then(response => {
            console.log("chiamo il porco di dio")
            if (response.status === 200) {
                const data = response.data;
                setDataThirdChart(jsonToBarChartDataset(data))
            } else {
                console.error("Errore nella chiamata AJAX:", response.status);
            }
        }).catch(error => {
            console.error("Errore nella chiamata AJAX:", error);
        }).finally(() => {
            
        });
    }, [firstRegion, secondRegion]);

    function handleChangeChartYear (value:string, type:string) {
        if( type === "fiber" ) {
            setYearFiber(value)
        } else {
            setYearFwa(value)
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

    return (
        <>
            <div className="card-container">
                <div className="card">
                    <div className="card-fiber">
                        <div className="card-year-selection">
                            <p className="title">Comparazione dei cantieri di fibra ottica</p>
                            <select className="card-chart-select" value={yearFiber} onChange={ e => {
                                handleChangeChartYear(e.target.value, "fiber")
                                }}>
                                {yearOfFiber.map( x => <option value={x}>{x}</option>)}
                            </select>
                        </div>
                        {dataFirstChart !== null? <Bar className="chart" data={dataFirstChart} options={options} /> : null}
                    </div>
                    <div className="FWA">
                        <div className="card-year-selection">
                            <p className="title">Comparazione dei cantieri della tecnologia FWA</p>
                            <select className="card-chart-select" value={yearFwa} onChange={ e => {
                                handleChangeChartYear(e.target.value, "fwa")
                                }}>
                                {yearOfFwa.map( x => <option value={x}>{x}</option>)}
                            </select>
                        </div>
                        {dataSecondChart !== null? <Bar className="chart" data={dataSecondChart} options={options} /> : null}
                    </div>
                    <div className="PCN">
                        <p className="title">Comparazione della presenza di PCN </p>
                        {dataThirdChart !== null? <Bar className="chart" data={dataThirdChart} options={options} /> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

interface FiberData {
    [key: string]: number | null;
}

interface InputData {
    [region: string]: FiberData;
}

interface ChartDataset {
    label: string;
    data: (number | null)[];
    backgroundColor: string | string[];
    borderColor: string;
    borderWidth: number;
    fill: boolean;
}

interface DataChart {
    labels: string[];
    datasets: ChartDataset[];
}

interface Color {
    backgroundColor: string;
    borderColor: string;
}

function jsonToBarChartDataset(data: InputData): DataChart {
    const labelSet = new Set<string>();
    Object.values(data).forEach((innerObj) => {
        Object.keys(innerObj).forEach((key) => {
            labelSet.add(key);
        });
    });

    const labels = Array.from(labelSet).sort();

    let datasets: ChartDataset[] = Object.keys(data).map((region, index) => {
        const color = getColor(index);
        return {
            label: region,
            data: labels.map(label => data[region][label] ?? null),
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
            borderWidth: 1,
            fill: true
        };
    });

    if (datasets.length === 1) {
        datasets = Object.keys(data).map((region) => {
            const colors = getColors(labels.length);
            return {
                label: region,
                data: labels.map(label => data[region][label] ?? null),
                backgroundColor: colors.map(c => c.backgroundColor),
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
                fill: true
            };
        });
    }

    return {
        labels,
        datasets
    };
}

const getColor = (index: number): Color => {
    const colors: Color[] = [
        { backgroundColor: 'rgba(60, 102, 105, 0.7)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(202, 220, 224, 0.7)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(55, 192, 197, 0.7)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(153, 102, 255, 0.7)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(255, 159, 64, 0.7)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(199, 199, 199, 0.7)', borderColor: 'rgba(0, 0, 0, 1)' },
    ];
    return colors[index % colors.length];
};

const getColors = (count: number): Color[] => {
    const colors: Color[] = [
        { backgroundColor: 'rgba(60, 102, 105, 1)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(202, 220, 224, 1)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(55, 192, 197, 1)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(153, 102, 255, 1)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(255, 159, 64, 1)', borderColor: 'rgba(0, 0, 0, 1)' },
        { backgroundColor: 'rgba(199, 199, 199, 1)', borderColor: 'rgba(0, 0, 0, 1)' },
    ];

    return colors.slice(0, count);
};