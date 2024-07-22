import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import IAula from '../../interfaces/IAula';
import { retiraAulasPassadas } from '../../utils/utils';
import { useEffect, useState } from 'react';

interface Props {
	aulas: IAula[];
}

const TabelaAulas = ({ aulas }: Props) => {
	const [proximas, setProximas] = useState<IAula[]>([]);

	useEffect(() => {
		setInterval(function () {
			setProximas(retiraAulasPassadas(aulas));
		}, 1000);
	}, [aulas, proximas]);

	return (
		<>
			{proximas[0] && (
				<Paper sx={{ width: '50%', border: '2px solid #300068' }}>
					<TableContainer sx={{ maxWidth: '100%', maxHeight: 500 }}>
						<Table aria-label="sticky table">
							<TableHead sx={{ backgroundColor: '#300068' }}>
								<TableRow>
									<TableCell
										align="center"
										sx={{
											fontWeight: 700,
											fontSize: '1em',
										}}
									>
										Aula
									</TableCell>
									<TableCell
										align="center"
										sx={{
											fontWeight: 700,
											fontSize: '1em',
										}}
									>
										Professor
									</TableCell>
									<TableCell
										align="center"
										sx={{
											fontWeight: 700,
											fontSize: '1em',
										}}
									>
										Horário
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{aulas &&
									proximas.map((aula) => (
										<TableRow key={aula.id}>
											<TableCell
												align="center"
												component="th"
												scope="row"
											>
												{aula.modalidade.nome}
											</TableCell>
											<TableCell align="center">
												{aula.professor.nome}
											</TableCell>
											<TableCell align="center">
												{aula.horario}
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			)}
		</>
	);
};

export default TabelaAulas;
