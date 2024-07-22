import IModalidade from '../../../interfaces/IModalidade';
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
import AddModalidade from './AddModalidade';
import EditModalidade from './EditModalidade';
import { notify } from '../../../utils/notify';

const AdminModalidades = () => {
	const [modalidades, setModalidades] = useState<IModalidade[]>([]);

	const [openModalCriar, setOpenModalCriar] = useState(false);
	const handleOpenModalCriar = () => setOpenModalCriar(true);
	const handleCloseModalCriar = () => setOpenModalCriar(false);

	const [openModalEditar, setOpenModalEditar] = useState(false);
	const handleOpenModalEditar = () => setOpenModalEditar(true);
	const handleCloseModalEditar = () => setOpenModalEditar(false);
	const [modalidadeEditar, setModalidadeEditar] = useState<IModalidade>();

	useEffect(() => {
		http.get<IModalidade[]>('modalidade').then((resposta) =>
			setModalidades(resposta.data)
		);
	}, [openModalCriar, openModalEditar]);

	const excluir = (modalidadeToDelete: IModalidade) => {
		http.delete(`modalidade/${modalidadeToDelete.id}`)
			.then(() => {
				const listaDeModalidades = modalidades.filter(
					(modalidade) => modalidade.id !== modalidadeToDelete.id
				);
				setModalidades([...listaDeModalidades]);
				notify('Modalidade Deletada', 'success');
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
				Modalidades
			</Typography>
			<Button
				variant="contained"
				onClick={handleOpenModalCriar}
				sx={{ mb: 2 }}
				color="success"
			>
				Nova Modalidade
			</Button>
			<AddModalidade
				open={openModalCriar}
				handleClose={handleCloseModalCriar}
			/>
			<EditModalidade
				open={openModalEditar}
				handleClose={handleCloseModalEditar}
				modalidade={modalidadeEditar}
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
						{modalidades.map((modalidade) => (
							<TableRow key={modalidade.id}>
								<TableCell>{modalidade.nome}</TableCell>
								<TableCell align="center">
									<Button
										variant="outlined"
										onClick={() => {
											handleOpenModalEditar();
											setModalidadeEditar(modalidade);
										}}
										sx={{ mr: 0.5 }}
									>
										Editar
									</Button>
									<Button
										variant="outlined"
										color="error"
										onClick={() => excluir(modalidade)}
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

export default AdminModalidades;
