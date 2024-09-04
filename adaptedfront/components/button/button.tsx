interface MyButtonProps {
	onClick: () => void;
	text: string;
	className: string;
	[key: string]: any;
}

export const MyButton = ({ onClick, text, className }: MyButtonProps) => {
	return (
		<button
			// className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			className={className}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
