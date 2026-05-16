import { create } from 'zustand';
import API from '../api/axios';

const useMovieStore = create((set, get) => ({
  movies: [],
  watchlist: [],
  loading: false,
  error: null,

  fetchMovies: async (search = '', contentType = '') => {
    set({ loading: true, error: null });
    try {
      let url = '/movies';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (contentType) params.append('contentType', contentType);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const res = await API.get(url);
      set({ movies: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchWatchlist: async () => {
    try {
      const res = await API.get('/watchlist');
      set({ watchlist: res.data.data });
    } catch (error) {
      console.error('Failed to fetch watchlist', error);
    }
  },

  addToWatchlist: async (movieId) => {
    try {
      const res = await API.post(`/watchlist/${movieId}`);
      set({ watchlist: res.data.data });
      return true;
    } catch (error) {
      console.error('Failed to add to watchlist', error);
      return false;
    }
  },

  removeFromWatchlist: async (movieId) => {
    try {
      const res = await API.delete(`/watchlist/${movieId}`);
      set({ watchlist: res.data.data });
      return true;
    } catch (error) {
      console.error('Failed to remove from watchlist', error);
      return false;
    }
  },

  isInWatchlist: (movieId) => {
    return get().watchlist.some(id => id === movieId || (id._id && id._id === movieId));
  },

  rateMovie: async (movieId, score) => {
    try {
      const res = await API.post(`/movies/${movieId}/rate`, { score });
      // Update the local movie in the store to reflect the new rating
      set(state => ({
        movies: state.movies.map(movie => 
          movie._id === movieId ? res.data.data : movie
        )
      }));
      return res.data.data;
    } catch (error) {
      console.error('Failed to rate movie', error);
      throw error;
    }
  }
}));

export default useMovieStore;
