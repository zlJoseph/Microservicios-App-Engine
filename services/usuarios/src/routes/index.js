import {Router} from 'express';
import Registar from './registrar';
import User from './user';
import Estadisticas from './estadisticas';

export default Router()
    .use('/creacliente',Registar)
    .use('/listclientes',User).
    use('/kpideclientes',Estadisticas);