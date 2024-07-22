import IAula from '../interfaces/IAula';
import dayjs, { Dayjs } from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

function pegaDiaString<String>(texto: String) {
	switch (texto) {
		case 'segunda':
			return 'Segunda';
		case 'terca':
			return 'Terça';
		case 'quarta':
			return 'Quarta';
		case 'quinta':
			return 'Quinta';
		case 'sexta':
			return 'Sexta';
		case 'sabado':
			return 'Sábado';
		case 'domingo':
			return 'Domingo';
		default:
			return '';
	}
}

type DiaSemana =
	| 'segunda'
	| 'terca'
	| 'quarta'
	| 'quinta'
	| 'sexta'
	| 'sabado'
	| 'domingo';

function getWeekDay(): DiaSemana {
	const weekday: DiaSemana[] = [
		'domingo',
		'segunda',
		'terca',
		'quarta',
		'quinta',
		'sexta',
		'sabado',
	];
	const d = new Date();
	let day = weekday[d.getDay()];

	return day;
}

function retiraAulasPassadas(aulas: IAula[]): IAula[] {
	var agoraHora = new Date().getHours();
	var now = dayjs({ hour: agoraHora, minute: 0 });
	dayjs.extend(objectSupport);
	dayjs.extend(isSameOrAfter);

	let proximasAulas: IAula[] = [];

	aulas.forEach((aula) => {
		const hora = aula.horario.split(':')[0];
		const horario = dayjs({ hour: hora, minute: 0 });

		const horaAntes = dayjs({ hour: agoraHora - 1, minute: 0 });
		const horaProxima = dayjs({ hour: agoraHora + 1, minute: 0 });

		if (horario.isSame(horaAntes)) {
			aula.aoVivo = false;
			aula.proxima = false;
			aula.acabou = true;
			proximasAulas.push(aula);
		}

		if (horario.isSame(now)) {
			aula.aoVivo = true;
			aula.proxima = false;
			aula.acabou = false;
			proximasAulas.push(aula);
		}

		if (horario.isAfter(now)) {
			aula.aoVivo = false;
			aula.proxima = false;
			aula.acabou = false;
			proximasAulas.push(aula);
		}

		if (horario.isSame(horaProxima)) {
			aula.aoVivo = false;
			aula.proxima = true;
			aula.acabou = false;
		}
	});

	return proximasAulas;
}

export { pegaDiaString, getWeekDay, retiraAulasPassadas };
