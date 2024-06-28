import { CardChartProps } from "../models/CardChartProps"
  
  type CardNazionale = {
    [key: string]: CardChartProps;
  };
  
  const cardNazionale: CardNazionale = {
    "Stato generale cantieri": {
      title: "Stato generale cantieri fibra ottica e FWA in Italia",
      littleTable: true,
      url: "http://localhost:80/api/construction-site/italy",
      text:
        "Il primo grafico rappresenta lo stato dei cantieri relativi alla fibra ottica nel corso degli anni, suddivisi tra in esecuzione, in progettazione e completati. Il secondo grafico segue lo stesso principio, ma focalizzato sulla tecnologia FWA wireless ultraveloce.",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"]
    },
    "Copertura": {
      title: "Copertura fibra ottica e FWA in Italia",
      littleTable: false,
      url: "http://localhost:80/api/coverage/italy",
      text: "In questo punto dal primo grafico a torta possiamo vedere la presenza delle due tecnologie a livello nazionale, mentre nel secondo grafico abbiamo i cantieri chiusi o in fase finale di collaudo per regione",
      firstChartAllowedType : ["pie", "doughnut"],
      secondChartAllowedType : ["bar chart", "line"],
      secondChartallowMoreHeight : true
    },
    "Futuro dei cantieri": {
      title: "Cantieri aperti e programmati per regione",
      littleTable: false,
      url: "http://localhost:80/api/future-construction-site/italy",
      text: "Da questi grafici possiamo vedere come finora i cantieri hanno riguardato maggiormenti alcune regioni rispetto ad altre",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"],
      secondChartallowMoreHeight : true,
      firstChartallowMoreHeight : true
    },
    "Fwa vs Fibra": {
      title: "Andamento della fibra contro quello del FWA",
      littleTable: false,
      url: "http://localhost:80/api/fwa-vs-fibra/italy",
      text: "Ultimo punto in cui controlliamo l'andamento della fibra e Fwa negli anni invece che per regione, notando un notevole incremento nel 2022 per la FWA. Nell'ultima tabella possiamo vedere di quanto i cantieri FWA superano i Cantieri con Fibra ottica",
      firstChartAllowedType : ["bar chart", "line"],
      secondChartAllowedType : ["bar chart", "line"]
    },
  };
  
  export function getCardNazionale(category: string): CardChartProps {
    let cardInfo = cardNazionale[category];
    return cardInfo;
  }