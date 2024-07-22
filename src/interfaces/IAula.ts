import IModalidade from "./IModalidade";
import IProfessor from "./IProfessor";

export default interface IAula {
	id: number;
    modalidade: IModalidade
    professor: IProfessor
    horario: string
    diaSemana: string
    acabou?: boolean
    proxima?: boolean
    aoVivo?: boolean
}
