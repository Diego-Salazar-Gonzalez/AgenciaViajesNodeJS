import {Viaje} from '../models/Viaje.js'
import {Testimonial} from '../models/testimoniales.js'
const paginaInicio = async(req,res)=>{//req - lo que enviamos : res - lo que express nos responde

    //Consultar 3 viajes del modelo Viaje
    const ArrayPromiseDB = [];
    ArrayPromiseDB.push(Viaje.findAll({limit: 3}));
    ArrayPromiseDB.push(Testimonial.findAll({limit:3}));
    try {
        const respuesta = await Promise.all(ArrayPromiseDB);
        console.log(respuesta)
        res.render('inicio.pug',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: respuesta[0],
            testimoniales: respuesta[1],
        });
    } catch (error) {
        console.log(error)
    }

   
}

const paginaNosotros = (req,res)=>{//req - lo que enviamos : res - lo que express nos responde
    
    res.render('nosotros.pug',{//pa sando variables como objetos
        pagina: 'Nosotros'
    });
}
const paginaViajes = async (req,res)=>{//req - lo que enviamos : res - lo que express nos responde
    //Consultar DB
    const viajes = await Viaje.findAll();
    


    res.render('viajes.pug',{//pa sando variables como objetos
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async(req,res)=>{//req - lo que enviamos : res - lo que express nos responde
    
    try {

        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales.pug',{//pa sando variables como objetos
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }

  
}

//Muestra un viaje por su slug

const paginaDetalleViaje = async(req,res) =>{
    const { viaje  } = req.params;

    try {
        const resultado = await Viaje.findOne({ where: {slug: viaje} });
        res.render('viaje',{
            pagina: 'Informacion Viaje',
            resultado
        })
    } catch (error) {
        console.log(error)
    }
}
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}