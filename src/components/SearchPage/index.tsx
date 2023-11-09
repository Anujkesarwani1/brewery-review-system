import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { database } from 'firebaseConfig'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  fetchBreweriesByCity,
  fetchBreweriesByName,
  fetchBreweriesByType,
} from 'services/api'
import { BreweryInfo } from 'services/utils'

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchType, setSearchType] = useState('city')
  const navigate = useNavigate()

  useEffect(() => {
    initialSearch()
  }, [])

  const initialSearch = async () => {
    try {
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

  const handleSignOut = () => {
    signOut(database).then((val) => {
      navigate('/')
    })
  }

  return (
    // Search Breweries
    <Stack>
      <Typography variant="h3" marginBottom="1rem">
        Search Breweries
      </Typography>
      <Stack spacing={2} direction="row" alignItems="center" width="100%">
        <TextField
          type="text"
          label={`Search by ${searchType}`}
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          size="small"
        />
        <Select
          label={`${searchType}`}
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
        >
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="type">Type</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ textTransform: 'none' }}
          size="large"
          fullWidth
          color="info"
        >
          Search
        </Button>

        <Button
          onClick={handleSignOut}
          variant="contained"
          size="large"
          fullWidth
          sx={{ textTransform: 'none' }}
          color="error"
        >
          Sign Out
        </Button>
      </Stack>

      {/* Search Result */}

      <Stack className="search-results" marginTop="1rem">
        <Grid container spacing={2}>
          {searchResults.map((brewery: BreweryInfo) => (
            <Grid item key={brewery.id} xs={12} sm={6} md={4} lg={3} xl={4}>
              <Paper
                elevation={1}
                style={{ padding: '16px', border: '1px solid #ccc' }}
              >
                <Typography variant="body1" fontWeight="bold">
                  <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
                </Typography>
                <Typography>
                  Address: {brewery.street}, {brewery.city}, {brewery.state}
                </Typography>
                <Typography>Phone: {brewery.phone}</Typography>
                <Typography>
                  Website:
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brewery.website_url}
                  </a>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default SearchPage
