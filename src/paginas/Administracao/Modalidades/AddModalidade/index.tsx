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

export default function AddModalidade({ open, handleClose }: Props) {
	const [nome, setNome] = useState('');
	const [urlLogo, setUrlLogo] = useState('');

	const modalidade = {
		nome: nome,
		urlLogo: urlLogo,
	};

	const aoSalvar = () => {
		http.post(`modalidade`, modalidade)
			.then((resposta) => {
				if (resposta.status === 201) {
					setNome('');
					setUrlLogo('');
					onClose();
					notify("Modalidade cadastrada", "success");
				}
			})
			.catch((e) => {
				notify(e.response.data.errors[0].message, 'error');
			});
	};

	const onClose = () => {
		setNome('');
		setUrlLogo('');
		handleClose();
	};

	return (
		<div>
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
						Nova Modalidade
					</Typography>
					<TextField
						id="outlined-basic"
						label="Nome Modalidade"
						variant="outlined"
						fullWidth
						sx={{ mt: 1 }}
						value={nome}
						onChange={(value) => setNome(value.target.value)}
					/>
					<TextField
						id="outlined-basic"
						label="URL Logo"
						variant="outlined"
						fullWidth
						sx={{ mt: 1 }}
						value={urlLogo}
						onChange={(value) => setUrlLogo(value.target.value)}
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
		</div>
	);
}
