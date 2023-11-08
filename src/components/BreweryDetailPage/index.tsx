// import React from 'react'

// const BreweryDetailPage: React.FC = () => {
//   // Fetch brewery details and reviews from the database

//   return (
//     <div className="brewery-detail-page">
//       <h2>Brewery Name</h2>
//       <p>Address: Brewery Address</p>
//       <p>Phone: Phone Number</p>
//       <p>Website: Website URL</p>
//       <p>Rating: Current Rating</p>
//       <p>State, City: State, City</p>

//       <div className="reviews">
//         {/* Display existing reviews and add review functionality */}
//       </div>
//     </div>
//   )
// }

// export default BreweryDetailPage

// src/components/BreweryDetailPage.tsx

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // If you're using React Router
import {
  fetchBreweryDetails,
  fetchBreweryReviews,
  addBreweryReview,
} from '../../services/api'

const BreweryDetailPage: React.FC = () => {
  const { breweryId } = useParams() // Retrieve the brewery ID from the URL params
  const [breweryDetails, setBreweryDetails] = useState(null)
  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState({ rating: 0, description: '' })

  useEffect(() => {
    fetchBreweryData()
  }, [breweryId])

  const fetchBreweryData = async () => {
    try {
      const details = await fetchBreweryDetails(breweryId)
      const breweryReviews = await fetchBreweryReviews(breweryId)

      setBreweryDetails(details)
      setReviews(breweryReviews)
    } catch (error) {
      console.error('Error fetching brewery data', error)
    }
  }

  const handleAddReview = async () => {
    try {
      // Call your API to add a review for the brewery
      await addBreweryReview(breweryId, userReview)

      // After successfully adding the review, fetch the updated reviews
      const breweryReviews = await fetchBreweryReviews(breweryId)
      setReviews(breweryReviews)

      // Clear the user review input fields
      setUserReview({ rating: 0, description: '' })
    } catch (error) {
      console.error('Error adding review', error)
    }
  }

  return (
    <div className="brewery-detail-page">
      {breweryDetails && (
        <div>
          <h2>{breweryDetails.name}</h2>
          <p>
            Address: {breweryDetails.street}, {breweryDetails.city},{' '}
            {breweryDetails.state}
          </p>
          <p>Phone: {breweryDetails.phone}</p>
          <p>
            Website:{' '}
            <a
              href={breweryDetails.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {breweryDetails.website_url}
            </a>
          </p>
          {/* Display more details about the brewery as needed */}
        </div>
      )}

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>Description: {review.description}</p>
          </div>
        ))}
      </div>

      <div className="add-review">
        <h3>Add a Review</h3>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={userReview.rating}
          onChange={(e) =>
            setUserReview({ ...userReview, rating: parseInt(e.target.value) })
          }
        />
        <textarea
          placeholder="Description"
          value={userReview.description}
          onChange={(e) =>
            setUserReview({ ...userReview, description: e.target.value })
          }
        />
        <button onClick={handleAddReview}>Submit Review</button>
      </div>
    </div>
  )
}

export default BreweryDetailPage
