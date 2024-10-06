import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
	return (
		<div>
			HomePage
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default HomePage;
