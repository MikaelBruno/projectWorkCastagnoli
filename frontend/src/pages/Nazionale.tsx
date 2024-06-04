import React, { useEffect, useState } from "react";
import "./Nazionale.scss";
import CardSwitch from "../components/CardSwitch";
import DropdownSwitch from "../components/DropdownSwitch";
import CardChart from "../components/CardChart";
import {CardChartProps} from "../models/CardChartProps";
import { getCardNazionale } from "../data/CardNazionale";
import CardChartWithTwoTables from "../components/CardChartWithTwoTables"

export default function Nazionale() {
    const arrayString = ["Stato generale cantieri","Copertura","Futuro dei cantieri","Fwa vs Fibra"];
    const [slide, setSlide] = useState(arrayString[0]);
    const [dropdown, setDropdown] = useState(false);
    const [selected, setSelected] = useState(arrayString[0]);
    const [cardChartProps, setCardChartProps] = useState<CardChartProps>(getCardNazionale("Stato generale cantieri"))

    const updateViewportSize = () => {
        if (window.innerWidth < 576) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    };

    useEffect(() => {
        updateViewportSize();
        window.addEventListener('resize', updateViewportSize);
        return () => window.removeEventListener('resize', updateViewportSize);
    }, []);

    const handleSlideChange = (newSlide: string) => {
        setSlide(newSlide);
        setSelected(newSlide);
        setCardChartProps(getCardNazionale(newSlide));
    };

    return (
        <>
                {dropdown ? (
                    <DropdownSwitch
                        arrayString={arrayString}
                        callBack={handleSlideChange}
                        Select={selected}
                        
                    />
                ) : (
                    <CardSwitch
                        arrayString={arrayString}
                        callBack={handleSlideChange}
                        Select={selected}
                        
                    />
                )}

                {cardChartProps.title !== "Andamento della fibra contro quello del FWA" && <CardChart cardChartProps={cardChartProps}/>}
                {cardChartProps.title === "Andamento della fibra contro quello del FWA" &&<CardChartWithTwoTables cardChartProps= {cardChartProps}/> }
        </>
    )
}   

        /*
        title="Stato generale cantieri fibra ottica e FWA in Italia"  ,
        littleTable={true},
        url="http://127.0.0.1:5000/construction-site/italy",
        text="Il primo grafico rappresenta lo stato dei cantieri relativi alla fibra ottica nel corso degli anni, suddivisi tra in esecuzione, in progettazione e completati. Il secondo grafico segue lo stesso principio, ma focalizzato sulla tecnologia FWA wireless ultraveloce."
        */