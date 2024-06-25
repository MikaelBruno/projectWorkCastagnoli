  export interface CategoryTotals {
    [category: string]: number;
  }
  
  export function calculateCompletedTotals(data: any): { totalFWA: number; totalFiber: number; averageFWA: number; averageFiber: number } {
    const FWACompletedTotal = data["FWA"]["Terminati"] ? Object.values(data["FWA"]["Terminati"]).reduce((acc: number, curr: any) => acc + Number(curr), 0) : 0;
    const fiberCompletedTotal = data["Fiber"]["Terminati"] ? Object.values(data["Fiber"]["Terminati"]).reduce((acc: number, curr: any) => acc + Number(curr), 0) : 0;
    
    const FWAYears = data["FWA"]["Terminati"] ? Object.keys(data["FWA"]["Terminati"]).length : 0;
    const fiberYears = data["Fiber"]["Terminati"] ? Object.keys(data["Fiber"]["Terminati"]).length : 0;

    const FWAAverage = FWAYears > 0 ? FWACompletedTotal / FWAYears : 0;
    const fiberAverage = fiberYears > 0 ? fiberCompletedTotal / fiberYears : 0;

    return { totalFWA: FWACompletedTotal, totalFiber: fiberCompletedTotal, averageFWA: FWAAverage, averageFiber: fiberAverage };
  }
  
  
  