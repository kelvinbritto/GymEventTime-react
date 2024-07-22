import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Banner from '../components/Banner';
import AulaCard from '../components/AulaCard';
import http from '../http';
import { useEffect, useState } from 'react';
import IGradeHoraria from '../interfaces/IGradeHoraria';
import { getWeekDay } from '../utils/utils';
import TabelaAulas from '../components/TabelaAulas';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

type DiaSemana =
	| 'segunda'
	| 'terca'
	| 'quarta'
	| 'quinta'
	| 'sexta'
	| 'sabado'
	| 'domingo';

const Home = () => {
	const [gradeAulas, setGradeAulas] = useState<IGradeHoraria>();

	const getAulas = () => {
		setInterval(() => {
			http.get('aula').then((resposta) => {
				if (resposta.status === 200) {
					setGradeAulas(resposta.data);
				}
			});
		}, 1000);
	};

	useEffect(() => {
		getAulas();
	}, []);

	const weekday = getWeekDay();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Banner />
			{gradeAulas && (
				<Box
					display="flex"
					justifyContent="space-around"
					sx={{ mt: 4, ml: '10%' }}
				>
					<AulaCard aulas={gradeAulas[weekday]} />
					<TabelaAulas aulas={gradeAulas[weekday]} />
				</Box>
			)}
		</ThemeProvider>
	);
};

export default Home;
