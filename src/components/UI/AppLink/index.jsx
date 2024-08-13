import './AppLink.scss'

const AppLink = ({ to, text, classes }) => {
	const className = classes ? `app-link ${classes}` : 'app-link'
	return (
		<a className={className} href={to}>
			{text}
		</a>
	)
}
export default AppLink
