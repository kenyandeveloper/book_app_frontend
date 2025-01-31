import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Grid } from '@mui/material';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book,setBook] = useState(null);
    const [review, setReview] = useState("");
    const [reviews,setReviews] = useState("");

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/books/${id}`, {
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setBook(data);
            setReviews(data.reviews || []);
        })
        .catch((error) => {
            console.error("Error fetching book details:", error);
        });
    },[id]);

    const handleAddReview = () => {
        fetch(`http://127.0.0.1:5000/books/reviews`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user.id,
                book_id: id,
                review_text: reviewText,
                rating: rating, }),
        })
        .then((response) => response.json())
        .then((data) => {
            setReviews([...reviews, data]);
            setReview("");
        })
        .catch((error) => {
            console.error("Error adding review:", error);
        });
    };
    const handleEditReview = (reviewId,updatedText,updatedRating) => {
        fetch(`http://127.0.0.1:5000/reviews/${reviewId}`, { 
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                review_text: updatedText,
                rating: updatedRating,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                
                setReviews(reviews.map((review) =>
                    review.id === reviewId ? data : review
                ));
            }
        })
        .catch((error) => {
            console.error("Error updating review:", error);
        });
    };
    const handleDeleteReview = (reviewId) => {
        fetch(`http://127.0.0.1:5000/reviews/${reviewId}`, { 
            method: "DELETE",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                
                setReviews(reviews.filter((review) => review.id !== reviewId));
            }
        })
        .catch((error) => {
            console.error("Error deleting review:", error);
        });
    };

    if (!book) {
        return <p>Loading...</p>
    }   
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Button onClick={() => navigate("/")} className="mb-4">Back to Home</Button>    
            <Typography variant="h3">{book.title}</Typography>
            <Typography variant="h5">{book.author}</Typography>
            <Typography variant="body1">{book.genre}</Typography>
            <Typography variant="body1">{book.publication_year}</Typography>
            <Typography variant="body1">{book.pages_count} pages</Typography>

            <Typography variant="h4">Reviews</Typography>
            {reviews.map((rev, index) => (
                <Typography key={index} variant="body1">{rev}</Typography>
            ))}
            <TextField
                label="Add a review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddReview}>
                Submit Review
            </Button>
        </div>

    )
    
    
}
export default BookDetail;