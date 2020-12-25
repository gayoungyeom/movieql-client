import { ApolloClient, createHttpLink } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = createHttpLink({
    uri: 'http://localhost:4000/',
    credentials: 'same-origin',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache,
    link,
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            // root, arguments, context
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                console.log(cache);
                cache.writeData({
                    id: `Movie:${id}`, 
                    data: {
                        isLiked: !isLiked,
                    }
                });
            }
        }
    }
});

export default client;