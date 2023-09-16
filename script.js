//Buttons
const ENTERPRISE_BUTTON_ID = "enterprise-services-button";
const PERSONAL_BUTTON_ID = "personal-services-button";
// Cards
const INITIAL_FULL_SECTION_ID = "initial-services-wrapper-id";
const FULL_SECTION_ID = "services-wrapper-id";
const PERSONAL_CARD_CLASS = "personal";
const ENTERPRISE_CARD_CLASS = "enterprise";
// SUBTITLE
const SERVICES_SUBTITLE_ID = "services-subtitle-id";

const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

// Lista SERVICIOS
const services = {
  // Acoso por terceros
  0: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-acoso-1.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046194916",
    altText: "mujer-de-espaldas-acosada",
    title: "Acoso por terceros",
    type: "personal",
    default: true,
    description: `¿Siente que alguien lo está acosando y amenazando?
                <p> Nuestro servicio de detective privado especializado
                  en acoso puede ayudarlo a protegerse y recopilar pruebas para tomar medidas legales. </p>
                <p>Contamos con experiencia en situaciones delicadas y respetamos su privacidad en todo momento.</p>
                <p>No dude en contactarnos para su seguridad y tranquilidad.`,
    linkUrl: "./contacto.html",
  },
  // Infidelidades
  1: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-infidelidades.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195161",
    altText: "pareja-triste-a-contraluz",
    title: "Infidelidades",
    type: "personal",
    default: true,
    description: `<p>
                  Nuestro servicio de detective privado especializado en infidelidades le brinda la tranquilidad que
                  necesita.
                  </p>
                  <p> Contamos con equipos de alta tecnología y personal altamente capacitado para obtener la
                    evidencia que necesita para tomar decisiones informadas sobre su relación.</p>
                  <p>Confíe en nosotros para resolver sus dudas.</p>
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Delincuencia juvenil
  2: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-delincuencia-juvenil.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195048",
    altText: "banda-callejera",
    title: "Delincuencia juvenil",
    type:"personal",
    default: true,
    description: `<p>
                  Nuestro servicio de delincuencia juvenil, liderado por un detective privado altamente capacitado, se
                  enfoca en prevenir y resolver delitos cometidos por jóvenes. </p>
                  <p> Ofrecemos soluciones personalizadas y efectivas para proteger su negocio o comunidad.</p>
                  <p>Confíe en nosotros para mantener seguros a sus seres queridos y propiedades.</p>
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Incumplimiento régimen de visitas
  3: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-ambito-familiar.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195049",
    altText: "niños-felices",
    title: "Incumplimiento régimen de visitas",
    type: "personal",
    default: false,
    description: `<p>
                    Nuestro servicio de incumplimiento del régimen de visitas, liderado por un detective privado
                    experimentado, se enfoca en asegurarse de que los acuerdos de custodia sean respetados.</p>
                  <p> Ofrecemos soluciones efectivas y discretas para garantizar el bienestar de los niños involucrados y
                    la
                    tranquilidad de nuestros clientes.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Estafas a seguros
  4: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-estafas.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195148",
    altText: "móvil-con-llamadas-de-spam",
    title: "Estafas",
    type: "personal",
    default: false,
    description: `<p>
                    Nuestro servicio de lucha contra las estafas, liderado por un detective privado altamente capacitado,
                    se
                    enfoca en prevenir y resolver fraudes y engaños.</p>
                  <p> Ofrecemos soluciones personalizadas y efectivas para
                    proteger su patrimonio y reputación. </p>
                  <p> Confíe en nosotros para investigar cualquier sospecha de actividad
                    ilegal y obtener resultados justos.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Absentismo laboral
  5: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-absentismo-laboral.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046194967",
    altText: "absentismo-laboral",
    title: "Absentismo laboral",
    type: "enterprise",
    default: false,
    description: `<p>
                    Nuestro servicio de absentismo laboral, liderado por un detective privado experimentado, se enfoca en
                    garantizar que sus empleados estén cumpliendo con sus responsabilidades laborales.</p>
                  <p> Ofrecemos soluciones
                    efectivas y discretas para detectar y prevenir el ausentismo injustificado y la pérdida de
                    productividad.</p>
                  <p> Confíe en nosotros para mantener su negocio funcionando sin problemas.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Impago de pensiones compensatorias
  6: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-pension-compensatoria.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195132",
    altText: "madre-con-hijos-cara-triste",
    title: "Impago pensiones compensatorias",
    type: "personal",
    default: false,
    description: `<p>
                    Nuestro servicio de "Impago de pensiones" compensatorias te ayudará a obtener la compensación que
                    mereces por las pensiones no pagadas. Nuestros detectives privados expertos en derecho familiar
                    investigarán la situación financiera de tu ex pareja para encontrar los medios para cumplir con su
                    obligación.</p>
                  <p> ¡No te rindas y contáctanos para recuperar lo que te pertenece!
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Accidentes laborales
  7: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-riesgos-laborales.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195173",
    altText: "cartel-aviso-riesgo-laboral",
    title: "Accidentes laborales",
    type: "enterprise",
    default: false,
    description: `<p>
                    Nuestro servicio proporciona una investigación exhaustiva para determinar la
                    causa del accidente y evaluar la responsabilidad legal. Nuestros detectives privados están
                    familiarizados con las regulaciones laborales y pueden ayudarte a obtener la
                    compensación que mereces por las lesiones sufridas en el lugar de trabajo.</p>
                  <p> Si has sufrido un accidente laboral, contáctanos para obtener ayuda y asesoramiento profesional.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Detección de Adicciones
  8: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-addictions.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046194953",
    altText: "mujer-mirando-móvil-en-la-oscuridad",
    title: "Accidentes laborales",
    type: "personal",
    default: false,
    description: `<p>
                    Nuestros detectives privados altamente capacitados utilizan técnicas de investigación avanzadas para
                    descubrir si hay evidencia de adicción y proporcionarte las herramientas necesarias para enfrentar la situación.</p>
                  <p> Si estás preocupado por una posible adicción, contáctanos para obtener ayuda confidencial y
                    profesional.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Separaciones y divorcios
  9: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-divorce.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195004",
    altText: "pareja-dandose-mano-alejandose",
    title: "Separaciones y Divorcios",
    type: "personal",
    default: false,
    description: `<p>
                    Nuestros detectives privados te proporcionarán asesoramiento y apoyo en todas las etapas del proceso,
                    desde la separación hasta el
                    divorcio. Podemos ayudarte a recopilar pruebas relevantes, incluyendo la custodia de los hijos, la
                    pensión alimenticia y la división de bienes.
                  </p>
                  <p>Si necesitas asistencia para tu separación o divorcio, contáctanos para obtener ayuda confidencial y
                    profesional.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Bajas fingidas
  10: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-baja-fingida.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046194918",
    altText: "hombre-tocandose-ojos-cansado",
    title: "Bajas fingidas",
    type: "enterprise",
    default: false,
    description: `<p>Nuestro servicio de "Bajas Fingidas" ayuda a identificar y prevenir el fraude de bajas médicas falsas
                    en tu empresa. Nuestros detectives privados altamente capacitados utilizan técnicas de investigación
                    avanzadas para descubrir y proporcionar pruebas sólidas. </p>
                  <p>Contáctanos para obtener ayuda profesional en
                    la detección de bajas fingidas y proteger los intereses de tu empresa.</p>`,
    linkUrl: "./contacto.html",
  },
  // Robos y hurtos
  11: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-robber.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195151",
    altText: "joven-espaldas-callejon-oscuro",
    title: "Robos y hurtos",
    type: "enterprisePersonal",
    default: false,
    description: `<p>
                    Nuestro servicio proporciona una investigación detallada y precisa para ayudarte a
                    recuperar tus bienes robados o perdidos. Nuestros detectives privados altamente capacitados trabajan
                    de manera rápida y eficiente para rastrear la ubicación de tus pertenencias y llevar a los
                    responsables ante la justicia.</p>
                  <p> Si has sido víctima de un robo o hurto, no dudes en contactarnos para
                    obtener ayuda profesional y confidencial en la recuperación de tus bienes.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Cliente misterioso
  12: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-mistery-shopper.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195200",
    altText: "galeria-centro-comercial",
    title: "Cliente misterioso",
    type: "enterprise",
    default: false,
    description: `<p>Nuestro servicio de "Cliente Misterioso" te proporciona información valiosa sobre la calidad de
                  atención al cliente en tu empresa. Nuestros detectives actúan como clientes anónimos para evaluar el
                  servicio, la calidad de los productos y el
                  comportamiento de los empleados.</p>
                <p> Contáctanos para obtener una evaluación exhaustiva y mejorar la calidad de atención al cliente de tu
                  empresa.</p>`,
    linkUrl: "./contacto.html",
  },
  // Verificación CVs
  13: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-check-cv.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195074",
    altText: "mesa-reunión-con-papeles",
    title: "Verificación de CV",
    type: "enterprise",
    default: false,
    description: `<p>Nuestro servicio de "Verificación de CV" te ayuda a verificar la veracidad de la información
                    proporcionada en el currículum vitae de tus empleados o candidatos. Nuestros detectives privados
                    altamente capacitados realizan una investigación detallada para garantizar que toda la información sea
                    precisa y confiable.</p>
                  <p> Contáctanos para obtener ayuda profesional en la verificación de CV.</p>`,
    linkUrl: "./contacto.html",
  },
  // Competencia desleal
  14: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-competitor.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195011",
    altText: "monitores-oficina-gente-trabajando",
    title: "Competencia desleal",
    type: "enterprise",
    default: false,
    description: `<p>Nuestro servicio te ayuda a proteger tu empresa contra actos de competencia
                    desleal por parte de tus competidores. Nuestros detectives investigan para
                    identificar posibles infracciones y recopilar pruebas para respaldar tus reclamos.</p>
                  <p>Si sospechas de competencia desleal en tu empresa, contáctanos para obtener ayuda profesional y
                    confidencial.</p>`,
    linkUrl: "./contacto.html",
  },
  // Subarrendamiento de pisos
  15: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-rentals.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195155",
    altText: "fachada-casa-colorida",
    title: "Subarrendamiento de pisos",
    type: "personal",
    default: false,
    description: `<p>Nuestro servicio de "Subarrendamiento de Pisos" te ayuda a proteger tu propiedad contra el
                    subarrendamiento ilegal por parte de tus inquilinos. Nuestros detectives privados altamente
                    capacitados investigan para identificar posibles infracciones y proporcionan pruebas para respaldar
                    tus reclamos. </p>
                  <p> Contáctanos para obtener ayuda profesional en la protección de tu propiedad.</p>`,
    linkUrl: "./contacto.html",
  },
  // Inteligencia de fuentes abiertas (OSINT)
  16: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-osint.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195101",
    altText: "teléfono-móvil",
    title: "Inteligencia de fuentes abiertas (OSINT)",
    type: "enterprisePersonal",
    default: false,
    description: `<p>Nuestro servicio de "OSINT" proporciona información valiosa para investigaciones legales y
                    corporativas. Nuestros detectives privados expertos recopilan y analizan información de fuentes
                    abiertas. </p>
                  <p>Contáctanos para obtener información clave y tomar decisiones informadas en cualquier caso
                    legal o de negocios.</p>`,
    linkUrl: "./contacto.html",

  },
  // Instalación cámaras ocultas
  17: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-camera-installation.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195063",
    altText: "objetivo-camara-reflex",
    title: "Instalación cámaras ocultas",
    type: "enterprisePersonal",
    default: true,
    description: `<p>Nuestro servicio de "Instalación de Cámaras Ocultas" te permite monitorear y proteger tu propiedad de
                    manera efectiva. Nuestros detectives privados expertos en seguridad instalan cámaras ocultas para
                    garantizar la seguridad de tu hogar o negocio.</p>
                  <p>Contáctanos para obtener ayuda profesional en la instalación de cámaras ocultas y proteger tu
                    propiedad.</p>`,
    linkUrl: "./contacto.html",
  },
  // Vigilancia no uniformada
  18: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-vigilante.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195190",
    altText: "silueta-joven-fondo-hacker",
    title: "Vigilancia no uniformada",
    type: "enterprisePersonal",
    default: false,
    description: `<p>Nuestro servicio de "Vigilancia no Uniformada" proporciona vigilancia discreta y efectiva sin la
                    presencia de guardias uniformados. Nuestros detectives privados altamente capacitados utilizan
                    técnicas de vigilancia avanzadas para garantizar la seguridad de tu hogar o negocio.</p>
                  <p> Contáctanos para obtener ayuda profesional en la vigilancia no uniformada.</p>`,
    linkUrl: "./contacto.html",
  },
  // Servicio de contra vigilancia
  19: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-counter-vigilance.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195000",
    altText: "pizarra-fotos-e-informes-persona-investigada",
    title: "Servicio de contra vigilancia",
    type: "enterprisePersonal",
    default: true,
    description: `<p>Nuestro servicio de "Contra Vigilancia" te ayuda a proteger tu privacidad y seguridad personal o
                    empresarial contra posibles acciones de vigilancia no autorizada. Nuestros detectives privados
                    expertos en seguridad identifican y neutralizan dispositivos de vigilancia no autorizados en tu
                    propiedad.</p>
                  <p> Contáctanos para obtener ayuda profesional en la contra vigilancia.</p>`,
    linkUrl: "./contacto.html",
  },
  // Búsqueda de personas desaparecidas
  20: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-person-search.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195092",
    altText: "mano-pinchando-chincheta-en-pizarra",
    title: "Búsqueda de personas desaparecidas",
    type: "personal",
    default: false,
    description: `<p>Nuestro servicio de "Búsqueda de Personas Desaparecidas" ayuda a localizar personas perdidas o
                    desaparecidas. Nuestros detectives privados expertos en investigación utilizan técnicas avanzadas para
                    encontrar a la persona desaparecida y proporcionan información y pruebas relevantes.</p>
                  <p> Contáctanos para obtener ayuda profesional en la búsqueda de personas desaparecidas.</p>`,
    linkUrl: "./contacto.html",
  },
  // Herencias
  21: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-herencia.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195176",
    altText: "billetes-con-monedas-encima",
    title: "Herencias",
    type: "personal",
    default: true,
    description: `<p>Nuestro servicio de "Herencias" te ayuda a resolver disputas y problemas relacionados con las
                    herencias. Nuestros detectives privados expertos en investigación recopilan información y pruebas
                    relevantes para proteger tus derechos y garantizar una distribución justa de la herencia.</p>
                  <p>Contáctanos para obtener ayuda profesional en asuntos de herencias.</p>`,
    linkUrl: "./contacto.html",
  },
  // Investigación patrimonial
  22: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-patrimonio.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195166",
    altText: "mano-con-tres-tarjetas",
    title: "Investigación patrimonial",
    type: "personal",
    default: false,
    description: `<p>Nuestro servicio de "Investigación Patrimonial" proporciona información detallada sobre los activos
                    de una persona o empresa. Nuestros detectives privados expertos en investigación utilizan técnicas
                    avanzadas para recopilar y analizar información relevante y proporcionar pruebas confiables.
                  </p>`,
    linkUrl: "./contacto.html",
  },
  // Barridos electrónicos
  23: {
    imgUrl: "https://ik.imagekit.io/gpv21iput/DetectivesYTu/services/tr:w-273,h-311/service-electronic-check.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1678046195131",
    altText: "circuito-electrónico-con-cables",
    title: "Barridos electrónicos",
    type: "personal",
    default: false,
    description: `<p>Nuestro servicio de "Barrido Electrónico" detecta y elimina dispositivos de escucha no autorizados y
                    cámaras ocultas en tu propiedad. Nuestros detectives privados altamente capacitados utilizan equipos
                    avanzados para garantizar la privacidad y seguridad de tu hogar o negocio.</p>
                  <p> Contáctanos para obtener ayuda profesional en el barrido electrónico.</p>`,
    linkUrl: "./contacto.html",
  },
};

