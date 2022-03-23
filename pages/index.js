import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ countries }) {
  return (
    <ul>
      {
        countries.map(country => (
          <li key={country.code}>
            <p>Code: {country.code} </p>
            <p>name: {country.name} </p>
            <p>emoji: {country.emoji} </p>
          </li>
        ))
      }
    </ul>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}