import { Route, Routes } from "react-router-dom";
import Home from "./paginas/Home";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";
import AdminProfessores from "./paginas/Administracao/Professores/AdminProfessores";
import AdminModalidades from "./paginas/Administracao/Modalidades/AdminModalidades";
import AdminAulas from "./paginas/Administracao/Aulas/AdminAulas";


function App() {
	return(
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/admin" element={<PaginaBaseAdmin />}>
				<Route path="aulas" element={<AdminAulas />} />
				<Route path="professores" element={<AdminProfessores />} />
				<Route path="modalidades" element={<AdminModalidades />} />
			</Route>
		</Routes>
	)
}

export default App;

