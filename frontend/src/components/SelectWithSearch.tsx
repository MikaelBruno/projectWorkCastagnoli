import React, { useState, useEffect, useRef } from "react";
import "./SelectWithSearch.scss";
import { ChevronDown, ChevronUp } from "react-feather";

interface Props {
  options: string[];
  onOptionSelect: (value: string) => void;
  selected: string;
}

const SelectWithSearch: React.FC<Props> = ({ options, onOptionSelect, selected }) => {
  const [originalOptions, setOriginalOptions] = useState<string[]>(options);
  const [selectedOption, setSelectedOption] = useState<string>(selected);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options.filter(option => option !== selectedOption));

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Riferimento al nodo del dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Ripristina i valori originali quando options cambia
    setOriginalOptions(options);
    setFilteredOptions(options.filter(option => option !== selectedOption));
  }, [options]);

  useEffect(() => {
    // Aggiungi un event listener globale per chiudere il dropdown se clicchi fuori da esso
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Funzione per gestire il clic fuori dal dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleOptionSelected = (value:string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onOptionSelect(value);
    setFilteredOptions(originalOptions.filter(option => option !== value));
  };

  const handleFilteredList = (value: string) => {
    const filtered = originalOptions.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase()) 
    );
    setFilteredOptions(filtered);
  };

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
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
};

export default SelectWithSearch;
