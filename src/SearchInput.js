import { debounce } from "lodash";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";

export default function SearchInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchString, setSearchString] = useState("");
  const delayedQuery = useCallback(
    debounce(async (queryString) => {
      const response = await getPeople(queryString);
      const data = await response.json();

      if (data.results && data.results.length) {
        setSearchResults(data.results);
      }
    }, 500),
    []
  );
  const handleChange = (event) => {
    setSearchString(event.target.value);
    delayedQuery(event.target.value);
  };

  return (
    <div>
      <input type="search" onChange={handleChange} value={searchString} />
      <button>Search</button>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          searchResults?.map((result) => {
            return <p key={result.name}>{result.name}</p>;
          })
        )}
      </div>
    </div>
  );
}

async function getPeople(searchString) {
  const response = await fetch(
    `https://swapi.dev/api/people/?search=${searchString}`
  );

  if (response.ok) {
    return response;
  }
}
