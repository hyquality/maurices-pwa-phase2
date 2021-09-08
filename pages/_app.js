//import "@styles/globals.css";
import "@sass/main.scss";
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

//export default MyApp;
export default appWithTranslation(MyApp);