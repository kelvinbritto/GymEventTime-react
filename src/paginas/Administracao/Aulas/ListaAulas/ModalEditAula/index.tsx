import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import IAula from '../../../../../interfaces/IAula';
import IModalidade from '../../../../../interfaces/IModalidade';
import http from '../../../../../http';
import IProfessor from '../../../../../interfaces/IProfessor';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface Props {
	open: boolean;
	handleClose: () => void;
	aula: IAula;
}

export default function ModalEditAula({ open, handleClose, aula }: Props) {
	const [modalidades, setModalidades] = useState<IModalidade[]>([]);
	const [modalidadeId, setModalidadeId] = useState(0);

	const [professores, setProfessores] = useState<IProfessor[]>([]);
	const [professorId, setProfessorId] = useState(0);

	const [diaSemana, setDiaSemana] = useState('');

	dayjs.extend(objectSupport);
	const [horario, setHorario] = useState<string>();
	const [value, setValue] = useState<Dayjs>();

	useEffect(() => {
		setModalidadeId(aula.modalidade.id);
		setProfessorId(aula.professor.id);
		setDiaSemana(aula.diaSemana);
		setHorario(aula.horario);
		var hora = Number(aula.horario.split(':')[0]);
		setValue(dayjs({ hour: hora, minute: 0 }));
	}, [open]);

	useEffect(() => {
		http.get<IModalidade[]>('modalidade').then((resposta) => {
			setModalidades(resposta.data);
		});
	}, []);

	useEffect(() => {
		http.get<IProfessor[]>('professor').then((resposta) => {
			setProfessores(resposta.data);
		});
	}, []);

	var aulaUpdate = {
		diaSemana: diaSemana,
		horario: horario,
		professorId: professorId,
		modalidadeId: modalidadeId,
	};

	const aoSalvar = () => {
		http.put(`aula/${aula?.id}`, aulaUpdate).then((resposta) => {
			if (resposta.status === 200) {
				setModalidadeId(resposta.data.modalidade.id);
				setProfessorId(resposta.data.professor.id);
				setDiaSemana(resposta.data.diaSemana);
				setHorario(resposta.data.horario);
				var hora = Number(aula.horario.split(':')[0]);
				setValue(dayjs({ hour: hora, minute: 0 }));
				handleClose();
			}
		});
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Editar Aula
				</Typography>
				<InputLabel id="modalidade-simple-select-label">
					Modalidade
				</InputLabel>
				<Select
					labelId="modalidade-simple-select-label"
					id="modalidade-simple-select"
					value={modalidadeId}
					fullWidth
					onChange={(event) => {
						setModalidadeId(Number(event.target.value));
					}}
				>
					<MenuItem key="primeiro" value="0"></MenuItem>
					{modalidades.map((m: IModalidade) => (
						<MenuItem key={m.id} value={m.id}>
							{m.nome}
						</MenuItem>
					))}
				</Select>

				<InputLabel id="professor-simple-select-label">
					Professor
				</InputLabel>
				<Select
					labelId="professor-simple-select-label"
					id="professor-simple-select"
					value={professorId}
					fullWidth
					onChange={(event) => {
						setProfessorId(Number(event.target.value));
					}}
				>
					<MenuItem key="primeiro" value="0"></MenuItem>
					{professores.map((m: IProfessor) => (
						<MenuItem key={m.id} value={m.id}>
							{m.nome}
						</MenuItem>
					))}
				</Select>

				<InputLabel id="diaSemana-simple-select-label">
					Dia Semana
				</InputLabel>
				<Select
					labelId="diaSemana-simple-select-label"
					id="diaSemana-simple-select"
					value={diaSemana}
					fullWidth
					onChange={(event) => {
						setDiaSemana(String(event.target.value));
					}}
				>
					<MenuItem value="SEGUNDA">Segunda-Feira</MenuItem>
					<MenuItem value="TERCA">Terça-Feira</MenuItem>
					<MenuItem value="QUARTA">Quarta-Feira</MenuItem>
					<MenuItem value="QUINTA">Quinta-Feira</MenuItem>
					<MenuItem value="SEXTA">Sexta-Feira</MenuItem>
					<MenuItem value="SABADO">Sábado</MenuItem>
					<MenuItem value="DOMINGO">Domingo</MenuItem>
				</Select>

				<InputLabel id="diaSemana-simple-select-label">
					Horário
				</InputLabel>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<TimePicker
						views={['hours']}
						value={value}
						defaultValue={value}
						onChange={(newValue) => {
							if (newValue) {
								setValue(newValue);
								setHorario(`${newValue.hour()}:00:00`);
							}
						}}
					/>
				</LocalizationProvider>

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
