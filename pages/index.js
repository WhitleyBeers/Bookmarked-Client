import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getFollowingReviews } from '../api/reviewData';
import ReviewCard from '../components/cards/ReviewCard';

function Home() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  const getReviews = () => {
    getFollowingReviews(user.id).then(setReviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="text-center mt-4">
      <h1>Hello {user.first_name}! </h1>
      <div className="my-2 d-flex justify-content-center flex-wrap">
        {reviews.length ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} obj={review} onUpdate={getReviews} />
          ))
        ) : (
          <h4>Nothing to show!</h4>
        )}
      </div>
    </div>
  );
}

export default Home;
