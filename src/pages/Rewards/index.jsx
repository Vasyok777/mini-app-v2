import Header from '../../components/blocks/Header'
import AppLink from '../../components/UI/AppLink'
import AppTitle from '../../components/UI/AppTitle'
import './Rewards.scss'

const Rewards = () => {
	return (
		<div className='rewards wrapper'>
			<Header />
			<div className='rewards-content'>
				<div className='rewards-content__img'></div>
				<AppTitle>Your daily rewards</AppTitle>
				<p>
					Come back tomorrow for check-in day 2.
					<br />
					Tip: Skipping a day resets your check-in
				</p>
			</div>
			<AppLink text={'Continue'} to={'/home'} />
		</div>
	)
}
export default Rewards
