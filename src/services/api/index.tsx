import axios from 'axios'

const API_BASE_URL = 'https://api.openbrewerydb.org/breweries'

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

// Function to fetch brewery reviews by ID
export const fetchBreweryReviews = async (breweryId: any) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${breweryId}/reviews`)
    return response.data
  } catch (error) {
    console.error('Error fetching brewery reviews', error)
    throw error
  }
}

// Function to add a review for a brewery
export const addBreweryReview = async (breweryId: any, review: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${breweryId}/reviews`,
      review
    )
    return response.data
  } catch (error) {
    console.error('Error adding review', error)
    throw error
  }
}

// Function to fetch breweries by city
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
