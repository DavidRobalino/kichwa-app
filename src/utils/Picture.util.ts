export class PictureUtils {
  // used this method to replace the domain (local) with
  // the domain of the api (lan)
  static getAbsoluteUrl(url: string): string {
    if (url && url.includes('http://localhost:3000')) {
      return url.replace(
        'http://localhost:3000',
        process.env.EXPO_PUBLIC_API_URL as string,
      );
    }
    return url;
  }
}
