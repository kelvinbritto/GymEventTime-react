import { toast, ToastContent } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function notify(message: ToastContent, type: string) {
	const AUTO_CLOSE_DELAY = 3000;

	if (toast.isActive('error-id')) {
		return;
	}

	switch (type) {
		case 'error':
			toast.error(message, {
				theme: 'dark',
				autoClose: AUTO_CLOSE_DELAY,
				position: 'bottom-center',
				toastId: 'error-id',
			});
			break;
		case 'success':
			toast.success(message, {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: AUTO_CLOSE_DELAY,
			});
			break;
		case 'alert':
			toast.warn(message, {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: AUTO_CLOSE_DELAY,
			});
			break;
		default:
			toast.info(message, {
				theme: 'dark',
				position: 'bottom-center',
				autoClose: AUTO_CLOSE_DELAY,
			});
	}
}
