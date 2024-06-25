import React, { useState, useEffect } from "react";
import CardTemplate from "../components/CardTemplate";
import CardSwitchTwoRegion from "../components/CardSwitchTwoRegion";
import DropdownSwitchTwoRegion from "../components/DropdownSwitchTwoRegion";

export default function Confronto() {
    const italianRegions: string[] = [
        "Sicilia", "Piemonte", "Marche", "Valle d'Aosta", "Toscana", "Campania", 
        "Puglia", "Veneto", "Lombardia", "Emilia Romagna", "Trentino Alto Adige-Trento", 
        "Sardegna", "Molise", "Calabria", "Abruzzo", "Lazio", "Liguria", 
        "Friuli Venezia Giulia", "Basilicata", "Umbria"
    ];

    const [firstRegion, setFirstRegion] = useState("Sicilia");
    const [secondRegion, setSecondRegion] = useState("Piemonte");
    const [filteredArray, setFilteredArray] = useState(italianRegions.filter(option => option !== firstRegion && option !== secondRegion));
    const [isViewportNarrow, setIsViewportNarrow] = useState(false);

    useEffect(() => {
        // Handler to check if viewport is narrow
        const mediaQuery = window.matchMedia("(max-width: 600px)");

        const handleViewportChange = (event: MediaQueryListEvent) => {
            setIsViewportNarrow(event.matches);
        };

        // Initial check
        setIsViewportNarrow(mediaQuery.matches);

        // Add listener
        mediaQuery.addEventListener("change", handleViewportChange);

        // Cleanup listener on unmount
        return () => {
            mediaQuery.removeEventListener("change", handleViewportChange);
        };
    }, []);

    function handleChangeRegion(value: string, index: number) {
        if (index === 0) {
            setFirstRegion(value);
            setFilteredArray(italianRegions.filter(option => option !== value && option !== secondRegion));
        } else {
            setSecondRegion(value);
            setFilteredArray(italianRegions.filter(option => option !== firstRegion && option !== value));
        }
    }

    return (
        <>
            {isViewportNarrow ? <DropdownSwitchTwoRegion arrayString={filteredArray} callBackRegionale={handleChangeRegion} firstRegion={firstRegion} secondRegion={secondRegion}/> : 
            
            <CardSwitchTwoRegion Callback={handleChangeRegion} arrayRegion={filteredArray} firstRegion={firstRegion} secondRegion={secondRegion}/> 
            } 
            <CardTemplate firstRegion={firstRegion} secondRegion={secondRegion} />
        </>
    );
}
