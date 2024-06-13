import "@/styles/globals.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';

export default function App({ Component, pageProps }) {
  return <>
    <ToastContainer />
    <Component {...pageProps} />
  </>
}
