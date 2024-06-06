import { CardChartProps } from "../models/CardChartProps"
  
  type Card = {
    [key: string]: CardChartProps;
  };
  
  const cardRegionale: Card = {
    "FWA": {
      title: "Cantieri per la FWA",
      littleTable: false,
      url: "http://127.0.0.1:5000/fwa-construction-site/",
      text: "In questo punto mostro lo stato dei cantieri per la FWA in totale, per anno e i piani decisi per ogni anno",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"],
      firstChartallowMoreHeight : true,
      years : ["Tutti","2020","2021","2022"]
    },
    "Fibra": {
      title: "Cantieri per la Fibra",
      littleTable: false,
      url: "http://127.0.0.1:5000/fiber-construction-site/",
      text: "In questo punto mostro lo stato dei cantieri per la fibra in totale, per anno e i piani decisi per ogni anno",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"],
      secondChartallowMoreHeight : true,
      firstChartallowMoreHeight : true,
      years : ["Tutti","2019","2020","2021","2022","2023"]
    },
    "PCN": {
      title: "Distribuzione dei PCN del progetto BUL nella regione",
      littleTable: false,
      url: "http://127.0.0.1:5000/pcn/",
      text: "In questo grafico mostro la distribuzione dei PCN per provincia nella regione",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"],
      secondChartallowMoreHeight : true,
      firstChartallowMoreHeight : true
    },
  };
  
  export function getCardRegionale(category: string): CardChartProps {
    let cardInfo = cardRegionale[category];
    return cardInfo;
  }