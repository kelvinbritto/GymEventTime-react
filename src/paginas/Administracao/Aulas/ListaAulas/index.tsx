import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
	Button,
	Collapse,
	Divider,
	List,
	ListItemButton,
	ListItemText,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import IGradeHoraria from '../../../../interfaces/IGradeHoraria';
import IAula from '../../../../interfaces/IAula';
import { pegaDiaString } from '../../../../utils/utils';
import ModalEditAula from './ModalEditAula';
import { useEffect, useState } from 'react';
import http from '../../../../http';
import { notify } from '../../../../utils/notify';
type DiaSemana =
	| 'segunda'
	| 'terca'
	| 'quarta'
	| 'quinta'
	| 'sexta'
	| 'sabado'
	| 'domingo';

interface Props {
	dia: DiaSemana;
	open: boolean;
	onClick?: () => void;
	gradeHoraria?: IGradeHoraria;
	onClose: () => void;
}

const ListaAulas = ({ dia, open, onClick, gradeHoraria, onClose }: Props) => {
	const [openModalEditar, setOpenModalEditar] = useState(false);
	const [aulas, setAulas] = useState<IAula[]>();
	const handleOpenModalEditar = () => setOpenModalEditar(true);
	const handleCloseModalEditar = () => {
		setOpenModalEditar(false);
		if (onClose) onClose();
	};

	const [aulaEditar, setAulaEditar] = useState<IAula>();

	useEffect(() => {
		setAulas(gradeHoraria ? gradeHoraria[dia] : undefined);
	}, [gradeHoraria]);

	const excluir = (aulaToDelete: IAula) => {
		http.delete(`aula/${aulaToDelete.id}`)
			.then(() => {
				const listaDeAulas =
					aulas &&
					aulas.filter((aula) => aula.id !== aulaToDelete.id);
				if (listaDeAulas) setAulas([...listaDeAulas]);
				notify('Aula deletada', 'success');
			})
			.catch((e) => {
				notify(e.response.data.errors[0].message, 'error');
			});
	};

	if (!gradeHoraria) {
		return <></>;
	}

	return (
		<>
			{aulaEditar && (
				<ModalEditAula
					open={openModalEditar}
					handleClose={handleCloseModalEditar}
					aula={aulaEditar}
				/>
			)}
			<List
				sx={{
					width: '100%',
					bgcolor: 'background.paper',
				}}
				component="nav"
				aria-labelledby="nested-list-subheader"
			>
				<ListItemButton onClick={onClick}>
					<ListItemText primary={pegaDiaString(dia)} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Horário</TableCell>
									<TableCell>Modalidade</TableCell>
									<TableCell>Professor</TableCell>
									<TableCell align="center">
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{aulas &&
									aulas.map((aula: IAula) => (
										<TableRow key={aula.id}>
											<TableCell>
												{aula.horario}
											</TableCell>
											<TableCell>
												{aula.modalidade.nome}
											</TableCell>
											<TableCell>
												{aula.professor.nome}
											</TableCell>
											<TableCell align="center">
												<Button
													variant="outlined"
													onClick={() => {
														handleOpenModalEditar();
														setAulaEditar(aula);
													}}
													sx={{ mr: 0.5 }}
												>
													Editar
												</Button>
												<Button
													variant="outlined"
													color="error"
													onClick={() => {
														excluir(aula);
														onClose();
													}}
													sx={{ ml: 0.5 }}
												>
													Excluir
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Collapse>
			</List>
			<Divider component="li" sx={{ listStyleType: 'none' }} />
		</>
	);
};

export default ListaAulas;
