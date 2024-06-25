export default interface ChartDataDTO {
    labels: string[];
    datasets: {
      label: string;
      data: (number | null)[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  }