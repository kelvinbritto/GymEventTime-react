import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface Props {
	className?: string;
}

const Clock = ({ className }: Props) => {
	const [currentTime, setCurrentTime] = useState(
		new Date().toLocaleTimeString('pt-br', { hour12: false })
	);

	const atualizaTempo = () => {
		setInterval(() => {
			setCurrentTime(
				new Date().toLocaleTimeString('pt-br', { hour12: false })
			);
		}, 1000);
	};

	useEffect(() => {
		atualizaTempo();
	}, []);

	const date = () => {
		const today = new Date();
		const dt = dayjs(today);
		return dt.format('DD/MM/YYYY');
	};

	return (
		<Box
			display={'flex'}
			justifyItems={'center'}
			flexDirection={'column'}
			alignItems={'center'}
		>
			<Typography fontWeight={700} variant="h1" sx={{ color: 'white' }}>
				{currentTime}
			</Typography>
			<Typography
				variant="h4"
				sx={{ color: 'white', alignContent: 'center', fontSize: 28 }}
			>
				{`${date()}`}
			</Typography>
		</Box>
	);
};

export default Clock;
