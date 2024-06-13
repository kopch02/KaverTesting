import {PermissionsAndroid, Platform, Alert} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const API_ACCESS = 'Bh-shZnkVd9kBU1QFl0-XMHNZUg0CY1e3-bekZY-kxY';

const requestStoragePermission = async () => {
  try {
    const grantedWrite = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to download photos.',
        buttonPositive: 'OK',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
      },
    );

    const grantedRead = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission Required',
        message: 'This app needs access to your storage to download photos.',
        buttonPositive: 'OK',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
      },
    );

    if (
      grantedWrite === PermissionsAndroid.RESULTS.GRANTED &&
      grantedRead === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};

const downloadImage = async (imageUrl: string | null) => {
  if (!imageUrl) {
    return;
  }
  if (Platform.OS === 'android') {
    const hasPermission = await requestStoragePermission();
    // if (!hasPermission) {
    //   Alert.alert('Ошибка доступа', 'Нет доступа к хранилищу, чтобы скачать изображение.');
    //   return;
    // }
    Alert.alert('Божечьки', 'К сожелению этот функцианал не доступен.');
  }

  const {config, fs} = RNFetchBlob;
  const fileName = 'my_image.jpg';
  const downloadDest = `${fs.dirs.DownloadDir}/${fileName}`;

  try {
    const res = await config({
      fileCache: true,
      appendExt: 'jpg',
    }).fetch('GET', imageUrl, {
      Authorization: `Client-ID ${API_ACCESS}`,
    });

    const tempPath = res.path();

    const fileExists = await RNFetchBlob.fs.exists(tempPath);
    if (!fileExists) {
      throw new Error('Temporary file does not exist');
    }

    const readResult = await RNFetchBlob.fs.readFile(tempPath, 'base64');
    await RNFetchBlob.fs.writeFile(downloadDest, readResult, 'base64');
    await RNFetchBlob.fs.unlink(tempPath);

    Alert.alert('Успешно', `Изображение сохранено в ${downloadDest}`);
  } catch (error) {
    Alert.alert('Ошибка', `Не удалось скачать изображение, ${error}`);
  }
};

export default downloadImage;
