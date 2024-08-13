import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import React, { useState } from 'react'
import './App.css'
import { CreateUserRequest, UserRequest } from './generated/user'
import { UserServiceClient } from './generated/user.client'

function App() {
	const [userId, setUserId] = useState('')
	const [user, setUser] = useState(null)
	const [name, setName] = useState('')

	// Initialize gRPC transport and client
	const transport = new GrpcWebFetchTransport({
		baseUrl: 'http://5.61.54.103:50052',
	})

	const client = new UserServiceClient(transport)

	// Handle user creation
	const handleCreateUser = async () => {
		if (!name) {
			console.error('Name is required')
			return
		}

		const request = CreateUserRequest.create({ name })
		try {
			const response = await client.createUser(request)
			const userData = response.response.user
			setUserId(userData.telegramId.toString())
			setUser({
				id: userData.telegramId.toString(),
				createdAt: userData.createdAt.toString(),
				nickname: userData.nickname || '', // Default to empty string if undefined
				points: userData.points.toString(),
			})
			console.log('User created:', userData)
		} catch (error) {
			console.error('Error creating user:', error)
		}
	}

	// Handle fetching user information
	const handleGetUser = async () => {
		if (!userId) {
			console.error('User ID is required')
			return
		}

		const request = UserRequest.create({ id: userId })
		try {
			const response = await client.getUser(request)
			const userData = response.response.user
			setUser({
				id: userData.telegramId.toString(),
				createdAt: userData.createdAt.toString(),
				nickname: userData.nickname || '', // Default to empty string if undefined
				points: userData.points.toString(),
			})
			console.log('User fetched:', userData)
		} catch (error) {
			console.error('Error fetching user:', error)
		}
	}

	return (
		<div className='App'>
			<h1>Hello mobile version</h1>
			<div>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<button onClick={handleCreateUser}>Create User</button>
			</div>
			<div>
				<input
					type='text'
					placeholder='User ID'
					value={userId}
					onChange={e => setUserId(e.target.value)}
				/>
				<button onClick={handleGetUser}>Get User</button>
			</div>
			{user && (
				<div>
					<h2>User Info</h2>
					<p>ID: {user.id}</p>
					<p>Created At: {user.createdAt}</p>
					<p>Nickname: {user.nickname}</p>
					<p>Points: {user.points}</p>
				</div>
			)}
		</div>
	)
}

export default App
