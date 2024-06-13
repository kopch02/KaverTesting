import {useState, useEffect} from 'react';
import {unsplashStore} from '../stores/UnsplashStore';

const UsePhotos = (initialQuery = '') => {
  const [photos, setPhotos] = useState<{regular: string; download: string}[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPhotos = async (query = '') => {
    setLoading(true);
    try {
      const res = await unsplashStore.searchPhotos(query);
      setPhotos(res);
    } catch (err) {
      setError(unsplashStore.error);
    } finally {
      setLoading(false);
    }
  };

  const refreshPhotos = async (query = '') => {
    setRefreshing(true);
    await fetchPhotos(query);
    setRefreshing(false);
  };

  const addPhotos = async (query = '') => {
    try {
      const res = await unsplashStore.searchPhotos(query);
      setPhotos(prevPhotos => [...prevPhotos, ...res]);
    } catch (err) {
      setError(unsplashStore.error);
    }
  };

  useEffect(() => {
    fetchPhotos(initialQuery);
  }, [initialQuery]);

  return {photos, loading, error, refreshing, refreshPhotos, addPhotos};
};

export default UsePhotos;
