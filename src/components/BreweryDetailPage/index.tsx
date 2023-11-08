import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchBreweryDetails,
  fetchBreweryReviews,
  addBreweryReview,
  API_BASE_URL,
  MOCK_URL,
} from '../../services/api'
import { BreweryInfo } from 'services/utils'

const BreweryDetailPage = () => {
  const { id } = useParams()
  const [breweryDetails, setBreweryDetails] = useState<BreweryInfo | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [userReview, setUserReview] = useState({ rating: 0, description: '' })

  useEffect(() => {
    fetchBreweryData()
  }, [id])

  const fetchBreweryData = async () => {
    try {
      const details = await fetchBreweryDetails(id)
      setBreweryDetails(details)

      const breweryReviews = await fetchBreweryReviews(id)
      setReviews(breweryReviews)
    } catch (error) {
      console.error('Error fetching brewery data', error)
    }
  }

  const handleAddReview = async () => {
    try {
      if (userReview.rating > 0 && userReview.description.trim() !== '') {
        const existingReview = reviews.find((review) => review.breweryId === id)

        if (existingReview) {
          // Update an existing review
          // Modify your existing API to support updating a review
          // For example: updateBreweryReview(breweryId, reviewId, userReview)
          // Then update the corresponding review in the state
        } else {
          // Add a new review
          const newReview = {
            breweryId: id,
            rating: userReview.rating,
            description: userReview.description,
          }
          await addBreweryReview(id, newReview)

          const breweryReviews = await fetchBreweryReviews(id)
          setReviews(breweryReviews)
        }

        setUserReview({ rating: 0, description: '' })
      }
    } catch (error) {
      console.error('Error adding or updating review', error)
    }
  }

  return (
    <div className="brewery-detail-page">
      {breweryDetails && (
        <div>
          <h2>{breweryDetails.name}</h2>
          <p>
            Address: {breweryDetails.street}, {breweryDetails.city},
            {breweryDetails.state}
          </p>
          <p>Phone: {breweryDetails.phone}</p>
          <p>
            Website:
            <a
              href={breweryDetails.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {breweryDetails.website_url}
            </a>
          </p>
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
        <h3>Add or Update a Review</h3>
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
