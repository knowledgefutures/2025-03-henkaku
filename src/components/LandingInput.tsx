import { Input } from './ui/input';

const LandingInput = () => {
	return (
		<Input
			className="text-base md:text-xl py-8 bg-white/8 text-neutral-800"
			placeholder="Search for data, projects, and people..."
			onKeyDown={(evt) => {
				if (evt.key === 'Enter') {
					const target = evt.target as HTMLInputElement;
					window.location.href = `/projects?q=${target.value}`;
				}
			}}
		/>
	);
};

export default LandingInput;
