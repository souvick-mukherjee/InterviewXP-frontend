"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import {
  fetchSuggestions,
  clearSuggestions,
  setInputValue,
} from "@/lib/features/autocomplete/autocompleteSlice";

function AutocompleteInput() {
  const dispatch: AppDispatch = useDispatch();
  const { inputValue, suggestions, loading } = useSelector(
    (state: RootState) => state.autocomplete
  );

  // Handle input change and fetch suggestions
  useEffect(() => {
    if (inputValue) {
      dispatch(fetchSuggestions(inputValue));
    } else {
      dispatch(clearSuggestions());
    }
  }, [inputValue, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setInputValue(suggestion));
    dispatch(clearSuggestions());
  };

  return (
    <div>
      <form action="" className="flex gap-x-4">
        <div>
          <Input
            placeholder="Enter Company Name..."
            id="companyName"
            type="text"
            value={inputValue}
            className="w-96 h-12 text-lg"
            onChange={handleInputChange}
          />
          {loading && <div>Loading...</div>}
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button className="w-24 h-12 text-md " type="submit">
          Search
        </Button>
      </form>
      <div className="mt-2">
        <Button className=" text-md " variant="outline">
          Not Listed
        </Button>
      </div>
    </div>
  );
}

export default AutocompleteInput;
