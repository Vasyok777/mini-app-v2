import Header from '../../components/blocks/Header'
import AppLink from '../../components/UI/AppLink'
import AppLogo from '../../components/UI/AppLogo'
import AppTitle from '../../components/UI/AppTitle'
import './Welcome.scss'

const Welcome = () => {
	return (
		<>
			<main className='welcome wrapper'>
				<Header />
				<div className='welcome-content'>
					<AppLogo />
					<div>
						<AppTitle>Welcome to ETFX</AppTitle>
						<p>
							Where every tap turns into treasure. Ready to make your mark and
							bloom with us? Let’s go!
						</p>
					</div>
				</div>
				<AppLink
					text={'Create account'}
					classes={'welcome-link'}
					to={'/login'}
				/>
			</main>
		</>
	)
}
export default Welcome
