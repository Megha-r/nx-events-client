import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import config from '../config';

const uri = config.uri;
const subsUri = config.sUri;

const httpLink = new HttpLink({ uri });
const wsLink = new WebSocketLink({
  uri: subsUri,
  options: {
    reconnect: true,
    connectionParams: {
      auth: localStorage.getItem('token')
        ? `Bearer ${localStorage.getItem('token')}`
        : '',
    },
  },
});

wsLink.subscriptionClient.on('connecting', () => {
  console.log('connecting');
});
wsLink.subscriptionClient.on('connected', () => {
  console.log('connected');
});
wsLink.subscriptionClient.on('reconnecting', () => {
  console.log('reconnecting');
});
wsLink.subscriptionClient.on('reconnected', () => {
  console.log('reconnected');
});
wsLink.subscriptionClient.on('disconnected', () => {
  console.log('disconnected');
});

wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () => {
  return wsLink.subscriptionClient.maxConnectTimeGenerator.max;
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      auth: token ? `Bearer ${token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

export default link;
