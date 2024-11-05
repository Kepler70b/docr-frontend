"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getFiles } from '@/utils/api';

const Dropdown = ({ value, options,onChange }) => {
  const [files, setFiles] = useState([]);

  
  return (
    <>
    
      <div className=" w-full h-16  duration-150 border rounded hover:border-zinc-100/80 border-zinc-600 focus-within:border-zinc-100/80 focus-within:ring-0 ">
        <label htmlFor="dropdownfiles" className="sr-only" />
            <select
                  id="dropdownfiles"
                  name="dropdownfiles"
                  value={value} onChange={(e) => onChange(e.target.value)}
                  className="w-full h-full py-0 pl-2 bg-transparent border-0 border-transparent rounded pr-7 text-zinc-500 focus:ring-0 sm:text-sm"
            >
                      <option key="" value="" disabled selected>Select context</option>
                    
              {options.map((option) => (
                <option key={option} value={option}>{option}</option>
                ))}
            </select>
    </div>
    </>
  );
};

export default Dropdown;
