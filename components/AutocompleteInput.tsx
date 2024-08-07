'use client';

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';

function AutocompleteInput() {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

  return (
    <div >
        <form action="" className='flex gap-x-4'>
        <Input placeholder="Enter Company Name..." id="companyName"
        type="text"
        className="w-96 h-12 text-lg" onChange={handleChange}/>

        <Button className="w-24 h-12 text-md " type='submit'>Search</Button>
        </form>
        <div className='mt-2'>
            <Button className=" text-md " variant="outline">Not Listed</Button>
        </div>
    </div>
  )
}

export default AutocompleteInput