import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
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
}

export default function ModalAddProfessor({ open, handleClose }: Props) {
	const [nome, setNome] = useState('');

	const aoSalvar = () => {
		http.post(`professor`, { nome: nome })
			.then((resposta) => {
				if (resposta.status === 201) {
					onClose();
					notify('Professor Cadastrado!', 'success');
				}
			})
			.catch((e) => {
				notify(e.response.data.errors[0].message, 'error');
			});
	};

	const onClose = () => {
		setNome('');
		handleClose();
	};

	return (
		<>
			<Modal
				open={open}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Novo Professor
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
						onClick={onClose}
						color="error"
						variant="contained"
						sx={{ mt: 1 }}
						fullWidth
					>
						Cancel
					</Button>
				</Box>
			</Modal>
		</>
	);
}
