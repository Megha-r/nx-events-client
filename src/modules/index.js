import {
    lazy
} from 'react';

const Overview = lazy(() => import('./Overview'));
const Query = lazy(() => import('./query'));

export {
    Overview,
    Query
};