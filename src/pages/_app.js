import '@/styles/globals.css'
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { LoadingBackdrop } from "@/components/LoadingBackdrop";

export default function App({ Component, pageProps }) {
    return(
        <>
            <Head>
            <link rel="icon" href="/logo.svg" />
                <title>Cleansing</title>
            </Head>

            <RecoilRoot>
                <LoadingBackdrop />
                <Component {...pageProps} />
            </RecoilRoot>

        </>
      )
}
