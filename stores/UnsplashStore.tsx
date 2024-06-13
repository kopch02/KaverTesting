import {makeAutoObservable, runInAction} from 'mobx';
import axios from 'axios';
import unsplashApi from '../api/api';
import {Int32} from 'react-native/Libraries/Types/CodegenTypes';

class UnsplashStore {
  photos: {regular: string; download: string}[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async searchPhotos(query: string, count: Int32 = 30) {
    this.loading = true;
    this.error = null;
    console.log('Поиск фотографий начался...');

    try {
      const response = await unsplashApi.get('/photos/random', {
        params: {query, count: count},
      });
      runInAction(() => {
        // console.log('Ответ получен:', response.data);
        console.log('Ответ получен');
        this.photos = response.data.map((photo: any) => ({
          regular: photo.urls.regular,
          download: photo.links.download,
        }));
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Ошибка ответа сервера:', error);
            this.error = error.response.data;
          } else if (error.request) {
            console.error('Ошибка запроса:', error.request);
            this.error = 'Нет ответа от сервера';
          } else {
            console.error('Ошибка запроса:', error.message);
            this.error = error.message;
          }
          console.error('Конфигурация ошибки:', error.config);
        } else {
          console.error('Неизвестная ошибка:', error);
          this.error = 'Неизвестная ошибка';
        }
      });
    }
    return this.photos;
  }
}

export const unsplashStore = new UnsplashStore();
