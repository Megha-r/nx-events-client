import {
    lazy
} from 'react';

const Overview = lazy(() => import('./Overview'));
const Query = lazy(() => import('../modules/query'));
const Wrapper = lazy(() => import('../pages/login/Wrapper'));

export {
    Overview,
    Query,
    Wrapper
};