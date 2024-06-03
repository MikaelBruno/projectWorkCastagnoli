import { CardChartProps } from "../models/CardChartProps"
  
  type CardNazionale = {
    [key: string]: CardChartProps;
  };
  
  const cardNazionale: CardNazionale = {
    "Stato generale cantieri": {
      title: "Stato generale cantieri fibra ottica e FWA in Italia",
      littleTable: true,
      url: "http://127.0.0.1:5000/construction-site/italy",
      text:
        "Il primo grafico rappresenta lo stato dei cantieri relativi alla fibra ottica nel corso degli anni, suddivisi tra in esecuzione, in progettazione e completati. Il secondo grafico segue lo stesso principio, ma focalizzato sulla tecnologia FWA wireless ultraveloce."
    },
    "Copertura": {
      title: "Copertura fibra ottica e FWA in Italia",
      littleTable: false,
      url: "http://127.0.0.1:5000/coverage/italy",
      text: "In questo punto dai due grafici possiamo vedere la presenza delle due tecnologie a livello nazionale, mentre nell’altro grafico abbiamo i cantieri chiusi o in fase finale di collaudo per regione",
    },
    "Futuro dei cantieri": {
      title: "Cantieri per regione",
      littleTable: false,
      url: "http://127.0.0.1:5000/construction-site/future-construction",
      text: "Da questi grafici possiamo vedere come nel 2024 si svilupperanno altri cantieri",
    },
    "Fwa vs Fibra": {
      title: "Andamento della fibra contro quello del FWA",
      littleTable: false,
      url: "http://127.0.0.1:5000/construction-site/fwa-vs-fiber",
      text: "Ultimo punto in cui controlliamo l'andamento della fibra e Fwa negli anni invece che per regione, notando un notevole incremento nel 2022 per la FWA. Nell'ultima tabella possiamo vedere di quanto i cantieri FWA superano i Cantieri con Fibra ottica",
    },
  };
  
  export function getCardNazionale(category: string): CardChartProps {
    let cardInfo = cardNazionale[category];
    return cardInfo;
  }