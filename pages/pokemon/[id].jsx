import Link from 'next/link';
import Layout from '../../components/Layout';

export default function PokemonPage({ poke }) {
    return (
        <Layout>
            {/* <pre>{JSON.stringify(poke, null, 2)}</pre> */}
            <h1 className='mb-2 text-center capitalize'>{poke.name}</h1>
            <img className='mx-auto' src={poke.image} alt={poke.name} />
            <p>
                <span className='mr-2 font-bold'>Weight: </span> {poke.weight}
            </p>
            <p>
                <span className='mr-2 font-bold'>Height: </span> {poke.height}
            </p>
            <h2 className='mt-6 mb-2'>Types</h2>
            {poke.types.map((type, index) => (
                <p key={index}>{type.type.name}</p>
            ))}
            <p className='mt-10 text-center'>
                <Link href='/'>
                    <a className='underline'>Home</a>
                </Link>
            </p>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const id = params.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const poke = await res.json();
        const paddedId = ('00' + id).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        poke.image = image;

        return {
            props: {
                poke,
            },
        };
    } catch (err) {
        console.error(err);
    }
}
