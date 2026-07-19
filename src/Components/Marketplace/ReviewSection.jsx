import React, { useEffect, useMemo, useState } from 'react';
import './ReviewSection.css';

const STORAGE_KEY = 'agromart-product-reviews';

const seedReviews = (product) => {
    const name = product?.name || 'this product';
    const id = String(product?._id || product?.id || name).length;
    return [
        {
            id: `seed-${id}-1`,
            author: 'Rahim Uddin',
            rating: 5,
            title: 'Fresh and exactly as described',
            comment: `The ${name.toLowerCase()} arrived in great condition. Good quality and fair price.`,
            date: '2025-06-12',
            verified: true,
            helpful: 4,
            images: []
        },
        {
            id: `seed-${id}-2`,
            author: 'Nusrat Jahan',
            rating: 4,
            title: 'Good value',
            comment: 'Clean product and quick response from the seller. I would buy again.',
            date: '2025-05-28',
            verified: true,
            helpful: 2,
            images: []
        }
    ];
};

const readReviews = (product) => {
    if (typeof window === 'undefined') return seedReviews(product);
    try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
        const productId = String(product?._id || product?.id || product?.name);
        return Array.isArray(saved[productId]) ? saved[productId] : seedReviews(product);
    } catch {
        return seedReviews(product);
    }
};

const saveReviews = (product, reviews) => {
    if (typeof window === 'undefined') return;
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    const productId = String(product?._id || product?.id || product?.name);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...saved, [productId]: reviews }));
};

export const RatingStars = ({ value = 0, size = 'normal', interactive = false, onChange }) => (
    <span className={`review-stars review-stars-${size} ${interactive ? 'review-stars-interactive' : ''}`} role={interactive ? 'radiogroup' : undefined}>
        {[1, 2, 3, 4, 5].map((star) => interactive ? (
            <button
                type="button"
                key={star}
                className={star <= value ? 'is-filled' : ''}
                onClick={() => onChange(star)}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >★</button>
        ) : <span key={star} className={star <= Math.round(value) ? 'is-filled' : ''}>★</span>)}
    </span>
);

