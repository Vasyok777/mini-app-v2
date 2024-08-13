import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './assets/styles/styles.scss'
import Crafting from './pages/Crafting'
import Friends from './pages/Friends'
import Home from './pages/Home'
import Login from './pages/Login'
import Rewards from './pages/Rewards'
import Tasks from './pages/Tasks'
import Terms from './pages/Terms'
import Welcome from './pages/Welcome'

const tg = window.Telegram.WebApp
tg.expand()

const router = createBrowserRouter([
	{
		path: '/',
		element: <Welcome />,
	},
	{
		path: '/home',
		element: <Home />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/crafting',
		element: <Crafting />,
	},
	{
		path: '/terms',
		element: <Terms />,
	},
	{
		path: '/rewards',
		element: <Rewards />,
	},
	{
		path: '/tasks',
		element: <Tasks />,
	},
	{
		path: '/friends',
		element: <Friends />,
	},
	{
		path: '/app',
		element: <App />,
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
