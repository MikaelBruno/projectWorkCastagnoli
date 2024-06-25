// CardSwitch.jsx
import React, { useState } from "react";
import SelectWithSearch from "./SelectWithSearch";

export default function CardSwitchRegionale(props: {
    arrayString: string[];
    callBack: (value: string) => void;
    Select: string;
    callBackRegionale: (value: string) => void;
    selectRegionale: string;
    options: string[];
}) {
    const { arrayString, callBack, Select, options, callBackRegionale, selectRegionale} = props;
    const [selected, setSelected] = useState(Select);

    const handleItemClick = (item:string) => {
        setSelected(item);
        callBack(item);
        console.log(item)
    };

    return (
        <div className="card-switch">
            <ul>
                <li>
                    <SelectWithSearch options= {options} onOptionSelect={(x) => callBackRegionale(x)} selected={selectRegionale}/>
                </li>
                {arrayString.map((item, index) => (
                    <li
                        key={index}
                        className={selected === item ? "selected" : ""}
                        onClick={() => {
                            handleItemClick(item);
                            
                            }
                        }
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}