const ReviewSummary = ({ reviews }) => {
    const distribution = [5, 4, 3, 2, 1].map((rating) => reviews.filter((review) => review.rating === rating).length);
    const total = reviews.length;
    const average = total ? reviews.reduce((sum, review) => sum + review.rating, 0) / total : 0;

    return (
        <div className="review-summary">
            <div className="review-score">
                <strong>{average.toFixed(1)}</strong><span>/5</span>
                <RatingStars value={average} size="large" />
                <small>{total} {total === 1 ? 'rating' : 'ratings'}</small>
            </div>
            <div className="review-breakdown">
                {distribution.map((count, index) => {
                    const rating = 5 - index;
                    return (
                        <div className="review-bar-row" key={rating}>
                            <span>{rating}</span><span className="review-star-mark">★</span>
                            <div className="review-bar"><span style={{ width: `${total ? (count / total) * 100 : 0}%` }} /></div>
                            <em>{count}</em>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const ReviewCard = ({ review, onHelpful }) => (
    <article className="review-card">
        <div className="review-card-head">
            <div className="review-avatar">{review.author.charAt(0).toUpperCase()}</div>
            <div>
                <div className="review-author-line"><strong>{review.author}</strong>{review.verified && <span className="verified-badge">✓ Verified purchase</span>}</div>
                <div className="review-meta"><RatingStars value={review.rating} size="small" /><span>{new Date(review.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
            </div>
            <button className="review-more" type="button" aria-label="More review options">⋮</button>
        </div>
        {review.title && <h4>{review.title}</h4>}
        <p>{review.comment}</p>
        {review.images?.length > 0 && <div className="review-images">{review.images.map((image) => <img key={image} src={image} alt="Customer review" />)}</div>}
        <button className={`helpful-button ${review.userHelpful ? 'is-helpful' : ''}`} type="button" onClick={() => onHelpful(review.id)}>
            {review.userHelpful ? '✓' : '♡'} Helpful <span>{review.helpful || 0}</span>
        </button>
    </article>
);

const ReviewForm = ({ product, onSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [form, setForm] = useState({ author: '', title: '', comment: '', image: '' });
    const [error, setError] = useState('');

    const submitReview = (event) => {
        event.preventDefault();
        if (!rating) return setError('Please choose a star rating.');
        if (!form.author.trim() || !form.comment.trim()) return setError('Please add your name and review.');
        const review = {
            id: `review-${Date.now()}`,
            author: form.author.trim(), title: form.title.trim(), comment: form.comment.trim(), rating,
            date: new Date().toISOString(), verified: false, helpful: 0,
            images: form.image.trim() ? [form.image.trim()] : []
        };
        onSubmitted(review);
        setRating(0);
        setForm({ author: '', title: '', comment: '', image: '' });
        setError('');
    };

    return (
        <form className="review-form" onSubmit={submitReview}>
            <div className="review-form-title"><div><h3>Rate this product</h3><p>Share your experience with other buyers</p></div><RatingStars value={rating} size="large" interactive onChange={setRating} /></div>
            <div className="review-form-grid">
                <input value={form.author} onChange={(event) => setForm({ ...form, author: event.target.value })} placeholder="Your name" aria-label="Your name" />
                <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Review title (optional)" aria-label="Review title" />
            </div>
            <textarea value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} placeholder="What did you like or dislike?" rows="4" aria-label="Your review" />
            <input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="Photo URL (optional)" aria-label="Photo URL" />
            <div className="review-form-footer"><span className="review-form-error">{error}</span><button type="submit" className="review-submit">Submit review</button></div>
        </form>
    );
};

const ReviewSection = ({ product }) => {
    const [reviews, setReviews] = useState(() => readReviews(product));
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('recent');

    useEffect(() => setReviews(readReviews(product)), [product]);

    const filteredReviews = useMemo(() => {
        const result = filter === 'all' ? reviews : reviews.filter((review) => review.rating === Number(filter));
        return [...result].sort((a, b) => sort === 'helpful' ? (b.helpful || 0) - (a.helpful || 0) : new Date(b.date) - new Date(a.date));
    }, [filter, reviews, sort]);

    const addReview = (review) => {
        const next = [review, ...reviews];
        setReviews(next);
        saveReviews(product, next);
    };

    const markHelpful = (id) => {
        const next = reviews.map((review) => review.id === id ? { ...review, helpful: (review.helpful || 0) + (review.userHelpful ? -1 : 1), userHelpful: !review.userHelpful } : review);
        setReviews(next);
        saveReviews(product, next);
    };

    return (
        <section className="product-reviews" aria-label="Product reviews">
            <div className="reviews-heading"><div><span className="eyebrow">Customer feedback</span><h2>Ratings &amp; Reviews</h2><p>See what buyers say about this product</p></div><button className="write-review-button" type="button" onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}>Write a review</button></div>
            <ReviewSummary reviews={reviews} />
            <div className="review-toolbar"><strong>Product reviews <span>{reviews.length}</span></strong><div><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recent">Most recent</option><option value="helpful">Most helpful</option></select></label><label>Filter <select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All stars</option>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select></label></div></div>
            <div className="review-list">{filteredReviews.length ? filteredReviews.map((review) => <ReviewCard key={review.id} review={review} onHelpful={markHelpful} />) : <p className="no-reviews">No reviews match this filter yet.</p>}</div>
            <div id="review-form"><ReviewForm product={product} onSubmitted={addReview} /></div>
        </section>
    );
};

export const getProductReviewStats = (product) => {
    const reviews = readReviews(product);
    return { average: reviews.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0, count: reviews.length };
};

export default ReviewSection;
