require('dotenv').config()

const mongoose = require('mongoose');
const Artwork = require('../models/artwork');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const hashPass = bcrypt.hashSync('1234', bcrypt.genSaltSync(8), null);

//const dbName = 'MAD-ART'
mongoose.connect(process.env.DBlocal)



const users = [
  
  {
    username: "Candela Muniozguren",
    password: hashPass,
    description: `La obra de Candela Muniozguren reflexiona sobre la armonía entre el espacio vacío y el espacio ocupado para encontrar, en ese territorio fronterizo, un equilibrio entre ambos.
    Sus esculturas, elaboradas con acero y estabilizadas con anclajes industriales, establecen formas de carácter tectónico que fluyen en altura a través de planos superpuestos.
    Pero lejos de establecerse como estructuras cerradas, las obras de Muniozguren se abren de manera dinámica hacia el espacio exterior, integrándolo a través de distintos ritmos que son subrayados por planos de color puro.
    La artista integra en su trabajo un alto componente lúdico, que mantiene el encanto de las piezas de un mecano listas para armar. Se trata, sin duda, de una eficaz manera de abrir el orden y la estabilidad de lo geométrico hacia campos más emocionales y humanos.
    En su investigación acerca de lo geométrico entran en juego la sensibilidad, la intuición, las escalas cromáticas y, sobre todo, la imaginación, herramientas esenciales en su búsqueda de una geometría que quiere consolidarse más allá del estricto rigor de la retícula.`,
    role: "ARTIST",
    email: 'info@candelamuniozguren.com',
    content:[],
    artworks: [],
    imgName: "candelaimagen",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132697/artmad/candelaimagen.jpg",
    genre: 'escultura',
  },
  {
    username: "Javier Ayuso",
    password: hashPass,
    description: `Javier Ayuso (Madrid, 1981) es un fotógrafo que alterna sus trabajos comerciales con los personales. Ha sido asistente de la artista Ouka Leele y ha realizado varias exposiciones a individuales y colectivas, participando en diversas ferias de arte. Sus fotografías no dejan indiferente ya que impactan a primera vista.`,
    role: "ARTIST",
    email: 'javayuso@gmail.com',
    content:[],
    artworks: [],
    imgName: "javier-ayuso",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132732/artmad/javier-ayuso.jpg",
    genre: 'fotografia',
  },
  {
    username: "Pilar Barrios",
    password: hashPass,
    description: `Pilar Barrios es una artista bogotana con residencia en Madrid. El punto de partida de sus procesos creativos es siempre el dibujo, aunque muchas veces sus obras acaban evolucionando hacia la escultura, la instalación o la acción participativa. Uno de los objetivos de la artista es generar en el espectador tensiones, despertar inquietudes o provocar cuestionamientos.`,
    role: "ARTIST",
    email: 'pilarbarriosi@gmail.com',
    content:[],
    artworks: [],
    imgName: "Pilar-Barrios",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132749/artmad/Pilar-Barrios.jpg",
    genre: 'instalacion',
  },
  {
    username: "Alberto Cea",
    password: hashPass,
    description: `Alberto Cea (Madrid, 1979) es un artista que investiga los límites del soporte de la pintura y el concepto de superficie, a través de sus característicos espacios geométricos. Ha expuesto en muestras individuales y colectivas por todo el territorio español y en países como Rumanía o Croacia.
    La función del formato clásico de la pintura se ve alterada por la acción expansiva del color, por la forma que dibuja el bastidor y por el espacio exterior al cuadro que sin pertenecer a la obra actúa en su percepción latente. El espacio que rodea a la obra queda incluido de modo inseparable a la misma, provocando lecturas sesgadas, una visión lateral del objeto-pintura. 
    Al usar lienzos con diversas formas, se refuta la lectura del cuadro-ventana y se centra en las cualidades constructivas y cromáticas del mismo, revelándose como un objeto.
    En ocasiones los trabajos se organizan en series que exploran diferentes soluciones compositivas y cromáticas, el resultado se organiza constituyendo una obra a modo de un políptico formado por pequeñas piezas`,
    role: "ARTIST",
    email: 'albertoceai@gmail.com',
    content:[],
    artworks: [],
    imgName: "Perfil-Cea",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132617/artmad/Perfil-Cea.jpg",
    genre: 'pintura',
  },
  {
    username: "Galería de arte Herraiz",
    password: hashPass,
    description: `El arte es para todos y todo el mundo tiene su cuadro. Simplemente ven a visitarnos. Disponemos de fondo de galería y ofercemos servicio de asesoramiento gratuito.`,
    role: "GALLERY",
    email: 'herraizartei@gmail.com',
    content:[],
    artworks: [],
    imgName: "herraizGaleria_qcikvf",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132571/artmad/herraizGaleria_qcikvf.png",
    genre: ['pintura', 'escultura', 'fotografia'],
    location:  {
      type: 'Point',
      coordinates:  [40.428833, -3.678207] 
    } 
  },
  {
    username: "Galería Kreisler",
    password: hashPass,
    description: `La Galería Kreisler se fundó en Madrid en 1965, abriendo otros espacios posteriormente en las ciudades de Nueva York (1970-1975), Barcelona (1979-2002) y Miami (1993-1995). Durante estos años, la Galería ha trabajado con los mejores artistas plásticos españoles y extranjeros, todos ellos representados en los diferentes museos nacionales y que hoy gozan de un gran prestigio internacional.

    A lo largo del año se realiza un programa mensual de exposiciones individuales y se editan catálogos de cada una de ellas.
    La Galería realiza también otras actividades, como la organización de exposiciones en colaboración con otras galerías y museos dentro y fuera de España; y también realiza ediciones de obras gráficas originales de sus artistas. Destaca asimismo desde el año 1975 la participación regular de la Galería en Ferias Internacionales de Arte.`,
    role: "GALLERY",
    email: 'keislerarti@gmail.com',
    content:[],
    artworks: [],
    imgName: "kreislerGaleria_racgne",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132582/artmad/kreislerGaleria_racgne.png",
    genre: ['pintura', 'escultura','instalacion'],
    location:  {
      type: 'Point',
      coordinates: [40.4264718, -3.6883202]
    }  
  },
  {
    username: "Galería Bat Alberto Cornejo",
    password: hashPass,
    description: `Galería de arte ubicada en madrid para comprar arte online, dedicada a la promoción, edición y exhibición nacional e internacional de artistas`,
    role: "GALLERY",
    email: 'batcornejoi@gmail.com',
    content:[],
    artworks: [],
    imgName: "batGaleria_luoqzl",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132565/artmad/batGaleria_luoqzl.png",
    genre: ['pintura', 'fotografia', 'instalacion'],
    location: {
      type: 'Point',
      coordinates: [40.4440471, -3.6962407]
    } 
  },
  {
  username: "Galería Juana de Aizpuru",
    password: hashPass,
    description: `La galería Juana de Aizpuru se fundó en Sevilla en 1970, en la calle Canalejas número 10 aunque, posteriormente, en el año 1986, se trasladó la sede a la calle Zaragoza 26, instalándose en una antigua casa sevillana de 3 pisos.
    La sede de Madrid se abrió en 1983, en la calle Barquillo 44, que es donde permanece desde entonces.
    En el año 2004 se cerró el espacio sevillano.`,
    role: "GALLERY",
    email: 'juanaizpurui@gmail.com',
    content:[],
    artworks: [],
    imgName: "juanaGaleria_oh6v6k",
    imgPath: "https://res.cloudinary.com/dgesryvti/image/upload/v1559132576/artmad/juanaGaleria_oh6v6k.png",
    genre: ['escultura', 'fotografia', 'instalacion'],
    location: {
      type: 'Point',
      coordinates: [40.4242672, -3.6954675]
    }  
  }
]

