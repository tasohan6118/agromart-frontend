import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import userAuth from '../../Hooks/userAuth';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';
import {
  SEED_BLOG_POSTS,
  SEED_BLOG_COMMENTS,
  formatBlogDate,
  formatBlogDateLong,
  getLocalized,
} from '../../data/blogPosts';

const API_URL = 'http://localhost:5000';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = userAuth();
  const { language } = useLanguage();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const text = {
    en: {
      home: 'Home',
      blog: 'Blog',
      recentPosts: 'Recent Posts',
      readTime: 'min read',
      tags: 'Tags',
      share: 'Share',
      leaveComment: 'Leave a Comment',
      yourName: 'Your Name',
      yourEmail: 'Your Email',
      commentPlaceholder: 'Write your comment...',
      postComment: 'Post Comment',
      comments: 'Comments',
      relatedArticles: 'Related Articles',
      viewAllArticles: 'View All Articles',
      notFound: 'Article not found',
      backToBlog: 'Back to Blog',
      loading: 'Loading article...',
    },
    bn: {
      home: 'হোম',
      blog: 'ব্লগ',
      recentPosts: 'সাম্প্রতিক পোস্ট',
      readTime: 'মিনিট পড়া',
      tags: 'ট্যাগ',
      share: 'শেয়ার',
      leaveComment: 'মন্তব্য করুন',
      yourName: 'আপনার নাম',
      yourEmail: 'আপনার ইমেইল',
      commentPlaceholder: 'আপনার মন্তব্য লিখুন...',
      postComment: 'মন্তব্য পোস্ট করুন',
      comments: 'মন্তব্য',
      relatedArticles: 'সম্পর্কিত নিবন্ধ',
      viewAllArticles: 'সব নিবন্ধ দেখুন',
      notFound: 'নিবন্ধ পাওয়া যায়নি',
      backToBlog: 'ব্লগে ফিরে যান',
      loading: 'নিবন্ধ লোড হচ্ছে...',
    },
  };

  const t = text[language];

  useEffect(() => {
    if (user) {
      setCommentForm((prev) => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const [postRes, allRes] = await Promise.all([
          axios.get(`${API_URL}/blog-posts/${id}`),
          axios.get(`${API_URL}/blog-posts?limit=10`),
        ]);

        setPost(postRes.data.post);
        setLikes(postRes.data.post.likes || 0);
        setRecentPosts(
          (allRes.data.posts || [])
            .filter((p) => p._id !== id && p.slug !== id)
            .slice(0, 4)
        );

        try {
          const commentsRes = await axios.get(`${API_URL}/blog-posts/${id}/comments`);
          setComments(commentsRes.data.comments || []);
        } catch {
          setComments([]);
        }
      } catch {
        const seedIndex = SEED_BLOG_POSTS.findIndex(
          (p, i) => p.slug === id || `seed-${i}` === id
        );
        const seedPost = seedIndex >= 0 ? SEED_BLOG_POSTS[seedIndex] : null;

        if (seedPost) {
          setPost({ ...seedPost, _id: `seed-${seedIndex}` });
          setLikes(seedPost.likes || 0);
          setRecentPosts(
            SEED_BLOG_POSTS.filter((_, i) => `seed-${i}` !== id && _.slug !== id)
              .slice(0, 4)
              .map((p, i) => ({ ...p, _id: `seed-${i}` }))
          );
          setComments(
            SEED_BLOG_COMMENTS.filter((c) => c.slug === seedPost.slug).map((c, i) => ({
              ...c,
              _id: `comment-${i}`,
            }))
          );
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return recentPosts.filter((p) => p.category === post.category).slice(0, 3);
  }, [post, recentPosts]);

  const handleLike = async () => {
    try {
      const res = await axios.patch(`${API_URL}/blog-posts/${id}/like`);
      if (res.data.likes !== undefined) setLikes(res.data.likes);
      else setLikes((prev) => prev + 1);
    } catch {
      setLikes((prev) => prev + 1);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = getLocalized(post?.title, language);
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.content.trim()) return;

    setSubmitting(true);
    const newComment = {
      authorName: commentForm.name.trim(),
      authorEmail: commentForm.email.trim(),
      content: commentForm.content.trim(),
      createdAt: new Date().toISOString(),
      _id: `local-${Date.now()}`,
    };

    try {
      await axios.post(`${API_URL}/blog-posts/${id}/comments`, {
        authorName: newComment.authorName,
        authorEmail: newComment.authorEmail,
        content: newComment.content,
      });
      const commentsRes = await axios.get(`${API_URL}/blog-posts/${id}/comments`);
      setComments(commentsRes.data.comments || []);
    } catch {
      setComments((prev) => [...prev, newComment]);
    }

    setCommentForm((prev) => ({ ...prev, content: '' }));
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{t.notFound}</h2>
        <Link to="/blog" className="text-green-600 hover:underline">{t.backToBlog}</Link>
      </div>
    );
  }

  const postTitle = getLocalized(post.title, language);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={post.imageUrl}
          alt={postTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {postTitle}
            </h1>
            <p className="text-white/90 text-lg mb-4 max-w-3xl line-clamp-2">
              {getLocalized(post.excerpt, language)}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatBlogDateLong(post.createdAt, language)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime} {t.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.authorName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-green-600">{t.home}</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-green-600">{t.blog}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs md:max-w-md">{postTitle}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              {(post.sections || []).map((section, index) => (
                <div key={index} className={index > 0 ? 'mt-8 pt-8 border-t border-gray-100' : ''}>
                  <h2 className="text-xl font-bold text-green-800 mb-4">
                    {getLocalized(section.title, language)}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {getLocalized(section.content, language)}
                  </p>
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                          <span>{getLocalized(item, language)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-gray-600 font-medium inline-flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  {t.tags}:
                </span>
                {(post.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">{t.share}:</span>
                  <button
                    type="button"
                    onClick={() => handleShare('facebook')}
                    className="w-9 h-9 rounded-lg bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90"
                    aria-label="Share on Facebook"
                  >
                    f
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('twitter')}
                    className="w-9 h-9 rounded-lg bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 text-sm font-bold"
                    aria-label="Share on Twitter"
                  >
                    𝕏
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('whatsapp')}
                    className="w-9 h-9 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-90"
                    aria-label="Share on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleLike}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="font-semibold text-gray-700">{likes}</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 text-center">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-green-100"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.authorName}</h3>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                {getLocalized(post.authorBio, language)}
              </p>
              <Link
                to="/blog"
                className="inline-block px-6 py-2.5 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-500 transition-colors"
              >
                {t.viewAllArticles}
              </Link>
            </div>

            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-6">{t.relatedArticles}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related._id || related.slug}
                      to={`/blog/${related._id || related.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={related.imageUrl}
                          alt={getLocalized(related.title, language)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-3 space-y-1">
                        <div className="flex gap-2 text-xs text-gray-500">
                          <span>{formatBlogDate(related.createdAt, language)}</span>
                          <span>·</span>
                          <span>{related.readTime} {t.readTime}</span>
                        </div>
                        <h3 className="font-bold text-sm line-clamp-2 group-hover:text-green-700">
                          {getLocalized(related.title, language)}
                        </h3>
                        <p className="text-xs text-gray-500">{related.authorName}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                {t.comments} ({comments.length})
              </h2>

              <form
                onSubmit={handleCommentSubmit}
                className="bg-white rounded-2xl border border-gray-200 p-6 mb-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">{t.leaveComment}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder={t.yourName}
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                  <input
                    type="email"
                    placeholder={t.yourEmail}
                    value={commentForm.email}
                    onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  />
                </div>
                <textarea
                  placeholder={t.commentPlaceholder}
                  value={commentForm.content}
                  onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4 resize-none"
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors disabled:opacity-60"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {t.postComment}
                </button>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center shrink-0">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{comment.authorName}</span>
                        <span className="text-sm text-gray-500">
                          {formatBlogDateLong(comment.createdAt, language)}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-4">
              <h3 className="font-bold text-green-800 mb-4 inline-flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t.recentPosts}
              </h3>
              <div className="space-y-4">
                {recentPosts.map((recent) => (
                  <Link
                    key={recent._id || recent.slug}
                    to={`/blog/${recent._id || recent.slug}`}
                    className="flex gap-3 group"
                  >
                    <img
                      src={recent.imageUrl}
                      alt={getLocalized(recent.title, language)}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                        {getLocalized(recent.title, language)}
                      </h4>
                      <span className="text-xs text-gray-500 inline-flex items-center gap-1 mt-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatBlogDate(recent.createdAt, language)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
