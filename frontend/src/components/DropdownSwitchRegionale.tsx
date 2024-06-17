import React, { useState, useEffect, useRef } from 'react';
import './DropdownSwitchRegionale.scss';
import { ChevronDown, ChevronUp } from 'react-feather';

export default function DropdownSwitchRegionale(props: {
    arrayString: string[];
    callBack: (value: string) => void;
    Select : string;
    callBackRegionale: (value: string) => void;
    selectRegionale: string;
    options: string[];
}) {
    const { arrayString, callBack, Select, callBackRegionale, selectRegionale, options} = props;
    const [selected, setSelected] = useState(Select);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRegional, setIsOpenRegional] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownRegionaleRef = useRef<HTMLDivElement>(null);
    const [selectedRegionale, setSelectedRegionale] = useState<string>(selectRegionale);
    const [filteredArrayString, setFilteredArrayString] = useState<string[]>(arrayString.filter(x => x !== selected));
    const [originalOptions, setOriginalOptions] = useState<string[]>(options);
    const [filteredOptions, setFilteredOptions] = useState<string[]>(originalOptions.filter(option => option !== selectedRegionale));

    useEffect(() => {
        setOriginalOptions(options);
        setFilteredOptions(options.filter(option => option !== selectedRegionale));
    }, [options, selectedRegionale]);

    const handleItemClick = (item: string) => {
        setSelected(item);
        callBack(item);
        setIsOpen(false);
        setFilteredArrayString(arrayString.filter(x => x !== item));
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (isOpenRegional) {
            setIsOpenRegional(false);
        }
    };

    const toggleDropdownRegionale = () => {
        setIsOpenRegional(!isOpenRegional);
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleClickOutsideRegionale = (event: MouseEvent) => {
        if (dropdownRegionaleRef.current && !dropdownRegionaleRef.current.contains(event.target as Node)) {
            setIsOpenRegional(false);
        }
    };

    const handleRegionalSelect = (item: string) => {
        setSelectedRegionale(item);
        callBackRegionale(item);
        setIsOpenRegional(false);
        setFilteredOptions(options.filter(option => option !== item));
    };

    const handleFilteredList = (value: string) => {
        const filtered = options.filter((option) =>
            option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpenRegional) {
            document.addEventListener('click', handleClickOutsideRegionale);
        } else {
            document.removeEventListener('click', handleClickOutsideRegionale);
        }
        return () => {
            document.removeEventListener('click', handleClickOutsideRegionale);
        };
    }, [isOpenRegional]);

    return (
        <div className={`dropdown-regionale ${isOpen || isOpenRegional ? 'open' : ''}`} ref={dropdownRef}>
            <div className="custom-dropdown-regionale" ref={dropdownRegionaleRef}>
                <div className="dropdown-header-regionale" onClick={toggleDropdownRegionale}>
                    {selectedRegionale.length > 6 && selectedRegionale.length > 7 ? `${selectedRegionale.slice(0, 4)}...` : selectedRegionale} {isOpenRegional ? <ChevronUp onClick={() => setIsOpenRegional(false)} /> : <ChevronDown onClick={() => setIsOpenRegional(true)} alignmentBaseline="central" />}
                </div>
                {isOpenRegional && (
                    <div className="dropdown-list-regionale">
                        <input
                            className='input-regionale'
                            onChange={(e) => handleFilteredList(e.target.value)}
                            type="search"
                            placeholder="Search..."
                        />
                        {filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleRegionalSelect(option)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="dropbtn" onClick={toggleDropdown}>{selected}</div>
            {isOpen && (
                <div className="dropdown-content">
                    {filteredArrayString.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

