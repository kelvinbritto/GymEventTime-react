import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './AulaCard.css';
import { Box } from '@mui/material';
import IAula from '../../interfaces/IAula';
import { useEffect, useState } from 'react';

interface Props {
	aulas: IAula[];
}

export default function AulaCard({ aulas }: Props) {
	const [aulaAtual, setAulaAtual] = useState<IAula>();

	var agora = new Date();

	setInterval(function () {
		agora = new Date();
	}, 6000);

	useEffect(() => {
		aulas.forEach((aula) => {
			var hora = aula.horario.split(':');
			if (hora[0].toString() === agora.getHours().toString()) {
				setAulaAtual(aula);
			}
		});
	}, [agora]);

	return (
		<>
			{aulaAtual && (
				<Box maxWidth="100%">
					<Card sx={{ border: '2px solid #300068' }}>
						<CardMedia
							component="img"
							image={aulaAtual.modalidade.urlLogo}
							alt={aulaAtual.modalidade.nome}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
							>
								{aulaAtual.modalidade.nome}
							</Typography>
							<Typography
								sx={{ fontSize: '1.3em' }}
								variant="body2"
								color="text.secondary"
							>
								{aulaAtual.professor.nome}
							</Typography>
						</CardContent>
						<CardContent sx={{ backgroundColor: '#bb0000' }}>
							<Typography
								gutterBottom
								variant="h5"
								component="div"
								align="center"
								fontWeight="600"
								sx={{ mt: 1.5 }}
							>
								AO VIVO
							</Typography>
						</CardContent>
					</Card>
				</Box>
			)}
		</>
	);
}
