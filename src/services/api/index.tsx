import axios from 'axios'

export const API_BASE_URL = 'https://api.openbrewerydb.org/breweries'
export const MOCK_URL = 'http://localhost:3000'

// Shared function to make API requests
const fetchBreweries = async (endpoint: any, params: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params })
    return response.data
  } catch (error) {
    console.error(`Error fetching breweries${endpoint}`, error)
    throw error
  }
}

// Function to fetch brewery details by ID
export const fetchBreweryDetails = async (breweryId: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${breweryId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching brewery details', error)
    throw error
  }
}

export const fetchBreweryReviews = async (breweryId: any) => {
  try {
    const response = await axios.get(
      `${MOCK_URL}/reviews/?breweryId=${breweryId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching brewery reviews', error)
    throw error
  }
}

export const addBreweryReview = async (breweryId: any, review: any) => {
  try {
    const response = await axios.post(
      `${MOCK_URL}/reviews/?breweryId=${breweryId}`,
      review
    )
    return response.data
  } catch (error) {
    console.error('Error adding review', error)
    throw error
  }
}

export const updateBreweryReview = async (reviewId: any, review: any) => {
  try {
    const response = await axios.patch(
      `${MOCK_URL}/reviews/${reviewId}`,
      review
    )
    return response.data
  } catch (error) {
    console.error('Error updating review', error)
    throw error
  }
}

export const fetchBreweriesByCity = async (city: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?by_city=${city}`)
    return response.data
  } catch (error) {
    console.error('Error fetching breweries by city', error)
    throw error
  }
}

// Function to fetch breweries by name
export const fetchBreweriesByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?by_name=${name}`)
    return response.data
  } catch (error) {
    console.error('Error fetching breweries by name', error)
    throw error
  }
}

// Function to fetch breweries by type
export const fetchBreweriesByType = async (type: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?by_type=${type}`)
    return response.data
  } catch (error) {
    console.error('Error fetching breweries by type', error)
    throw error
  }
}
