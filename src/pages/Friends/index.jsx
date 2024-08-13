'use client'
import { getUserReferrals } from '@/app/actions'
import { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import FooterMenu from '../../components/blocks/FooterMenu'
import AppTitle from '../../components/UI/AppTitle'
import './Friends.scss'
import FriendsDecorSvg from './FriendsDecorSvg'

const Friends = () => {
	const [userId, setUserId] = useState('')
	const [botName, setBotName] = useState(
		'slfjsdlfkjslfjsafa_bot/ma_mini_test_tg_app'
	)
	const [referralsCount, setReferralsCount] = useState(0)

	useEffect(() => {
		const tg = window?.Telegram?.WebApp
		const initDataUnsafe = tg?.initDataUnsafe
		const user = initDataUnsafe?.user
		const botNameFromTg = tg?.BotName
		if (user) {
			setUserId(user.id)
		}
		if (botNameFromTg) {
			setBotName(botNameFromTg)
		}
	}, [])

	useEffect(() => {
		const fetchReferrals = async () => {
			const response = await getUserReferrals(userId)
			if (response.success) {
				setReferralsCount(response.data.total_count)
			}
		}

		if (userId) {
			fetchReferrals()
		}
	}, [userId])

	const handleOpenInvite = () => {
		document.body.classList.toggle('lock')
	}

	const handleClose = () => {
		document.body.classList.remove('lock')
	}

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			handleClose()
		}
	}

	const handleShare = () => {
		const shareData = {
			title: 'Join Blum!',
			text: 'Join me on Blum and start earning points!',
			url: `https://t.me/${botName}?start=${userId}`,
		}

		if (navigator.share) {
			navigator
				.share(shareData)
				.then(() => console.log('Successful share'))
				.catch(error => console.log('Error sharing', error))
		} else {
			alert('Sharing is not supported on your device')
		}
	}

	const handleCopyLink = () => {
		const inviteLink = `https://t.me/${botName}?start=${userId}`
		navigator.clipboard
			.writeText(inviteLink)
			.then(() => {
				alert('Link copied to clipboard!')
			})
			.catch(error => {
				console.error('Failed to copy the link: ', error)
			})
	}

	useEffect(() => {
		const overlay = document.querySelector('.friends-choose__overlay')
		if (overlay) {
			overlay.addEventListener('click', handleOverlayClick)
		}

		return () => {
			if (overlay) {
				overlay.removeEventListener('click', handleOverlayClick)
			}
		}
	}, [])

	return (
		<>
			<main className='friends wrapper'>
				<div className='friends__ava'>
					<Avatar />
				</div>
				<AppTitle>
					Invite friends
					<br />
					and earn points
				</AppTitle>
				<div className='friends__bottom'>
					<div className='friends-steps'>
						<div className='friends-steps__left'>
							<FriendsDecorSvg />
						</div>
						<div className='friends-steps__right'>
							<div className='friends-steps__right-item'>
								<h4>Share your invitation link</h4>
								<p>Get a 🎟 play pass for each friend</p>
							</div>
							<div className='friends-steps__right-item'>
								<h4>Your friends join Blum</h4>
								<p>And start farming points</p>
							</div>
							<div className='friends-steps__right-item'>
								<h4>Score 10% from buddies</h4>
								<p>Plus an extra 2.5% from their referrals</p>
							</div>
						</div>
					</div>
					<button className='friends__button' onClick={handleOpenInvite}>
						Invite a fren (10 left)
					</button>
					<FooterMenu />
				</div>
				<div className='friends-choose'>
					<h4>Edit avatar</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
					<button className='friends-choose__button' onClick={handleShare}>
						Send
					</button>
					<div className='friends-choose__invite' onClick={handleCopyLink}>
						<div className='friends-choose__invite-link'>Copy link</div>
					</div>
					<button className='friends-choose__cancel' onClick={handleClose}>
						Close
					</button>
				</div>
			</main>
			<div className='friends-choose__overlay'></div>
		</>
	)
}
export default Friends
