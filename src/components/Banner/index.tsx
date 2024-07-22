import { Box } from '@mui/material';
import Clock from '../Clock';

const Banner = () => {
	return (
		<Box
			height={200}
			width="100%"
			display="flex"
			alignItems="center"
			justifyContent="center"
			sx={{ backgroundColor: 'black', borderBottom: '2px solid #300068' }}
		>
			<Box
				display="flex"
				alignItems="flex-start"
				justifyContent="flex-start"
				position="absolute"
				top={0}
				left={0}
				ml={5}
				mt={3}
			>
				<img
					src="https://i.ibb.co/LkMPjMv/Mixplaytv-Logo.png"
					alt="Logo"
					style={{ maxWidth: '60%', height: 'auto' }}
				></img>
			</Box>
			<Clock />
		</Box>
	);
};

export default Banner;