const faqs = {
  0: {
    id: 0,
    question: "¿Por qué contratar a una agencia de detectives privados?",
    answer: `Las agencias de detectives privados ofrecen servicios especializados de investigación
    y vigilancia que pueden ayudar en situaciones donde se requiere información o pruebas confiables.
    Esto puede incluir investigaciones en el ámbito empresarial, legal, matrimonial, laboral o personal.
    Los detectives privados están altamente capacitados para recopilar información, realizar
    seguimientos y proporcionar pruebas sólidas que pueden ayudar en la toma de decisiones y en la resolución de
    conflictos.`,
    tags: "detective-privado,contratar-detective-privado,investigacion",
    default: true
  },
  1: {
    id: 1,
    question: "¿Cómo elegir una buena agencia de detectives privados?",
    answer: `Al elegir una agencia de detectives privados, es importante buscar una empresa que tenga experiencia
    y esté debidamente licenciada. Además, es importante buscar reseñas y testimonios de
    clientes anteriores y verificar que la empresa tenga una sólida reputación en el mercado. También es
    recomendable buscar una
    agencia que ofrezca servicios personalizados y una atención al cliente eficiente.`,
    default: false
  },
  2: {
    id: 2,
    question: "¿Cómo funciona el proceso de investigación de una agencia de detectives privados?",
    answer: `El proceso de investigación de una agencia de detectives privados puede variar según
    el tipo de caso y las necesidades del cliente. En general, los detectives privados utilizan técnicas
    de investigación avanzadas, como la vigilancia, la investigación de antecedentes y la recopilación de
    pruebas y testimonios. Los detectives privados también pueden proporcionar informes detallados
    y pruebas sólidas para apoyar sus investigaciones.`,
    default: true
  },
  3: {
    id: 3,
    question: "¿Cómo se mantiene la confidencialidad en una investigación de una agencia de detectives privados?",
    answer: `Las agencias de detectives privados están obligadas a mantener la confidencialidad de
    toda la información relacionada con sus investigaciones. Esto significa que toda la
    información recopilada y las pruebas proporcionadas se manejan con la máxima discreción y solo se comparten con
    el cliente y las autoridades competentes en caso de ser necesario. Las agencias de detectives
    privados también tienen protocolos de seguridad en su manejo de la información para garantizar la privacidad
    del cliente y proteger su reputación y seguridad.`,
    default: false
  },
  4: {
    id: 4,
    question: "¿Qué tipos de servicios ofrecen las agencias de detectives?",
    answer: `Las agencias de detectives pueden ofrecer una amplia gama de servicios, que van desde
    la investigación de antecedentes personales y profesionales, hasta la vigilancia,
    seguimiento y búsqueda de personas, investigación de fraudes, protección de la
    propiedad intelectual, entre otros. También pueden brindar servicios especializados
    en ámbitos como la seguridad informática, la seguridad privada y la seguridad
    corporativa.`,
    default: true
  },
  5: {
    id: 5,
    question: "¿Cómo eligen las agencias de detectives a sus investigadores?",
    answer: `Las agencias de detectives suelen buscar personas con una amplia variedad de
    habilidades y experiencia. A menudo, buscan candidatos que tengan experiencia en
    campos como la seguridad privada, las fuerzas armadas, la policía, la seguridad
    informática, entre otros. Además, los investigadores deben ser muy observadores,
    tener excelentes habilidades de comunicación y ser capaces de trabajar de manera
    discreta y confidencial.`,
    default: false
  },
  6: {
    id: 6,
    question: "¿Cómo puedo saber si una agencia de detectives es confiable?",
    answer: `Antes de contratar una agencia de detectives, es importante investigar su reputación
    y experiencia. Es recomendable buscar reseñas y referencias en línea, así como
    verificar si la agencia está registrada y licenciada en su estado o país. También es
    importante asegurarse de que la agencia tenga experiencia en el tipo de
    investigación que se necesita y de que proporcione un contrato claro y detallado que
    describa los servicios que se brindarán y los costos asociados.`,
    default: true
  },
  7: {
    id: 7,
    question: "¿Qué tipo de casos puede resolver una agencia de detectives?",
    answer: `Una agencia de detectives puede resolver una amplia variedad de casos, desde
    investigaciones personales como la infidelidad, hasta casos empresariales como la
    competencia desleal. También pueden investigar fraudes, robos, accidentes laborales,
    herencias, entre otros.`,
    default: false
  },
  8: {
    id: 8,
    question: "¿Cuánto tiempo lleva resolver un caso?",
    answer: `El tiempo que lleva resolver un caso puede variar mucho dependiendo de la complejidad
    del mismo. Algunos casos pueden ser resueltos en unos pocos días, mientras que otros
    pueden tomar semanas o incluso meses.`,
    default: true
  },
  9: {
    id: 9,
    question: "¿Qué información se necesita para comenzar una investigación?",
    answer: `Para comenzar una investigación, la agencia de detectives necesitará la mayor
    cantidad de información posible relacionada con el caso en cuestión. Esto puede
    incluir nombres, direcciones, lugares de trabajo, fotografías, entre otros datos
    relevantes.`,
    default: true
  },
  10: {
    id: 10,
    question: "¿Cómo se lleva a cabo una investigación?",
    answer: `La agencia de detectives llevará a cabo la investigación utilizando diversas técnicas
    y herramientas, que pueden incluir vigilancia, seguimiento, análisis de documentos,
    entrevistas y análisis forense, entre otros.`,
    default: true
  },
  11: {
    id: 11,
    question: "¿Cómo se garantiza la privacidad y confidencialidad de la información?",
    answer: `Las agencias de detectives están obligadas a cumplir con las leyes de privacidad y
    confidencialidad en todo momento. La información recopilada durante la investigación
    solo se compartirá con las partes involucradas en el caso y solo en la medida
    necesaria para resolver el caso en cuestión.`,
    default: true
  }
}

