'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import FooterMenu from '../../components/blocks/FooterMenu'
import './Home.scss'
import HomeFarming from './HomeFarming'
import HomeSvgMoney from './HomeSvgMoney'
import TimerSvg from './TimerSvg'

const Home = () => {
	const [isFarming, setIsFarming] = useState(false)
	const [timer, setTimer] = useState(8 * 60 * 60) // 8 годин у секундах
	const [coins, setCoins] = useState(0)

	useEffect(() => {
		// Отримуємо стан із localStorage
		const storedFarmingState = localStorage.getItem('isFarming')
		const storedStartTime = localStorage.getItem('startTime')
		const storedCoins = localStorage.getItem('coins')

		if (storedFarmingState === 'true' && storedStartTime) {
			const elapsedTime = Math.floor(
				(Date.now() - parseInt(storedStartTime)) / 1000
			)
			const remainingTime = timer - elapsedTime

			if (remainingTime > 0) {
				setIsFarming(true)
				setTimer(remainingTime)
				setCoins(parseFloat(storedCoins) + (elapsedTime * 457) / (8 * 60 * 60))
			} else {
				// Якщо фармінг завершився
				localStorage.removeItem('isFarming')
				localStorage.removeItem('startTime')
				localStorage.removeItem('coins')
			}
		}
	}, [])

	const startFarming = () => {
		setIsFarming(true)
		localStorage.setItem('isFarming', 'true')
		localStorage.setItem('startTime', Date.now())
		localStorage.setItem('coins', coins)
	}

	useEffect(() => {
		let interval = null
		if (isFarming && timer > 0) {
			interval = setInterval(() => {
				setTimer(prevTimer => {
					const newTimer = prevTimer - 1
					localStorage.setItem('timer', newTimer)
					return newTimer
				})
				setCoins(prevCoins => {
					const newCoins = prevCoins + 457 / (8 * 60 * 60)
					localStorage.setItem('coins', newCoins)
					return newCoins
				})
			}, 1000)
		} else if (timer <= 0) {
			clearInterval(interval)
			localStorage.removeItem('isFarming')
			localStorage.removeItem('startTime')
			localStorage.removeItem('coins')
		}

		return () => clearInterval(interval)
	}, [isFarming, timer])

	const formatTime = time => {
		const hours = Math.floor(time / 3600)
		const minutes = Math.floor((time % 3600) / 60)
		return `${hours}h ${minutes}m`
	}

	return (
		<main className='home wrapper'>
			<div className='home__ava'>
				<Avatar />
			</div>
			<div className='home-value'>
				<HomeSvgMoney />
				{Math.floor(15710.2 + coins)} {/* Оновлюємо кількість монет */}
			</div>
			<div className='home__code'>strxssxd</div>
			<div className='home-bottom'>
				<div className='home-game'>
					<div className='home-game__bottom'>
						<div className='home-game__bottom-left'>
							<h6>Drop game</h6>
							<p>🎟 172</p>
						</div>
						<Link href={'#'} className='home-game__bottom-right'>
							Play
						</Link>
					</div>
				</div>
				<div className='home-farming'>
					<button
						className='home-farming__button app-link'
						onClick={startFarming}
						disabled={isFarming}
					>
						{isFarming ? `Farming  ${coins.toFixed(3)}` : 'Start Farming'}
						<HomeFarming />
					</button>
					{isFarming && (
						<div className='home-timer'>
							<TimerSvg /> {formatTime(timer)}
						</div>
					)}
				</div>
			</div>
			<FooterMenu />
		</main>
	)
}

export default Home
