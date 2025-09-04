import Preloader from "@/src/layouts/Preloader";
import Head from "next/head";
import Script from "next/script";
import { Fragment, useEffect, useState } from "react";
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import "/styles/globals.css";
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    // Set dir attribute based on locale with safety checks
    if (typeof window !== 'undefined' && document.documentElement) {
      const isRTL = router.locale === 'ar';
      const direction = isRTL ? 'rtl' : 'ltr';
      const language = router.locale || 'en';
      
      // Only update if values have changed to prevent unnecessary re-renders
      if (document.documentElement.getAttribute('dir') !== direction) {
        document.documentElement.setAttribute('dir', direction);
      }
      if (document.documentElement.getAttribute('lang') !== language) {
        document.documentElement.setAttribute('lang', language);
      }
      
      // Also set on body for extra compatibility
      document.body.setAttribute('dir', direction);
    }
  }, [router.locale]);

  return (
    <Fragment>
      <Head>
        {/*====== Required meta tags ======*/}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="description"
          content="Landscaping, Gardening, Florists, Groundskeeping"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/*====== Title ======*/}
        <title>Gadden - Garden &amp; Landscaping React NextJS Template</title>
        {/*====== Favicon Icon ======*/}
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.ico"
          type="image/png"
        />


      </Head>
      {loading && <Preloader />}
      {!loading && <Component {...pageProps} />}
      
      {/* WhatsApp Button */}
      <div 
        id="whatsapp-button" 
        onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '70px',
          height: '70px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-5px) scale(1.05)';
          e.target.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)';
        }}
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.690z"/>
        </svg>
      </div>
    </Fragment>
  );
};
export default appWithTranslation(App);
