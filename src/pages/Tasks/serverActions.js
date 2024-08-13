'use server'

import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { UserServiceClient } from '../../generated/user.client'

const transport = new GrpcWebFetchTransport({
	baseUrl: 'http://5.61.54.103:50052',
})

const client = new UserServiceClient(transport)

export async function getUserTasks(telegramId) {
	try {
		const response = await client.getUserTasks({ telegramId })
		console.log(response.response.tasks)
		return response.response.tasks
	} catch (error) {
		console.error('Error fetching tasks:', error)
		throw error
	}
}
