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
import Cookies from 'js-cookie'
import {REACT_APP_JSESSIONID} from "@lib/constants";
function MyApp({ Component, pageProps }) {
  Cookies.set('JSESSIONID', REACT_APP_JSESSIONID, { expires: 7 })

  return <Component {...pageProps} />
}

export default MyApp;