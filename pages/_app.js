import PropTypes from 'prop-types';
import '../src/styles/globals.css';

export function reportWebVitals({ id, name, label, value }) {
  if (process.env.NODE_ENV === 'production' && window && window.gtag) {
    window.gtag('event', name, {
      event_category:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  }
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]),
  pageProps: PropTypes.shape({}),
};

export default MyApp;
