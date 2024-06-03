import ChartDataDTO from "../models/ChartDataDTO";
export default function jsonToDatasetForBarChart(data: Record<string, Record<string, number | null>>) {
    const labelSet = new Set<string>();
    Object.values(data).forEach((innerObj) => {
        Object.keys(innerObj).forEach((key) => {
            labelSet.add(key);
        });
    });

    const labels = Array.from(labelSet).sort();
  
    const datasets = Object.keys(data).map((key, index) => {

        const color = getColor(index);
        return {
            label: key,
            data: labels.map(label => data[key][label] ?? null),
            backgroundColor: color.backgroundColor,
            borderColor: color.borderColor,
            borderWidth: 1
        };
    });

    return {
        labels,
        datasets
    };
};




const getColor = (index: number) => {
    const colors = [
        { backgroundColor: 'rgba(60 , 102 ,105 , 1)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(202, 220, 224, 1)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(55 ,192 ,197, 1)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(153, 102, 255, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(255, 159, 64, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        { backgroundColor: 'rgba(199, 199, 199, 0.7)', borderColor: 'rgba(00,00,00, 1)' },
        // Aggiungi altri colori qui
    ];
    return colors[index % colors.length];
};

/*
$background-color: #1F2126;
$font-color: #CADCE0;
$selected-color: #37C0C5;
$font-hover-color: #ddd;
$scrollbar-bg-color: #2A2D34;
$scrollbar-thumb-color: #37C0C5;
$scrollbar-thumb-hover-color: #666A75;
*/


export{jsonToDatasetForBarChart}