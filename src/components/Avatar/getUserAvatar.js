'use server'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { UserServiceClient } from '../../generated/user.client'

export async function getUserAvatar(telegramId) {
	const transport = new GrpcWebFetchTransport({
		baseUrl: 'http://5.61.54.103:50052',
	})
	const client = new UserServiceClient(transport)

	const response = await client.getUserAvatar({ telegramId })

	return response.response.avatar.avatarUrl
}
