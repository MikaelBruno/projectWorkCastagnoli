import { CardChartProps } from "../models/CardChartProps"
  
  type CardNazionale = {
    [key: string]: CardChartProps;
  };
  
  const cardRegionale: CardNazionale = {
    "FWA": {
      title: "Cantieri per la FWA",
      littleTable: false,
      url: "http://127.0.0.1:5000/fwa-construction-site/",
      text: "In questo punto mostro lo stato dei cantieri per la FWA in totale, per anno e i piani decisi per ogni anno",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"]
    },
    "Fibra": {
      title: "Cantieri per la Fibra",
      littleTable: false,
      url: "http://127.0.0.1:5000/coverage/italy",
      text: "In questo punto mostro lo stato dei cantieri per la fibra in totale, per anno e i piani decisi per ogni anno",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"],
      secondChartallowMoreHeight : true
    },
    "PNC": {
      title: "Distribuzione dei PNC del progetto BUL nella regione",
      littleTable: false,
      url: "http://127.0.0.1:5000/future-construction-site/italy",
      text: "In questo grafico mostro la distribuzione dei PNC per provincia nella regione",
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