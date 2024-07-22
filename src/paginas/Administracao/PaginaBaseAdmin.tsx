import {
	AppBar,
	Box,
	Button,
	Typography,
	Container,
	Toolbar,
	Link,
	Paper,
	createTheme,
	ThemeProvider,
	CssBaseline,
	Switch,
} from '@mui/material';
import { useState } from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';

const PaginaBaseAdmin = () => {
	const theme1 = createTheme({
		palette: {
			mode: 'light',
		},
	});

	const theme2 = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const [theme, setTheme] = useState(theme1);
	const [dark, setDark] = useState(false);

	const changeTheme = () => {
		if (dark) {
			setTheme(theme1);
			setDark(false);
		} else {
			setTheme(theme2);
			setDark(true);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar>
						<Typography variant="h6" sx={{ mr: 4 }}>
							MIXPLAY
						</Typography>
						<Box sx={{ display: 'flex', flexGrow: 1 }}>
							<Link component={RouterLink} to="/admin/aulas">
								<Button sx={{ my: 2, color: 'white' }}>
									Aulas
								</Button>
							</Link>

							<Link
								component={RouterLink}
								to="/admin/professores"
							>
								<Button sx={{ my: 2, color: 'white' }}>
									Professores
								</Button>
							</Link>

							<Link
								component={RouterLink}
								to="/admin/modalidades"
							>
								<Button sx={{ my: 2, color: 'white' }}>
									Modalidades
								</Button>
							</Link>
							<Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
								<Switch
									onChange={() => changeTheme()}
									color="success"
									defaultChecked
								/>
							</Box>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>

			<Box>
				<Container maxWidth="lg" sx={{ mt: 1 }}>
					<Paper sx={{ p: 2 }}>
						<Outlet />
					</Paper>
				</Container>
			</Box>
			<ToastContainer 
				transition={Zoom}
			/>
		</ThemeProvider>
	);
};

export default PaginaBaseAdmin;
