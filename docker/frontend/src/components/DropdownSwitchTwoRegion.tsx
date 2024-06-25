import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import "./DropdownSwitchTwoRegion.scss"

export default function DropdownSwitchTwoRegion(props: {
    arrayString: string[];
    callBackRegionale: (value: string, index: number) => void;
    readonly firstRegion: string;
    readonly secondRegion: string;
}) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const secondDropdownRef = useRef<HTMLDivElement>(null);
    const { arrayString, callBackRegionale, firstRegion, secondRegion } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [secondIsOpen, setSecondIsOpen] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        if (secondDropdownRef.current && !secondDropdownRef.current.contains(event.target as Node)) {
            setSecondIsOpen(false);
        }
    };

    const toggleDropdown = (dropdown: 'first' | 'second') => {
        if (dropdown === 'first') {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSecondIsOpen(false);
            }
        } else {
            setSecondIsOpen(!secondIsOpen);
            if (!secondIsOpen) {
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOptionSelect = (option: string, index: number) => {
        callBackRegionale(option, index);
        if (index === 0) {
            setIsOpen(false);
        } else {
            setSecondIsOpen(false);
        }
    };

    return (
        <>
            <div className={`dropdown-regionale-two ${isOpen || secondIsOpen ? 'open' : ''}`}>
                <div className={`custom-dropdown-regionale ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
                    <div className="dropdown-header-regionale" onClick={() => toggleDropdown('first')}>
                        {firstRegion.length > 6 ? `${firstRegion.slice(0, 4)}...` : firstRegion}
                        {isOpen ? <ChevronUp /> : <ChevronDown alignmentBaseline="central" />}
                    </div>
                    {isOpen && (
                        <div className="dropdown-list-regionale">
                            <input
                                className='input-regionale'
                                type="search"
                                placeholder="Search..."
                            />
                            {arrayString.map((option, index) => (
                                <div
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect(option, 0)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`custom-dropdown-regionale ${secondIsOpen ? 'open' : ''}`} ref={secondDropdownRef}>
                    <div className="dropdown-header-regionale" onClick={() => toggleDropdown('second')}>
                        {secondRegion.length > 6 ? `${secondRegion.slice(0, 4)}...` : secondRegion}
                        {secondIsOpen ? <ChevronUp /> : <ChevronDown alignmentBaseline="central" />}
                    </div>
                    {secondIsOpen && (
                        <div className="dropdown-list-regionale">
                            <input
                                className='input-regionale'
                                type="search"
                                placeholder="Search..."
                            />
                            {arrayString.map((option, index) => (
                                <div
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleOptionSelect(option, 1)}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
