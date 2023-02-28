import noImage from '../assets/images/no-image.png';

export const generateBackendUrl = (path, appendSlash = true) => `${process.env.REACT_APP_API_URL}${appendSlash ? '/' : ''}${path}`;

export const generateImageUrl = (path, fallback = noImage, appendSlash = true) => path ? generateBackendUrl(path, appendSlash) : fallback;