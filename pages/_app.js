import "@sass/main.scss";
import "@sass/mixin.scss";
import "@sass/parts/document.scss";
import "@sass/parts/layout.scss";
import "@sass/parts/icons.scss";
import "@sass/parts/animations.scss";
import "@sass/parts/fonts.scss";
import "@sass/parts/elements.scss";
import "@sass/parts/filters.scss";
import "@sass/parts/header.scss";
import "@sass/parts/main_nav.scss";
import "@sass/parts/footer.scss";
//import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
//export default appWithTranslation(MyApp);