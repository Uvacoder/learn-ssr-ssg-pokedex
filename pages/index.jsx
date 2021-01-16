import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home({ pokemon }) {
    return (
        <Layout pageTitle={'NextJS Poxedex'}>
            <h1 className='text-center'>NextJS Pokedex</h1>
            <ul className='space-y-2 '>
                {pokemon.map((poke, index) => (
                    <li key={index}>
                        <Link href={`/pokemon/${index + 1}`}>
                            <a className='flex items-center p-4 my-2 capitalize bg-gray-200 rounded-md'>
                                <img className='w-20 h-20 mr-4' src={poke.image} alt={poke.name} />
                                <span className='mr-2 font-bold'>{index + 1}.</span>
                                <p>{poke.name}</p>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export async function getStaticProps(context) {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const { results } = await res.json();

        const pokemon = results.map((result, index) => {
            const paddedId = ('00' + (index + 1)).slice(-3);
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
            return { ...result, image };
        });

        return {
            props: {
                pokemon,
            },
        };
    } catch (err) {
        console.error(err);
    }
}
