// import React, { useState } from 'react'
// import {
//   fetchBreweriesByCity,
//   fetchBreweriesByName,
//   fetchBreweriesByType,
// } from 'services/api'

// const SearchPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState([])

//   const handleSearch = async () => {
//     try {
//       let results = []

//       if (searchQuery) {
//         if (searchQuery.includes(',')) {
//           // Search by city
//           results = await fetchBreweriesByCity(searchQuery)
//         } else if (searchQuery.length < 3) {
//           // Search by type
//           results = await fetchBreweriesByType(searchQuery)
//         } else {
//           // Search by name
//           results = await fetchBreweriesByName(searchQuery)
//         }

//         setSearchResults(results)
//       }
//     } catch (error) {
//       console.error('Error searching breweries', error)
//     }
//   }

//   return (
//     <div className="search-page">
//       <h2>Search Breweries</h2>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Enter city, name, or type"
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div className="search-results">
//         {/* Map through searchResults and display brewery information */}
//       </div>
//     </div>
//   )
// }

// export default SearchPage

// src/components/SearchPage.tsx

import React, { useState, useEffect } from 'react'
import {
  fetchBreweriesByCity,
  fetchBreweriesByName,
  fetchBreweriesByType,
} from 'services/api'
const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchType, setSearchType] = useState('city')

  useEffect(() => {
    // Implement an initial search or load data here if needed
    initialSearch()
  }, []) // Empty dependency array to run this effect only once

  const initialSearch = async () => {
    try {
      // For example, you can load breweries in a specific city when the page loads.
      const initialResults = await fetchBreweriesByCity('New York')

      setSearchResults(initialResults)
    } catch (error) {
      console.error('Error loading initial data', error)
    }
  }

  const handleSearch = async () => {
    try {
      let results = []

      if (searchQuery) {
        if (searchType === 'city') {
          results = await fetchBreweriesByCity(searchQuery)
        } else if (searchType === 'name') {
          results = await fetchBreweriesByName(searchQuery)
        } else if (searchType === 'type') {
          results = await fetchBreweriesByType(searchQuery)
        }

        setSearchResults(results)
      }
    } catch (error) {
      console.error('Error searching breweries', error)
    }
  }

  return (
    <div className="search-page">
      <h2>Search Breweries</h2>
      <div className="search-input">
        <input
          type="text"
          placeholder={`Search by ${searchType}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="city">City</option>
          <option value="name">Name</option>
          <option value="type">Type</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {searchResults.map((brewery) => (
          <div key={brewery.id}>
            <h3>{brewery.name}</h3>
            <p>
              Address: {brewery.street}, {brewery.city}, {brewery.state}
            </p>
            <p>Phone: {brewery.phone}</p>
            <p>
              Website:
              <a
                href={brewery.website_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {brewery.website_url}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
