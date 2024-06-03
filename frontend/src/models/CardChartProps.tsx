import { ReactElement } from "react";

export interface CardChartProps {
    readonly title: string;
    readonly text: string;
    readonly littleTable?: boolean;
    readonly url: string;
}