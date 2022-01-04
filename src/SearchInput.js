import { debounce } from "lodash";
import { useState, useEffect } from "react";
export default function SearchInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchString, setSearchString] = useState("");

  const handleChange = (event) => {
    setSearchString(event.target.value);
  };

  const debouncedCallBack = debounce(handleChange, 500);

  const handleSearch = () => {};

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await getPeople(searchString);
        const data = await response.json();
        setSearchResults(data.results);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    })();
  }, [searchString]);

  return (
    <div>
      <input type="search" onChange={debouncedCallBack} value={searchString} />
      <button onClick={handleSearch}>Search</button>
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
  const res = await fetch(
    `https://swapi.dev/api/people/?search=${searchString}`
  );

  if (res.ok) {
    return res;
  }
}
