import {
    lazy
} from 'react';

const Overview = lazy(() => import('./Overview'));
// const Query = lazy(() => import('../modules/query'));
// const Wrapper = lazy(() => import('../pages/login/Wrapper'));
const Query = lazy(() => import('../pages/event/EventList'));
const TeamList = lazy(() => import('../pages/team/ListTeam'))
const LoginWrapper = lazy(() => import('../pages/login/Wrapper'));
const AddTeamWrapper = lazy(() => import('../pages/team/Wrapper'));
const ProfileWrapper = lazy(() => import('../pages/user/Wrapper'));

export {
    TeamList,
    Overview,
    Query,
    ProfileWrapper,
    LoginWrapper,
    AddTeamWrapper
};