function displayServices(buttonId) {
  let pressedButton = document.getElementById(buttonId);
  setContent(pressedButton);
}

function setContent(pressedButton) {
  switch (pressedButton.id) {
    case ENTERPRISE_BUTTON_ID:
      pressedButton.style =
        "pointer-events:none; background-color: var(--white-color); color: var(--blue-theme-color); ";
      document.getElementById(PERSONAL_BUTTON_ID).style = "";
      enableEnterpriseCards();

      break;
    case PERSONAL_BUTTON_ID:
      pressedButton.style =
        "pointer-events:none; background-color: var(--white-color); color: var(--blue-theme-color); ";
      document.getElementById(ENTERPRISE_BUTTON_ID).style = "";
      enablePersonalCards();
      break;
  }
}

function enableEnterpriseCards() {
  let initialSection = document.getElementById(INITIAL_FULL_SECTION_ID);
  let section = document.getElementById(FULL_SECTION_ID);
  let cardsEnterprise = document.getElementsByClassName(ENTERPRISE_CARD_CLASS);
  let cardsPersonal = document.getElementsByClassName(PERSONAL_CARD_CLASS);
  let subtitle = document.getElementById(SERVICES_SUBTITLE_ID);

  subtitle.innerText =
    "Equipo especializado en temas laborales y empresariales";

  initialSection.style.display = "none";
  section.style.display = "flex";

  for (let i = 0; i < cardsPersonal.length; i++) {
    cardsPersonal[i].style.display = "none";
  }

  for (let i = 0; i < cardsEnterprise.length; i++) {
    cardsEnterprise[i].style.display = "flex";
  }
}

