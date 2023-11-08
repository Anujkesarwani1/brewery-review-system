import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchBreweryDetails,
  fetchBreweryReviews,
  addBreweryReview,
  API_BASE_URL,
  MOCK_URL,
  updateBreweryReview,
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
        const existingReviewIndex = reviews.findIndex(
          (review) => review.breweryId === id
        )

        if (existingReviewIndex !== -1) {
          const updatedReviews = [...reviews]
          const existingReview = updatedReviews[existingReviewIndex]

          existingReview.rating = userReview.rating
          existingReview.description = userReview.description

          await updateBreweryReview(existingReview.id, existingReview)

          setReviews(updatedReviews)
        } else {
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
