import Country from "./components/Country";
import data from "./data/countries.json";
import "./styles.css";
import { useState } from "react";
import React from "react";

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function lessThan(a, b) {
  return a.population - b.population;
}

function alphaSort(list) {
  const countries = data.countries;
  return countries.sort(alphaCompare);
}
function ascSort(list) {
  const countries = data.countries;
  return countries.sort(lessThan);
}

function filterByContinent(list, option) {
  return list.filter(function (item) {
    return item.continent.toLowerCase() === option.toLowerCase();
  });
}
function filterByPopulationSize(list, option) {
  return list.filter(function (item) {
    const population = item.population;
    switch (option) {
      case "1":
        return population < 100000000;
      case "100m":
        return population >= 100000000 && population < 200000000;
      case "200m":
        return population >= 200000000 && population < 500000000;
      case "500m":
        return population >= 500000000;
      case "1b":
        return population >= 1000000000;
      default:
        return true;
    }
  });
}

export default function App() {
  const [sortOrder, setSortOrder] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOrder(e.target.value);
  }
  function handleFilter(e) {
    setFilterOption(e.target.value);
  }
  function sort(list) {
    if (sortOrder === "alpha") {
      return alphaSort(list);
    } else if (sortOrder === "<") {
      return ascSort(list);
    } else {
      return list;
    }
  }
  function sort(list) {
    if (sortOrder === ">") {
      return list.slice().sort((a, b) => b.population - a.population);
    } else if (sortOrder === "<") {
      return list.slice().sort((a, b) => a.population - b.population);
    } else if (sortOrder === "alpha") {
      return alphaSort(list);
    } else if (sortOrder === "shuffle") {
      return list.slice().sort(() => Math.random() - 0.5);
    } else {
      return list;
    }
  }
  function filter(list) {
    if (filterOption === "all") {
      return list;
    } else {
      return filterByContinent(list, filterOption);
    }
  }
  function filter(list) {
    if (filterOption === "all") {
      return list;
    } else if (
      filterOption === "1" ||
      filterOption === "100m" ||
      filterOption === "200m" ||
      filterOption === "500m" ||
      filterOption === "1b"
    ) {
      return filterByPopulationSize(list, filterOption);
    } else {
      return filterByContinent(list, filterOption);
    }
  }

  const sorted = sort(data.countries);
  const filtered = filter(sorted);

  //const sortedCountries = ascSort();
  //const filteredCountries = filterByContinent(sortedCountries, "europe");

  return (
    <div className="App">
      <h1> World's largest countries by population</h1>
      <div className="filters">
        <label>
          sort by:
          <select value={sortOrder} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>{" "}
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="by continent">
              <option value="all">All </option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="by population size">
              <option value="all">All </option>
              <option value="1">less than 100M</option>
              <option value="100m">100M or more</option>
              <option value="200m">200M or more</option>
              <option value="500m">500M or more</option>
              <option value="1b">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>

      <div className="countries">
        {filtered.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
