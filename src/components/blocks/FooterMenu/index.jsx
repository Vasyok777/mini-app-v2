'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './FooterMenu.scss'
import FriendsSvg from './svg/FriendsSvg'
import HomeSvg from './svg/HomeSvg'
import TasksSvg from './svg/TasksSvg'

const FooterMenu = () => {
	const pathname = usePathname()
	return (
		<div className='footer-menu'>
			<Link
				href={'/home'}
				className={`footer-menu__link footer-menu__link-home ${
					pathname === '/home' ? 'active' : ''
				}`}
			>
				<HomeSvg />
				Home
			</Link>
			<Link
				href={'/tasks'}
				className={`footer-menu__link ${pathname === '/tasks' ? 'active' : ''}`}
			>
				<TasksSvg />
				Tasks
			</Link>
			<Link
				href={'/friends'}
				className={`footer-menu__link ${
					pathname === '/friends' ? 'active' : ''
				}`}
			>
				<FriendsSvg />
				Friends
			</Link>
		</div>
	)
}

export default FooterMenu
