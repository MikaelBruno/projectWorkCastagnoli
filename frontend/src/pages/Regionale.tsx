import React, { useEffect, useState } from "react";
import "./Nazionale.scss";
import CardSwitchRegionale from "../components/CardSwitchRegionale";
import DropdownSwitch from "../components/DropdownSwitch";
import {CardChartProps} from "../models/CardChartProps";
import { getCardRegionale } from "../data/CardRegionale";
import CardChartRegionale from "../components/CardChartRegionale";

export default function Nazionale() {
    const italianRegions: string[] = ["Sicilia", "Piemonte", "Marche", "Valle d'Aosta", "Toscana", "Campania", "Puglia", "Veneto", "Lombardia", "Emilia Romagna", "Trentino Alto Adige-Trento", "Sardegna", "Molise", "Calabria", "Abruzzo", "Lazio", "Liguria", "Friuli Venezia Giulia", "Basilicata", "Umbria"];
    const arrayString = ["FWA","Fibra","PNC"];
    const [slide, setSlide] = useState(arrayString[0]);
    const [dropdown, setDropdown] = useState(false);
    const [selected, setSelected] = useState(arrayString[0]);
    const [cardChartProps, setCardChartProps] = useState<CardChartProps>(getCardRegionale(arrayString[0]));
    const [region, setRegion] = useState<string>(italianRegions[0]);

    const updateViewportSize = () => {
        if (window.innerWidth < 576) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    };
    
    const handleRegionChange = (value: string) => {
        setRegion(value);
        console.log(value)
        const newCardChartProps: CardChartProps = {
            ...getCardRegionale(slide), 
            region: value
        };
        setCardChartProps(newCardChartProps);
        console.log(newCardChartProps)
    } 

    useEffect(() => {
        handleRegionChange("Sicilia")
        updateViewportSize();
        window.addEventListener('resize', updateViewportSize);
        return () => window.removeEventListener('resize', updateViewportSize);
    }, []);

    const handleSlideChange = (newSlide: string) => {
        setSlide(newSlide);
        setSelected(newSlide);
        setCardChartProps({
            ...getCardRegionale(newSlide),
            region: region}
        );
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
                    <CardSwitchRegionale
                        arrayString={arrayString}
                        callBack={handleSlideChange}
                        Select={selected}
                        callBackRegionale={(value) => handleRegionChange(value)}
                        selectRegionale={region}
                        options={italianRegions}
                    />
                )}
                {cardChartProps.region}
                <CardChartRegionale cardChartProps={cardChartProps}/>
        </>
    )
}   

        /*
        title="Stato generale cantieri fibra ottica e FWA in Italia"  ,
        littleTable={true},
        url="http://127.0.0.1:5000/construction-site/italy",
        text="Il primo grafico rappresenta lo stato dei cantieri relativi alla fibra ottica nel corso degli anni, suddivisi tra in esecuzione, in progettazione e completati. Il secondo grafico segue lo stesso principio, ma focalizzato sulla tecnologia FWA wireless ultraveloce."
        */