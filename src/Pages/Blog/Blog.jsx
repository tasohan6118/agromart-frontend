import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../../Context/LanguageContext/LanguageContext';
import {
  BLOG_CATEGORIES,
  SEED_BLOG_POSTS,
  formatBlogDate,
  getLocalized,
} from '../../data/blogPosts';

const API_URL = 'http://localhost:5000';

const Blog = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const text = {
    en: {
      title: 'Blog & Articles',
      subtitle: 'Expert insights, farming tips, and success stories for Bangladeshi farmers',
      search: 'Search articles...',
      readTime: 'min read',
      by: 'By',
      noResults: 'No articles found. Try a different search or category.',
      loading: 'Loading articles...',
    },
    bn: {
      title: 'ব্লগ ও নিবন্ধ',
      subtitle: 'বাংলাদেশের কৃষকদের জন্য বিশেষজ্ঞ পরামর্শ, চাষাবাদ টিপস ও সাফল্যের গল্প',
      search: 'নিবন্ধ খুঁজুন...',
      readTime: 'মিনিট পড়া',
      by: 'লেখক',
      noResults: 'কোনো নিবন্ধ পাওয়া যায়নি। অন্য অনুসন্ধান বা বিভাগ চেষ্টা করুন।',
      loading: 'নিবন্ধ লোড হচ্ছে...',
    },
  };

  const t = text[language];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/blog-posts`);
        setPosts(response.data.posts || []);
      } catch {
        setPosts(SEED_BLOG_POSTS.map((post, index) => ({
          ...post,
          _id: `seed-${index}`,
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory !== 'all') {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((post) => {
        const title = getLocalized(post.title, language).toLowerCase();
        const excerpt = getLocalized(post.excerpt, language).toLowerCase();
        return title.includes(query) || excerpt.includes(query);
      });
    }

    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [posts, selectedCategory, searchQuery, language]);

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-14">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-3">{t.title}</h1>
          <p className="text-green-100 text-lg">{t.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-4 mb-8 items-stretch lg:items-center">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-yellow-400 border-yellow-400 text-gray-900 shadow-md'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-green-500'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label[language]}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 py-16">{t.noResults}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post._id || post.slug}
                to={`/blog/${post._id || post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-green-200 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={getLocalized(post.title, language)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatBlogDate(post.createdAt, language)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime} {t.readTime}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-xs text-green-700 font-medium">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {getLocalized(post.categoryLabel, language)}
                  </div>
                  <h2 className="font-bold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {getLocalized(post.title, language)}
                  </h2>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 pt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {post.authorName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
