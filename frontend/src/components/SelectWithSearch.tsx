import React, { useState, useEffect } from "react";
import "./SelectWithSearch.scss";
import { ChevronDown, ChevronUp } from "react-feather";

export default function SelectWithSearch(props: {
  options: string[];
  onOptionSelect: (value: string) => void;
  selected: string;
}) {
  const { options, onOptionSelect, selected } = props;
  const [originalOptions, setOriginalOptions] = useState<string[]>(options);
  const [selectedOption, setSelectedOption] = useState<string>(selected);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(originalOptions.filter(option => option !== selectedOption));

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Ripristina i valori originali quando options cambia
    setOriginalOptions(options);
    setFilteredOptions(options.filter(option => option !== selectedOption));
  }, [options]);

  function filterCurrentSelectFromList(value:string) {
    return originalOptions.filter((option) => option !== value);
  }

  const handleOptionSelected = (value:string) => {
    setSelectedOption(value)
    setIsOpen(!isOpen);
    onOptionSelect(value)
    setFilteredOptions(originalOptions.filter(option => option !== value));
  }

  const handleFilteredList = (value: string) => {
    const filtered = originalOptions.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase()) 
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption.length > 9 && selectedOption.length > 12 ? `${selectedOption.slice(0, 9)}...` : selectedOption} {isOpen? <ChevronUp /> :<ChevronDown alignmentBaseline="central" />}      
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          <input
            onChange={(e) => handleFilteredList(e.target.value)}
            type="search"
            name=""
            id=""
            placeholder="Search..."
          />
          {filteredOptions.map((option, index) => (
            <li onClick={() => handleOptionSelected(option)} key={index}>{option.length > 12 ? `${option.slice(0, 12)}...` : option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
