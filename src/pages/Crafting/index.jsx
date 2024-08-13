'use client'

import ImgOne from '@/assets/img/c-1.png'
import ImgTwo from '@/assets/img/c-2.png'
import ImgThree from '@/assets/img/c-3.png'
import ImgFour from '@/assets/img/c-4.png'
import AppTitle from '@/components/UI/AppTitle'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import './Crafting.scss'

const Crafting = () => {
	const router = useRouter()

	useEffect(() => {
		const items = document.querySelectorAll('.crafting-box__item')
		let delay = 0
		const animationPromises = []

		items.forEach((item, index) => {
			const percentageText = item.querySelector('p')
			if (percentageText) {
				percentageText.innerText = '0%'
			}

			const animationPromise = new Promise(resolve => {
				setTimeout(() => {
					const targetPercentage = parseInt(
						percentageText.innerText.replace('%', ''),
						10
					)

					let currentPercentage = 0
					const interval = setInterval(() => {
						currentPercentage++
						percentageText.innerText = `${currentPercentage}%`

						const circle = item.querySelector('.progress-circle')
						if (circle) {
							const radius = circle.r.baseVal.value
							const circumference = 2 * Math.PI * radius
							const offset =
								circumference - (currentPercentage / 100) * circumference
							circle.style.strokeDashoffset = offset
						}

						if (currentPercentage >= 100) {
							clearInterval(interval)
							resolve()
						}
					}, 15)
				}, delay)

				delay += 1500
			})

			animationPromises.push(animationPromise)
		})

		Promise.all(animationPromises)
			.then(() => {
				setTimeout(() => {
					router.push('/terms')
				}, 500)
			})
			.then(() => {
				setTimeout(() => {
					router.push('/rewards')
				}, 1500)
			})
	}, [router])

	return (
		<main className='crafting wrapper'>
			<AppTitle>
				We are crafting
				<br /> your experience
			</AppTitle>
			<div className='crafting-box'>
				<div className='crafting-box__item'>
					<div className='crafting-box__item-diagram'>
						<svg width='100' height='100' className='circle'>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#e9eaed'
								strokeWidth='10'
								fill='none'
								className='progress-circle-no'
							/>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#4879b2'
								strokeWidth='10'
								fill='none'
								className='progress-circle'
								style={{ strokeDashoffset: 252.2, strokeDasharray: 252.2 }}
							/>
						</svg>
						<Image src={ImgOne} alt='' />
					</div>
					<div className='crafting-box__text'>
						<h4>Planting points</h4>
						<p>100%</p>
					</div>
				</div>
				<div className='crafting-box__item'>
					<div className='crafting-box__item-diagram'>
						<svg width='100' height='100' className='circle'>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#e9eaed'
								strokeWidth='10'
								fill='none'
								className='progress-circle-no'
							/>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#4879b2'
								strokeWidth='10'
								fill='none'
								className='progress-circle'
								style={{ strokeDashoffset: 252.2, strokeDasharray: 252.2 }}
							/>
						</svg>
						<Image src={ImgTwo} alt='' />
					</div>
					<div className='crafting-box__text'>
						<h4>Boosting bonuses</h4>
						<p>100%</p>
					</div>
				</div>
				<div className='crafting-box__item'>
					<div className='crafting-box__item-diagram'>
						<svg width='100' height='100' className='circle'>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#e9eaed'
								strokeWidth='10'
								fill='none'
								className='progress-circle-no'
							/>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#4879b2'
								strokeWidth='10'
								fill='none'
								className='progress-circle'
								style={{ strokeDashoffset: 252.2, strokeDasharray: 252.2 }}
							/>
						</svg>
						<Image src={ImgThree} alt='' />
					</div>
					<div className='crafting-box__text'>
						<h4>Customizing vibes</h4>
						<p>100%</p>
					</div>
				</div>
				<div className='crafting-box__item'>
					<div className='crafting-box__item-diagram'>
						<svg width='100' height='100' className='circle'>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#e9eaed'
								strokeWidth='10'
								fill='none'
								className='progress-circle-no'
							/>
							<circle
								cx='50'
								cy='50'
								r='40'
								stroke='#4879b2'
								strokeWidth='10'
								fill='none'
								className='progress-circle'
								style={{ strokeDashoffset: 252.2, strokeDasharray: 252.2 }}
							/>
						</svg>
						<Image src={ImgFour} alt='' />
					</div>
					<div className='crafting-box__text'>
						<h4>Daily rewards</h4>
						<p>100%</p>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Crafting
