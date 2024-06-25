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
                        <th className="vertical-line"></th>
                        <th>Fwa</th>
                        <th>Fibra</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="vertical-line">Terminati</td>
                        <td id="number">{totals.totalFWA}</td>
                        <td id="number">{totals.totalFiber}</td>
                    </tr>
                    <tr>
                        <td className="vertical-line">Media per anno</td>
                        <td id="number">{totals.averageFWA}</td>
                        <td id="number">{totals.averageFiber}</td>
                    </tr>
                </tbody>
            </table> 
        </div>
      );
}