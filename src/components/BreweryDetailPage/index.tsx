import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  fetchBreweryDetails,
  fetchBreweryReviews,
  addBreweryReview,
  updateBreweryReview,
} from '../../services/api'
import {
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import { BreweryInfo } from 'services/utils'
import { signOut } from 'firebase/auth'
import { database } from 'firebaseConfig'

const BreweryDetailPage = () => {
  const { id } = useParams()
  const [breweryDetails, setBreweryDetails] = useState<BreweryInfo | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [userReview, setUserReview] = useState({
    userId: 0,
    rating: 0,
    description: '',
  })
  const navigate = useNavigate()

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

  // const handleAddReview = async () => {
  //   try {
  //     if (userReview.rating > 0 && userReview.description.trim() !== '') {
  //       const existingReviewIndex = reviews.findIndex(
  //         (review) => review.breweryId === id
  //       )

  //       if (existingReviewIndex !== -1) {
  //         const updatedReviews = [...reviews]
  //         const existingReview = updatedReviews[existingReviewIndex]

  //         existingReview.rating = userReview.rating
  //         existingReview.description = userReview.description

  //         await updateBreweryReview(existingReview.id, existingReview)

  //         setReviews(updatedReviews)
  //       } else {
  //         const newReview = {
  //           breweryId: id,
  //           userId: userReview.userId,
  //           rating: userReview.rating,
  //           description: userReview.description,
  //         }
  //         await addBreweryReview(id, newReview)

  //         const breweryReviews = await fetchBreweryReviews(id)
  //         setReviews(breweryReviews)
  //       }

  // setUserReview({ userId: 0, rating: 0, description: '' })
  //     }
  //   } catch (error) {
  //     console.error('Error adding or updating review', error)
  //   }
  // }

  const handleAddReview = async () => {
    try {
      const newReview = {
        breweryId: id,
        userId: userReview.userId,
        rating: userReview.rating,
        description: userReview.description,
      }
      await addBreweryReview(id, newReview)

      const breweryReviews = await fetchBreweryReviews(id)
      setReviews(breweryReviews)
      setUserReview({ userId: 0, rating: 0, description: '' })
    } catch (error) {
      console.error('Error adding or updating review', error)
    }
  }

  const handleSignOut = () => {
    signOut(database).then((val) => {
      navigate('/')
    })
  }

  return (
    <Container>
      {breweryDetails && (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h4">{breweryDetails.name}</Typography>
          <Typography>
            Address: {breweryDetails.street}, {breweryDetails.city},
            {breweryDetails.state}
          </Typography>
          <Typography>Phone: {breweryDetails.phone}</Typography>
          <Typography>
            Website:
            <a
              href={breweryDetails.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {breweryDetails.website_url}
            </a>
          </Typography>
        </Paper>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Reviews</Typography>
            {reviews.map((review, index) => (
              <div key={index}>
                <Typography>UserId: {review.userId}</Typography>
                <Typography>Rating: {review.rating}</Typography>
                <Typography>Description: {review.description}</Typography>
              </div>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Add or Update a Review</Typography>
            <TextField
              type="number"
              // InputProps={{ inputProps: { min: 1, max: 5 } }}
              label="UserId"
              variant="outlined"
              value={userReview.userId}
              onChange={(e) =>
                setUserReview({
                  ...userReview,
                  userId: parseInt(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              type="number"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              label="Rating (1-5)"
              variant="outlined"
              value={userReview.rating}
              onChange={(e) =>
                setUserReview({
                  ...userReview,
                  rating: parseInt(e.target.value),
                })
              }
              fullWidth
              margin="normal"
            />
            <TextareaAutosize
              minRows={4}
              placeholder="Description"
              value={userReview.description}
              onChange={(e) =>
                setUserReview({ ...userReview, description: e.target.value })
              }
              style={{ width: '100%', marginTop: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddReview}
              style={{ marginTop: '16px', textTransform: 'none' }}
            >
              Submit Review
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleSignOut}
        fullWidth
        size="large"
        color="error"
        sx={{ textTransform: 'none', marginTop: '2rem' }}
      >
        Sign Out
      </Button>
    </Container>
  )
}

export default BreweryDetailPage
