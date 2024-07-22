import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import IProfessor from '../../../../interfaces/IProfessor';
import { TextField } from '@mui/material';
import http from '../../../../http';
import { notify } from '../../../../utils/notify';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	open: boolean;
	handleClose: () => void;
	professor?: IProfessor;
}

export default function ModalEditarProfessor({
	open,
	handleClose,
	professor,
}: Props) {
	const [nome, setNome] = useState(professor?.nome);

	const aoSalvar = () => {
		http.put(`professor/${professor?.id}`, { nome: nome })
			.then((resposta) => {
				if (resposta.status === 200) {
					setNome(resposta.data.nome);
					handleClose();
				}
			})
			.catch((e) => {
				notify(e.response.data.errors[0].message, 'error');
			});
	};

	useEffect(() => {
		setNome(professor?.nome);
	}, [professor]);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Editar Professor
				</Typography>
				<TextField
					id="outlined-basic"
					label="Nome Professor"
					variant="outlined"
					fullWidth
					sx={{ mt: 1 }}
					value={nome}
					onChange={(value) => setNome(value.target.value)}
				/>
				<Button
					color="success"
					variant="contained"
					sx={{ mt: 1 }}
					fullWidth
					onClick={aoSalvar}
				>
					Save
				</Button>
				<Button
					onClick={handleClose}
					color="error"
					variant="contained"
					sx={{ mt: 1 }}
					fullWidth
				>
					Cancel
				</Button>
			</Box>
		</Modal>
	);
}
