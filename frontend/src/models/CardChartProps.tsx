import { ReactElement } from "react";

export interface CardChartProps {
    readonly title: string;
    readonly text: string;
    readonly littleTable?: boolean;
    readonly url: string;
    readonly firstChartAllowedType : string[];
    readonly secondChartAllowedType : string[];
    readonly firstChartallowMoreHeight? : boolean;
    readonly secondChartallowMoreHeight? : boolean;
    readonly region? : string;
}