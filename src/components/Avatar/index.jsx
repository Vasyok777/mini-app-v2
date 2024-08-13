'use client'

import { getUserAvatar } from '@/app/actions'
import { useEffect, useState } from 'react'
import './Avatar.scss'
import AvatarSvg from './AvatarSvg'

const Avatar = ({ isEdit, src }) => {
	const [avatarUrl, setAvatarUrl] = useState(src || null) // Встановлюємо початковий URL
	const [username, setUsername] = useState('U')

	const handleClick = () => {
		document.body.classList.toggle('lock')
	}

	useEffect(() => {
		const tg = window?.Telegram?.WebApp
		const initDataUnsafe = tg?.initDataUnsafe
		const user = initDataUnsafe?.user

		setUsername(user?.username ? user.username[0].toUpperCase() : 'U')

		const fetchAvatar = async () => {
			try {
				const url = await getUserAvatar(user.id)
				setAvatarUrl(url)
			} catch (error) {
				console.error('Error fetching avatar:', error)
			}
		}

		fetchAvatar()
	}, [avatarUrl, src])

	return (
		<div className='avatar'>
			{avatarUrl ? (
				<div className='avatar-img'>
					<img src={avatarUrl} alt={avatarUrl} className='avatar-image' />
				</div>
			) : (
				<div className='avatar-text'>{username}</div>
			)}
			{isEdit && (
				<button className='avatar-button' onClick={handleClick}>
					<AvatarSvg />
					Edit
				</button>
			)}
		</div>
	)
}

export default Avatar
