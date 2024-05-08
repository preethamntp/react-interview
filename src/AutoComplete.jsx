import React, { useCallback, useEffect, useMemo, useState } from "react";

function AutoComplete() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "A watched pot never boils",
    "Action speak louder than words",
  ];

  useEffect(() => {
    setResults(sentences);
  }, []);

  //   const memoised = useMemo(() => {
  //     setResults([
  //       "The quick brown fox jumps over the lazy dog",
  //       "A watched pot never boils",
  //       "Action speak louder than words",
  //     ]);
  //   }, []);

  const searchAPI = (query) => {
    const LATENCY = 200;
    return new Promise((resolve, reject) => {
      console.log("Fetching details");
      const result = [];

      if (!query) return resolve(result);

      const queryLower = query.toLowerCase();

      for (const sentence of sentences) {
        const sentenceLower = sentence.toLowerCase();
        if (sentenceLower.includes(queryLower)) {
          result.push(sentence);
        }
      }

      setTimeout(() => {
        resolve(result);
      }, LATENCY);
    });
  };

  const debounce = (callback, delay) => {
    let timer;
    return function (...args) {
      console.log(args);
      if (!args.length) return setResults(sentences);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  };

  const debounceSearchAPI = useCallback(
    debounce((query) => {
      searchAPI(query)
        .then((res) => {
          setResults(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }, 500),
    []
  );

  const onChange = (query) => {
    setSearchText(query);
    debounceSearchAPI(query);
    // searchAPI(query)
    //   .then((res) => {
    //     setResults(res);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div>
      <input
        id="search"
        type="search"
        placeholder="search"
        value={searchText}
        onChange={(e) => onChange(e.target.value)}
      />
      <div id="results">
        {results.map((result, idx) => (
          <div key={idx} id="result" onClick={() => setSearchText(result)}>
            {result}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AutoComplete;
