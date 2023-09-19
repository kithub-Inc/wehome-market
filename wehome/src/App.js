import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home/Home';

import Tutorial from './pages/Tutorial/Tutorial';
import Introduce from './pages/Introduce/Introduce';

import Transaction from './pages/Transaction/Transaction';
import View from './pages/View/View';

import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />

				<Route path="/tutorial" element={<Tutorial />} />
				<Route path="/introduce" element={<Introduce />} />

				<Route path="/transaction" element={<Transaction />} />
				<Route path="/transaction/:node_id" element={<View />} />

				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App;