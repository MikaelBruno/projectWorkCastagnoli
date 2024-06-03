// CardSwitch.jsx
import React, { useState } from "react";
import "./CardSwitch.scss";

export default function CardSwitch(props: {
    arrayString: string[];
    callBack: (value: string) => void;
    Select:string;
}) {
    const { arrayString, callBack, Select} = props;
    const [selected, setSelected] = useState(Select);

    const handleItemClick = (item:string) => {
        setSelected(item);
        callBack(item);
    };

    return (
        <div className="card-switch">
            <ul>
                {arrayString.map((item, index) => (
                    <li
                        key={index}
                        className={selected === item ? "selected" : ""}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
