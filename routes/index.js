import Base from '../client/src/containers/Base.jsx';
import MainPage from '../client/src/containers/MainPage.jsx';

const routes = {
	component: Base,
	childRoutes: [
		{
			path: '/',
			component: MainPage
		}
	]
};

export default routes;