let artworks = [
  {
    title:'Estambul', 
    author: "Alberto Cea",
    gallery: 'Galería de arte Herraiz',
    description: 'Por condicionamientos culturales -es decir, porque así somos educados- nos identificamos fácilmente con las obras de arte realista. Como tales, clasifican los óleos que están colgados en el museo de arte colonial de la Ciudad de México; una terracota de Miguel Miramontes, o una fotografía Manuel Álvarez Bravo.',
    dateCreated:'2016-10-23' ,  
    imgName: 'ceaestambul2w_yjses2' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132634/artmad/ceaestambul2w_yjses2.jpg' ,
    genre: 'pintura'
  },
  {
    title:'Maraña', 
    author: "Alberto Cea",
    gallery:"Galería Kreisler",
    description:`Todo ese proceso también justifica su valor como productos para un mercado que -al igual que todos los demás- se rige por “modas” y “estereotipos”. Pero, para ganar en claridad, en el ejercicio de comprender el arte resulta imprescindible tomar en cuenta algunos argumentos, algo así como “chalecos salvavidas para pensar de manera positiva y práctica”, antes de visitar una exposición.
    Es necesario dirigirse a las galerías, museos, espacios expositivos, con la misma convicción que se puede tener para devorarse unos panuchos yucatecos.` ,
    dateCreated: '2014-01-30',  
    imgName: 'ceanaranja_taz4rq',
    imgPath:'https://res.cloudinary.com/dgesryvti/image/upload/v1559132653/artmad/ceanaranja_taz4rq.jpg' ,
    genre: 'pintura'    
  },
  {
    title:'Entramado', 
    author: "Alberto Cea",
    gallery: "Galería Bat Alberto Cornejo",
    description: 'Individualidades y roles se articulan para proponer una construcción icónica de la realidad con apariencia subjetiva, sugiriendo un universo simbólico novedoso, creado a partir de las marginalidades de la cotidianidad replanteadas como intervenciones de lo onírico y lo fantástico.',
    dateCreated: '2018-05-08',  
    imgName:'ceatramadosrosaw_ig6lzh' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132654/artmad/ceatramadosrosaw_ig6lzh.jpg' ,
    genre: 'pintura'
  },
  {
    title:"Alótropos", 
    author: "Candela Muniozguren",
    gallery: "Galería Juana de Aizpuru",
    description: 'Esto sucede porque esas piezas exhibidas en museos y galerías están respaldadas por la opinión de autoridades en la materia: por ejemplo, la obra es concebida por un artista; después, se estudia por curadores y, finalmente, la evalúan los críticos.',
    dateCreated:'2016-12-03' ,  
    imgName:'candelaAlótropos_01_pvddbo',
    imgPath:'https://res.cloudinary.com/dgesryvti/image/upload/v1559132697/artmad/candelaAl%C3%B3tropos_01_pvddbo.jpg' ,
    genre: 'escultura'
  },
  {
    title:'Esencia de lo visible', 
    author: "Candela Muniozguren",
    gallery:'Galería de arte Herraiz',
    description:`Todo ese proceso también justifica su valor como productos para un mercado que -al igual que todos los demás- se rige por “modas” y “estereotipos”. Pero, para ganar en claridad, en el ejercicio de comprender el arte resulta imprescindible tomar en cuenta algunos argumentos, algo así como “chalecos salvavidas para pensar de manera positiva y práctica”, antes de visitar una exposición.
    Es necesario dirigirse a las galerías, museos, espacios expositivos, con la misma convicción que se puede tener para devorarse unos panuchos yucatecos.` ,
    dateCreated: '2017-08-20' ,  
    imgName:'candelaLa-Esencia-de-lo-Visible-1024x683_z906sq' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132697/artmad/candelaLa-Esencia-de-lo-Visible-1024x683_z906sq.jpg',
    genre: 'escultura',
  },
  {
    title: 'Serie amarilla', 
    author: "Candela Muniozguren",
    gallery: "Galería Kreisler",
    description: 'Individualidades y roles se articulan para proponer una construcción icónica de la realidad con apariencia subjetiva, sugiriendo un universo simbólico novedoso, creado a partir de las marginalidades de la cotidianidad replanteadas como intervenciones de lo onírico y lo fantástico.',
    dateCreated:'2019-02-20',  
    imgName: 'candelaSerie-Amarilla_Triptico_nasllf',
    imgPath:'https://res.cloudinary.com/dgesryvti/image/upload/v1559132697/artmad/candelaSerie-Amarilla_Triptico_nasllf.jpg' ,
    genre: 'escultura'
  },
  {
    title: 'Taburete', 
    author: "Javier Ayuso",
    gallery: "Galería Bat Alberto Cornejo",
    description: 'Esto sucede porque esas piezas exhibidas en museos y galerías están respaldadas por la opinión de autoridades en la materia: por ejemplo, la obra es concebida por un artista; después, se estudia por curadores y, finalmente, la evalúan los críticos.' ,
    dateCreated: '2017-03-27' ,  
    imgName: 'ayusosilla_vh89vv',
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132732/artmad/ayusosilla_vh89vv.jpg' ,
    genre: 'fotografia'
  },
  {
    title: 'Lights', 
    author: "Javier Ayuso",
    gallery:"Galería Juana de Aizpuru",
    description: 'Vale acotar, que el punto de ignición para la semántica de LaChapelle es la sociedad histórica, la biografía individualizada del sujeto social transhistórico, integrados y luego desdoblados para poner en evidencia las contraposiciones, polaridades y contradicciones, a través de las cuales se dimensiona la experiencia social del individuo o la diversidad cultural particularizada en el imaginario social.',
    dateCreated: '2019-01-28' ,  
    imgName: 'ayusoCono_lx1ifd' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132732/artmad/ayusoCono_lx1ifd.jpg',
    genre: 'fotografia'
  },
  {
    title: 'Soledad', 
    author: "Javier Ayuso",
    gallery: "Galería de arte Herraiz",
    description: 'La afluencia de tantos miles de espectadores a las exposiciones de Lachapelle esta relacionada con su novedad discursiva dentro de la fotografía pero, sobre todo, por la universalidad de los tribalismos urbanos, -las nuevas comunidades urbanas- globalizados por el reflujo de la imagen, en esta urgida sociedad digital.',
    dateCreated: '2018-11-20' ,  
    imgName: 'ayusodef_yaykxn' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132732/artmad/ayusodef_yaykxn.jpg',
    genre:'fotografia'
  },
  {
    title:'Plegar el vacío-pieza A', 
    author:"Pilar Barrios" ,
    gallery: "Galería Bat Alberto Cornejo",
    description: 'Vale acotar, que el punto de ignición para la semántica de LaChapelle es la sociedad histórica, la biografía individualizada del sujeto social transhistórico, integrados y luego desdoblados para poner en evidencia las contraposiciones, polaridades y contradicciones, a través de las cuales se dimensiona la experiencia social del individuo o la diversidad cultural particularizada en el imaginario social.',
    dateCreated:'2017-12-26' ,  
    imgName: '18_PilarBarrios_PlegarElVacio_pieza_A_e_w_bfdiyn' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132749/artmad/18_PilarBarrios_PlegarElVacio_pieza_A_e_w_bfdiyn.jpg',
    genre:'instalacion'
  },
  {
    title:'Plegar el vacío-pieza B', 
    author:"Pilar Barrios" ,
    gallery:"Galería Kreisler",
    description: 'La afluencia de tantos miles de espectadores a las exposiciones de Lachapelle esta relacionada con su novedad discursiva dentro de la fotografía pero, sobre todo, por la universalidad de los tribalismos urbanos, -las nuevas comunidades urbanas- globalizados por el reflujo de la imagen, en esta urgida sociedad digital.',
    dateCreated:'2018-04-24' ,  
    imgName:'18_Pieza_E_Plegar_el_Vacio_PilarBarrios-1_yfpwmp' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559132749/artmad/18_Pieza_E_Plegar_el_Vacio_PilarBarrios-1_yfpwmp.jpg',
    genre:'instalacion'
  },
  {
    title: 'Poliedro', 
    author: "Pilar Barrios",
    gallery: "Galería Juana de Aizpuru",
    description: 'La Idea de posmodernidad como horizonte de sentido para las múltiples orientaciones en las que se proyecta la sociedad actual, también se refleja en la identidad de las tendencias y las formulaciones artísticas que confluyen en el espectro cultural contemporáneo.',
    dateCreated: '2019-05-17' ,  
    imgName: '1452794468_14-poliedros-dpp-0012-edit-media-jpg_li6k4x' ,
    imgPath: 'https://res.cloudinary.com/dgesryvti/image/upload/v1559144844/artmad/1452794468_14-poliedros-dpp-0012-edit-media-jpg_li6k4x.jpg',
    genre:'escultura'
  }
]

