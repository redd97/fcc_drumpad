import { createRoot } from 'react-dom/client';
import DrumMachine from './DrumApp'

import './styles.css'


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<DrumMachine tab="home" />);