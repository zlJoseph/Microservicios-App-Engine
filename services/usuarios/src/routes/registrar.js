import {Router} from 'express';
import {getFirestore} from 'firebase-admin/firestore';
const router=Router();

router.route('/').post(async (req,res)=>{
    const {nombre,apellido,edad,fecha}=req.body;
    const firestore=getFirestore();
    await firestore.collection('usuarios').add({
        nombre:nombre,
        apellido:apellido,
        edad:edad,
        fecha:fecha
    }).catch(err=>{
        res.status(500).send(err);
    });
    const cityRef = firestore.collection('estadisticas').doc('edades');
    const doc = await cityRef.get();
    let count=0
    if (!doc.exists) {
        count=1;
        await firestore.collection('estadisticas').doc('edades').set({
          sumXi: parseFloat(edad),
          sumXi2: parseFloat(edad)*parseFloat(edad),
          contador: 1  
        }).catch(err=>{
            res.status(500).send(err);
        });
    } else {
        const { sumXi, sumXi2, contador } = doc.data();
        count=contador+1;
        await firestore.collection('estadisticas').doc('edades').set({
            sumXi: sumXi+parseFloat(edad),
            sumXi2: sumXi2+parseFloat(edad)*parseFloat(edad),
            contador: contador+1  
        }).catch(err=>{
            res.status(500).send(err);
        });
    }

    res.json({msg: 'Registro exitoso de '+req.body.nombre,
        nombre:nombre,
        apellido:apellido,
        edad:edad,
        fecha:fecha,
        contador:count
    });
});

export default router;