function enablePersonalCards() {
  let initialSection = document.getElementById(INITIAL_FULL_SECTION_ID);
  let section = document.getElementById(FULL_SECTION_ID);
  let cardsEnterprise = document.getElementsByClassName(ENTERPRISE_CARD_CLASS);
  let cardsPersonal = document.getElementsByClassName(PERSONAL_CARD_CLASS);
  let subtitle = document.getElementById(SERVICES_SUBTITLE_ID);

  subtitle.innerText =
    "Máxima discrección y especialización en temas familiares";

  initialSection.style.display = "none";
  section.style.display = "flex";

  for (let i = 0; i < cardsEnterprise.length; i++) {
    cardsEnterprise[i].style.display = "none";
  }

  for (let i = 0; i < cardsPersonal.length; i++) {
    cardsPersonal[i].style.display = "flex";
  }
}

function setCurrentYearCopyright() {
  document.getElementById("current-year").innerHTML =
    "" + new Date().getFullYear();
}

function setCollapsableListener() {
  let coll = document.getElementsByClassName("collapsible");

  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      let content = this.nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.margin = "0";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.margin = "15px";
      }
    });
  }
}

function loadServices() {
  for (const key in services) {
    const { imgUrl, altText, title, description, linkUrl, default: defaultService } = services[key];

    const serviceTemplate = `<div class="service-card card-shadow">
    <div class="service-card-image">
      <img loading="lazy"
        src="${imgUrl}"
        alt="${altText}" />
    </div>
    <div class="service-card-content">
      <div class="service-card-title">
        <h5>${title}</h5>
      </div>
      <hr>
      <div class="service-card-description">
        ${description}
      </div>
      <div class="service-card-link">
        <a href="${linkUrl}">Más información</a>
      </div>
    </div>
  </div>`;

    if(defaultService){
      let template = document.createElement('template');
      template.innerHTML = serviceTemplate;
      document.getElementById("services-section-id").appendChild(template.content.firstChild);
    }
  }
}

