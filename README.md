
# Содержание

- [Описание](#описание)
- [Запуск](#запуск)
- [Реализованный функцианал](#реализованный-функцианал)
- [В планах](#в-планах)
- [Комметарии](#комметарии)

# Описание

это тестовое задание, в котором нужно было реализвать приложение с использованием React Native и TypeScript

суть приложения в получении фотографий с помощью REST API и отображениях их на главной страннице приложения в виде сетки

фотографии использовались с ресурса [Unsplash](https://unsplash.com/)

# Запуск

использовались:

#### npm v. 10.5.0

#### node v. 20.12.0

## установить все необходимые библиотеки

используя npm
```bash
npm i
```
или используя Yarn
```bash
yarn
```
## запуск dev сервера

### для Android

используя npm
```bash
npm run android
```
или используя Yarn
```bash
yarn android
```

### для iOS

используя npm
```bash
npm run ios
```
или используя Yarn
```bash
yarn ios
```

# Реализованный функцианал

- Просмотр фотографий с внешнего ресурса в виде сетки
- Обновление списка фотографий свайпом вверх
- Загрузка дополнительный фотографий при скролле вниз
- Поиск фотографий по ключевым словам (пока только на английском из-за ограничей api) 
- Просмотр фотографий в полноэкранном режиме при нажатии на фотографию
- Закрытие полноэкранного режима путём свайпа или нажатии кнопки
- Просмотр фотографии в увеличенном режиме при нажатии и удержании на фотографию
- Увеличение масштаба фотографии при просмотре в полноэкранном режиме

# В планах
- [ ] Доработать возможность скачивания фотографии (покачто работает только на эмуляторе)
- [ ] Добавить анимаций
- [ ] ...

# Комметарии

простировать удалось только на android, так что работоспособность на ios не могу подтвердить, но в теории дожно (наверно...)

на разработку ушло где-то 3.5 дня с учётом того, что это первый мой опыт на React Native, до этого был только 1 [проект](https://github.com/kopch02/goodline_demo_day_react) на React
