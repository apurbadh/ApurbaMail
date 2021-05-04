import styles from '../styles/Home.module.css'
import Head from 'next/head'

function Layout({children}) {
    return (
        <div>
            <Head>
                <title>Apurba Mail</title>
            </Head>


        <div>
                {children}
        </div>
        </div>
    );
}

export default Layout;
