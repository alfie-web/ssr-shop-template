import Head from 'next/head'
// import NavLink from './NavLink'

import Header from '../components/Header';

export default function MainLayout({ children, title = 'Next app', keywords = '', description = '' }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="keywords" content={keywords} />
				<meta name="description" content={description} />
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <nav className="Header">
				<NavLink href="/" activeClassName="Header--active"><a>Home</a></NavLink>
				<NavLink href="/about" activeClassName="Header--active"><a>About</a></NavLink>
				<NavLink href="/posts" activeClassName="Header--active"><a>Posts</a></NavLink>
			</nav> */}

			<Header />

			<main>
				{children}
			</main>
		</>
	)
} 