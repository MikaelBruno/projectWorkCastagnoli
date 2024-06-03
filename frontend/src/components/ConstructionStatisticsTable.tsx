import React from "react";
import { CategoryTotals } from "../utils/CalculateConstructionStatics";
import "./ConstructionStatisticsTable.scss"

export default function ConstructionStatisticsTable(props: {
    totals: CategoryTotals
}) {
    const { totals } = props;

    return (
        <div className="construction-statistics-table">
            <table >
                <thead>
                    <tr>    
                        <th></th>
                        <th>Fwa</th>
                        <th>Fibra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Terminati</td>
                        <td id="number">{totals.totalFWA}</td>
                        <td id="number">{totals.totalFiber}</td>
                    </tr>
                    <tr>
                        <td>Media per anno</td>
                        <td id="number">{totals.averageFWA}</td>
                        <td id="number">{totals.averageFiber}</td>
                    </tr>
                </tbody>
            </table> 
        </div>
      );
}