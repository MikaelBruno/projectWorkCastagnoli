import React from "react";
import "./home.scss"

export default function Home() {

    return (
        <>
            <div className="card-home-container">
                <div className="card-p">
                    <div className="p-bull">
                        <p className="title">Progetto Bull</p>
                        <p className="description">Il progetto BUL (Banda Ultra Larga) è un'iniziativa del governo italiano volta a sviluppare e potenziare l'infrastruttura di rete a banda ultralarga su tutto il territorio nazionale. L'obiettivo principale è garantire l'accesso a Internet ad alta velocità a cittadini, imprese e pubbliche amministrazioni, anche nelle aree meno densamente popolate e più difficili da raggiungere.</p>
                    </div>
                    <div className="p-fibra">
                        <p className="title">Fibra ottica</p>
                        <p className="description">La fibra ottica è una tecnologia di trasmissione dati che utilizza filamenti di vetro o plastica, detti fibre ottiche, per inviare informazioni sotto forma di luce. Questa tecnologia è molto avanzata rispetto ai tradizionali cavi in rame, offrendo numerosi vantaggi in termini di velocità, capacità e affidabilità.</p>
                    </div>
                    <div className="p-fwa">
                        <p className="title">FWA</p>
                        <p className="description">La tecnologia FWA (Fixed Wireless Access) è una soluzione di connettività che fornisce accesso a Internet e ad altri servizi di telecomunicazione senza l'uso di cavi fisici, come quelli in fibra ottica o in rame. Utilizza onde radio per collegare un'antenna installata presso l'utente finale a una stazione base, che a sua volta è collegata alla rete principale. Questa tecnologia è particolarmente utile per fornire Internet ad alta velocità in aree dove la posa di cavi è costosa o impraticabile.</p>
                    </div>
                </div>
            </div>
        </>
    )
}