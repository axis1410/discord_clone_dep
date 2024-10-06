import { ModeToggle } from "@/components/ModeToggle";
import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
	return (
		<div>
			<UserButton afterSignOutUrl="/" />
			<ModeToggle />
		</div>
	);
};

export default HomePage;
