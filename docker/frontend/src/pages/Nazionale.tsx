import React, { useEffect, useState } from "react";
import CardSwitch from "../components/CardSwitch";
import DropdownSwitch from "../components/DropdownSwitch";
import CardChart from "../components/CardChart";
import {CardChartProps} from "../models/CardChartProps";
import { getCardNazionale } from "../data/CardNazionale";
import CardChartWithTwoTables from "../components/CardChartWithTwoTables"

export default function Nazionale() {
    const arrayString = ["Stato generale cantieri","Copertura","Futuro dei cantieri","Fwa vs Fibra"];
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