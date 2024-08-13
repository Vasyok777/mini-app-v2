'use server'

import { TradingGameServiceClient } from '@/generated/trading.client'
import { UserServiceClient } from '@/generated/user.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const transport = new GrpcWebFetchTransport({
	baseUrl: 'http://5.61.54.103:50052',
})

const trading = new GrpcWebFetchTransport({
	baseUrl: 'http://5.61.54.103:50053',
})

const client = new UserServiceClient(transport)
const game = new TradingGameServiceClient(trading)

export const getUserTasks = async telegramId => {
	const response = await client.getUserTasks({ telegramId })
	return response.response.tasks
}

export const createUser = async (telegramId, nickname) => {
	const response = await client.createUser({ telegramId, nickname })
	return response.response.user
}

export const getUserAvatar = async telegramId => {
	const response = await client.getUserAvatar({ telegramId })
	return response.response.avatar.avatarUrl
}

export const setUserAvatar = async (telegramId, avatarUrl) => {
	const response = await client.setUserAvatar({
		telegramId: telegramId,
		avatarUrl,
	})
	return response.response
}

export const getUserReferrals = async telegramId => {
	const response = await client.getUserReferrals({ telegramId })
	console.log(response.response)
	return response.response
}