function loadEnterpriseServices() {
  document.getElementById("services-section-id").innerHTML = "";
  document.getElementById("services-subtitle-id").innerHTML = "Para Empresa";

  for (const key in services) {
    const { imgUrl, altText, title, description, linkUrl, default: defaultService, type } = services[key];

    const serviceTemplate = `<div class="service-card card-shadow">
    <div class="service-card-image">
      <img loading="lazy"
        src="${imgUrl}"
        alt="${altText}" />
    </div>
    <div class="service-card-content">
      <div class="service-card-title">
        <h5>${title}</h5>
      </div>
      <hr>
      <div class="service-card-description">
        ${description}
      </div>
      <div class="service-card-link">
        <a href="${linkUrl}">Más información</a>
      </div>
    </div>
  </div>`;

    if(type.includes("enterprise") || type.includes("enterprisePersonal") ){
      let template = document.createElement('template');
      template.innerHTML = serviceTemplate;
      document.getElementById("services-section-id").appendChild(template.content.firstChild);
    }
  }
}

function loadPersonalServices() {
  document.getElementById("services-section-id").innerHTML = "";
  document.getElementById("services-subtitle-id").innerHTML = "Para Particulares";

  for (const key in services) {
    const { imgUrl, altText, title, description, linkUrl, default: defaultService, type } = services[key];

    const serviceTemplate = `<div class="service-card card-shadow">
    <div class="service-card-image">
      <img loading="lazy"
        src="${imgUrl}"
        alt="${altText}" />
    </div>
    <div class="service-card-content">
      <div class="service-card-title">
        <h5>${title}</h5>
      </div>
      <hr>
      <div class="service-card-description">
        ${description}
      </div>
      <div class="service-card-link">
        <a href="${linkUrl}">Más información</a>
      </div>
    </div>
  </div>`;

    if(type.includes("personal") || type.includes("enterprisePersonal") ){
      let template = document.createElement('template');
      template.innerHTML = serviceTemplate;
      document.getElementById("services-section-id").appendChild(template.content.firstChild);
    }
  }
}

