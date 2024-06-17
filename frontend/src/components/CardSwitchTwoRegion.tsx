import "./CardSwitchTwoRegion.scss"
import SelectWithSearch from "./SelectWithSearch";

export default function CardSwitchTwoRegion(
    props: {
        readonly firstRegion : string;
        readonly secondRegion : string;
        readonly arrayRegion : string[];
        readonly Callback: (value: string, index : number) => void;
    }
) {
    const {firstRegion,secondRegion, arrayRegion, Callback} = props


    return (<>
    <div className="card-switch-regions">
        <SelectWithSearch options={arrayRegion} selected={firstRegion} onOptionSelect={(x) => Callback(x, 0)}/>
        <SelectWithSearch options={arrayRegion} selected={secondRegion} onOptionSelect={(x) => Callback(x, 1)}/>
    </div>

    </>)
}