import http from '../../../http';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IGradeHoraria from '../../../interfaces/IGradeHoraria';
import ListaAulas from './ListaAulas';
import ModalAddAula from './ListaAulas/ModalAddAula';
import { notify } from '../../../utils/notify';

const AdminAulas = () => {
	const [gradeHoraria, setGradeHoraria] = useState<IGradeHoraria>();

	const [openModalCriar, setOpenModalCriar] = useState(false);
	const handleOpenModalCriar = () => setOpenModalCriar(true);

	const handleCloseModalCriar = () => {
		setOpenModalCriar(false);
		onClose();
	};

	const [openSegunda, setOpenSegunda] = useState(false);
	const [openTerca, setOpenTerca] = useState(false);
	const [openQuarta, setOpenQuarta] = useState(false);
	const [openQuinta, setOpenQuinta] = useState(false);
	const [openSexta, setOpenSexta] = useState(false);
	const [openSabado, setOpenSabado] = useState(false);
	const [openDomingo, setOpenDomingo] = useState(false);

	const handleClick = (open: boolean, setOpen: any) => {
		setOpen(!open);
	};

	const onClose = () => {
		http.get<IGradeHoraria>('aula').then((resposta) => {
			setGradeHoraria(resposta.data);
		});
	};

	useEffect(() => {
		http.get<IGradeHoraria>('aula')
			.then((resposta) => {
				setGradeHoraria(resposta.data);
			})
			.catch((e) => {
				console.log(e);
				notify('ALGO DEU ERRADO!', 'error');
			});
	}, [openModalCriar]);

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
				Aulas
			</Typography>
			<ModalAddAula
				open={openModalCriar}
				handleClose={handleCloseModalCriar}
			/>
			<Button
				variant="contained"
				onClick={handleOpenModalCriar}
				sx={{ mb: 2 }}
				color="success"
			>
				Nova Aula
			</Button>
			{gradeHoraria && gradeHoraria['segunda'].length > 0 && (
				<ListaAulas
					dia="segunda"
					gradeHoraria={gradeHoraria}
					open={openSegunda}
					onClick={() => handleClick(openSegunda, setOpenSegunda)}
					onClose={onClose}
				/>
			)}

			{gradeHoraria && gradeHoraria['terca'].length > 0 && (
				<ListaAulas
					dia="terca"
					gradeHoraria={gradeHoraria}
					open={openTerca}
					onClick={() => handleClick(openTerca, setOpenTerca)}
					onClose={onClose}
				/>
			)}

			{gradeHoraria && gradeHoraria['quarta'].length > 0 && (
				<ListaAulas
					dia="quarta"
					gradeHoraria={gradeHoraria}
					open={openQuarta}
					onClick={() => handleClick(openQuarta, setOpenQuarta)}
					onClose={onClose}
				/>
			)}
			{gradeHoraria && gradeHoraria['quinta'].length > 0 && (
				<ListaAulas
					dia="quinta"
					gradeHoraria={gradeHoraria}
					open={openQuinta}
					onClick={() => handleClick(openQuinta, setOpenQuinta)}
					onClose={onClose}
				/>
			)}
			{gradeHoraria && gradeHoraria['sexta'].length > 0 && (
				<ListaAulas
					dia="sexta"
					gradeHoraria={gradeHoraria}
					open={openSexta}
					onClick={() => handleClick(openSexta, setOpenSexta)}
					onClose={onClose}
				/>
			)}
			{gradeHoraria && gradeHoraria['sabado'].length > 0 && (
				<ListaAulas
					dia="sabado"
					gradeHoraria={gradeHoraria}
					open={openSabado}
					onClick={() => handleClick(openSabado, setOpenSabado)}
					onClose={onClose}
				/>
			)}
			{gradeHoraria && gradeHoraria['sabado'].length > 0 && (
				<ListaAulas
					dia="domingo"
					gradeHoraria={gradeHoraria}
					open={openDomingo}
					onClick={() => handleClick(openDomingo, setOpenDomingo)}
					onClose={onClose}
				/>
			)}
		</>
	);
};

export default AdminAulas;
