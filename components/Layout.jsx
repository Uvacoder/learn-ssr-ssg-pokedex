import Seo from './Seo';

export default function Layout({ pageTitle, children }) {
    return (
        <div className='bg-gray-300'>
            <Seo pageTitle={pageTitle}>
                <link rel='icon' href='/favicon.ico' />
            </Seo>
            <main className='container max-w-xl min-h-screen pt-8 mx-auto'>{children}</main>
        </div>
    );
}