function handleClickFaqLink(id){
  document.getElementById("faq-answer-id").innerHTML = "";
  document.getElementById("faq-answer-id").innerHTML = `<div>${faqs[id].answer}</div>`;
}

function loadFaqs(faqsToDisplay){
  document.getElementById("faq-links-id").innerHTML = "";
  for (let i = 0; i < faqsToDisplay.length; i++) {
    const { id, question } = faqsToDisplay[i];
    const faqTemplate = `<div id=${id} class='faq-link cursor-question' onclick='handleClickFaqLink(this.id)' ><a>${question}</a></div>`;

    let template = document.createElement('template');
    template.innerHTML = faqTemplate;
    document.getElementById("faq-links-id").appendChild(template.content.firstChild);
  }
}

function handleOnkeydownFaqSearch(value){
  let filteredValues = [];
  for (let i = 0; i < Object.keys(faqs).length; i++) {
    if( faqs[i].question.includes(value) ){
      filteredValues.push(faqs[i]);
    }
  }

  loadFaqs(filteredValues);
}

function init() {
  setCurrentYearCopyright();
  if( document.getElementById("index") !== null ){
    setCollapsableListener();
    loadServices();
  }

  if( document.getElementById("faq") !== null ){
    let faqsArray = [];
    for (const key in faqs) {
      if( faqs[key].default ){
        faqsArray.push( faqs[key] );
      }
    }

    loadFaqs(faqsArray)
  }

}

function sendEmail(){
  const templateParams = {
    from_name: document.getElementById("name").value,
    reply_to: document.getElementById("email").value,
    message: document.getElementById("mensaje").value,
    phone: document.getElementById("phone").value,
  }

  emailjs.send('service_5wt03qg', 'template_mgev9di', templateParams )
  .then( (response) => {
    // Si es correcto se muestra mensaje CORRECTO
    if(response.status === 200){
      document.getElementById("submitButton").style.display = "none";
      document.getElementById("submitInfo").innerHTML = "Se ha mandado correctamente el email";
    }
    // Si es correcto se muestra mensaje ERROR
    else{
      document.getElementById("submitInfo").innerHTML = "Ha ocurrido un error al mandar el email, vuelva a intentarlo";
    }
  } );

  return false;
}

init();