User.create(users)
  .then(usersCreated => {
    console.log(usersCreated)
      usersCreated.forEach((user)=>{
        artworks.forEach((art)=>{
          if(user.role=='ARTIST'){
            if(user.username==art.author){
              art.author=user._id
            }
          }else if(user.role=='GALLERY'){
              if(user.username==art.gallery){
                art.gallery=user._id
              }
            }
          })

      })
    // console.log(usersCreated)
    // const artUser = usersCreated.find( user => {
    //   return user.role == 'ARTIST' && user.username == 'James Watts'
    // })
    // const galleryUser = usersCreated.find( user => {
    //   return user.role == 'GALLERY' && user.username == 'Annely Juda Fine Art'
    // })
    // console.log()
    // artworks = artworks.map(art => {
    //   art.author = artUser._id;
    //   art.gallery = galleryUser._id;
    //   return art
    // })
    Artwork.create(artworks)
      .then(artworksCreated =>{
        // console.log(artworksCreated)
        console.log(`Creados ${artworksCreated.length} artworks`)

         Promise.all(usersCreated.map(user => {
           const artUser = artworksCreated.filter(art => art.author == user._id || art.gallery == user._id);
           const artId = artUser.map(art => art._id);
           return user.update({artworks:artId}).then()
         }))
        .then(msg => {
          console.log(msg)
          mongoose.connection.close()
        })
      })
      .catch(err => console.log("Este es el error" + err))
    console.log(`Creados ${usersCreated.length} users`)
  })
  .catch(err => console.log("Este es el error" + err))

// User.create(users)
//   .then(usersCreated => {
//     console.log(usersCreated)
//     const artUser = usersCreated.find( user => {
//       return user.role == 'ARTIST' && user.username == 'James Watts'
//     })
//     const galleryUser = usersCreated.find( user => {
//       return user.role == 'GALLERY' && user.username == 'Annely Juda Fine Art'
//     })
//     artworks = artworks.map(art => {
//       art.author = artUser._id;
//       art.gallery = galleryUser._id;
//       return art
//     })
//     Artwork.create(artworks)
//       .then(artworksCreated =>{
//         console.log(artworksCreated)
//         console.log(`Creados ${artworksCreated.length} artworks`)
//         Promise.all(usersCreated.map(user => user.update({artworks:artworksCreated.map(art => art._id)})))
//         .then(msg => {
//           console.log(msg)
//           mongoose.connection.close()
//         })
//       })
//       .catch(err => console.log("Este es el error" + err))
//     console.log(`Creados ${usersCreated.length} users`)
//   })
//   .catch(err => console.log("Este es el error" + err))






