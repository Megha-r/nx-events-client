import {
    lazy
} from 'react';

const Overview = lazy(() => import('./Overview'));
const Query = lazy(() => import('../pages/event/EventList'));
const Wrapper = lazy(() => import('../pages/login/Wrapper'));

export {
    Overview,
    Query,
    Wrapper
};