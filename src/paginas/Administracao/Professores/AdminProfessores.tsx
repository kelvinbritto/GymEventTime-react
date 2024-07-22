import IProfessor from '../../../interfaces/IProfessor';
import http from '../../../http';
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ModalEditarProfessor from './ModalProfessor';
import ModalAddProfessor from './ModalAddProfessor';
import { notify } from '../../../utils/notify';

const AdminProfessores = () => {
	const [professores, setProfessores] = useState<IProfessor[]>([]);

	const [openModalCriar, setOpenModalCriar] = useState(false);
	const handleOpenModalCriar = () => setOpenModalCriar(true);
	const handleCloseModalCriar = () => setOpenModalCriar(false);

	const [openModalEditar, setOpenModalEditar] = useState(false);
	const handleOpenModalEditar = () => setOpenModalEditar(true);
	const handleCloseModalEditar = () => setOpenModalEditar(false);
	const [professorEditar, setProfessorEditar] = useState<IProfessor>();

	useEffect(() => {
		http.get<IProfessor[]>('professor')
			.then((resposta) => setProfessores(resposta.data))
			.catch((e) => {
				notify(e.response.data.errors[0].message, 'error');
			});
	}, [openModalCriar, openModalEditar]);

	const excluir = (professorToDelete: IProfessor) => {
		http.delete(`professor/${professorToDelete.id}`)
			.then(() => {
				const listaDeProfessores = professores.filter(
					(professor) => professor.id !== professorToDelete.id
				);
				setProfessores([...listaDeProfessores]);
				notify('Professor deletado', 'success');
			})
			.catch((e) => {
				notify(e.response.data.errors[0].message, 'error');
			});
	};

	return (
		<>
			<Typography
				variant="h5"
				sx={{
					textDecoration: 'underline',
					textDecorationColor: ' #1976d230;',
					mb: 2,
				}}
			>
				Professores
			</Typography>
			<Button
				variant="contained"
				onClick={handleOpenModalCriar}
				sx={{ mb: 2 }}
				color="success"
			>
				Novo Professor
			</Button>
			<ModalAddProfessor
				open={openModalCriar}
				handleClose={handleCloseModalCriar}
			/>
			<ModalEditarProfessor
				open={openModalEditar}
				handleClose={handleCloseModalEditar}
				professor={professorEditar}
			/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{professores.map((professor) => (
							<TableRow key={professor.id}>
								<TableCell>{professor.nome}</TableCell>
								<TableCell align="center">
									<Button
										variant="outlined"
										onClick={() => {
											handleOpenModalEditar();
											setProfessorEditar(professor);
										}}
										sx={{ mr: 0.5 }}
									>
										Editar
									</Button>
									<Button
										variant="outlined"
										color="error"
										onClick={() => excluir(professor)}
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
		</>
	);
};

export default AdminProfessores;
