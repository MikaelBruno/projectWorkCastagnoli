import { stringify } from "querystring";
import ChartDataDTO from "../models/ChartDataDTO";
export default function jsonToDatasetForBarChart(data: Record<string, Record<string, number | null >>) {

    const labelSet = new Set<string>();
    Object.values(data).forEach((innerObj) => {
        Object.keys(innerObj).forEach((key) => {
            labelSet.add(key);
        });
    });

    const labels = Array.from(labelSet).sort();
    let datasets
    
    datasets = Object.keys(data).map((key, index) => {
        const color = getColor(index);
        return {
            label: key,
            data: labels.map(label => data[key][label] ?? null),
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
            borderWidth: 1,
            fill: true
        };
    });
    
    if (datasets.length === 1) {
        datasets = Object.keys(data).map((key, index) => {
            const colors = getColors(3);
            return {
                label: key,
                data: labels.map(label => data[key][label] ?? null),
                backgroundColor: colors.map( x => x.backgroundColor),
                borderColor: 'rgba(00,00,00, 1)',
                borderWidth: 1,
                fill: true
            };
        });
    }

    return {
        labels,
        datasets
    };
};




const getColor = (index: number) => {
    const colors = [
        { backgroundColor: 'rgba(60 , 102 ,105 , 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(202, 220, 224, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(55 ,192 ,197, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(153, 102, 255, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(255, 159, 64, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(199, 199, 199, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
    ];
    return colors[index % colors.length];
};

const getColors = (count: number) => {
    const colors = [
        { backgroundColor: 'rgba(60 , 102 ,105 , 1)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(202, 220, 224, 1)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(55 ,192 ,197, 1)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(153, 102, 255, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(255, 159, 64, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(199, 199, 199, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
    ];
    let ArrayColors = []
    for (let x = 0; x < count; x++) {
        ArrayColors.push(colors[x % colors.length])
    }
    

    return colors.slice(0, count);
};

export{jsonToDatasetForBarChart}