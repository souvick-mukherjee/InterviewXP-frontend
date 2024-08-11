import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import debounce from 'lodash.debounce';


const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Define the state interface
interface AutocompleteState {
  inputValue: string;
  suggestions: string[];
  loading: boolean;
  error: string | null;
}

// Define the initial state
export const initialState: AutocompleteState = {
  inputValue: '',
  suggestions: [],
  loading: false,
  error: null
};

// Create an async thunk for fetching suggestions
export const fetchSuggestions = createAsyncThunk(
    'autocomplete/fetchSuggestions',
    debounce(async (query: string) => {
      const response = await axios.get(
        `${serverUrl}/api/user/companies`,
        // {
        //   params: {
        //     query
        //   }
        // }
    );
      return response.data;
    },400)
  );

// Create a slice
const autocompleteSlice = createSlice({
    name: 'autocomplete',
    initialState,
    reducers: {
      setInputValue(state, action) {
        state.inputValue = action.payload;
      },
      clearSuggestions(state) {
        state.suggestions = [];
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSuggestions.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSuggestions.fulfilled, (state, action) => {
          state.loading = false;
          state.suggestions = action.payload;
        })
        .addCase(fetchSuggestions.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Error fetching suggestions';
        });
    }
  });
  
  export const { setInputValue, clearSuggestions } = autocompleteSlice.actions;
  
  export default autocompleteSlice.reducer;