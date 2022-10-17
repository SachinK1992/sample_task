import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

export default function createApolloClient() {
  const metaTag = document.querySelector('meta[name=csrf-token]');
  const csrfToken = metaTag ? metaTag.getAttribute('content') : null;

  return new ApolloClient({
    link: createHttpLink({
      uri: '/graphql',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    }),
    cache: new InMemoryCache(),
  });
}
