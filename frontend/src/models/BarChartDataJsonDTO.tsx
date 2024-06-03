export default interface BarChartDataJsonDTO<T extends string> {
    [key: string]: Record<string, number | null>;
}