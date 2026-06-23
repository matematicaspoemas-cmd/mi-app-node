const DAXS_CURRICULUM = [
  {
    stage: 'Basico',
    levels: [
      ['Nivel 1', 'Primeras conversaciones', 'Saludos, alfabeto, numeros, presentaciones y frases de supervivencia.'],
      ['Nivel 2', 'Vida diaria', 'Rutinas, horas, dias, objetos personales y verbos frecuentes.'],
      ['Nivel 3', 'Personas y lugares', 'Familia, descripciones, lugares de la ciudad y preguntas simples.'],
      ['Nivel 4', 'Compras y comida', 'Precios, cantidades, restaurantes, gustos y preferencias.'],
      ['Nivel 5', 'Pasado inicial', 'Historias cortas, pasado simple regular e irregular y conectores basicos.'],
      ['Nivel 6', 'Viajes basicos', 'Indicaciones, reservas, transporte, clima y revision general del bloque.']
    ]
  },
  {
    stage: 'Intermedio',
    levels: [
      ['Nivel 7', 'Conversaciones mas largas', 'Opiniones, experiencias, comparativos, planes y conversaciones guiadas.'],
      ['Nivel 8', 'Trabajo y estudio', 'Entrevistas, metas, obligaciones, habilidades y vocabulario profesional.'],
      ['Nivel 9', 'Historias y experiencias', 'Presente perfecto, narracion, contraste pasado-presente y fluidez.'],
      ['Nivel 10', 'Solucion de problemas', 'Consejos, quejas, solicitudes, modales y situaciones reales.'],
      ['Nivel 11', 'Medios y cultura', 'Noticias simples, peliculas, musica, tecnologia y debates cortos.'],
      ['Nivel 12', 'Intermedio integral', 'Integracion de tiempos, writing funcional, listening extendido y speaking evaluado.']
    ]
  },
  {
    stage: 'Avanzado',
    levels: [
      ['Nivel 13', 'Fluidez social', 'Matices, expresiones naturales, humor, acuerdo y desacuerdo.'],
      ['Nivel 14', 'Ingles profesional', 'Presentaciones, reuniones, negociacion, correos y reportes.'],
      ['Nivel 15', 'Argumentacion', 'Ensayos, debates, evidencia, conectores avanzados y pensamiento critico.'],
      ['Nivel 16', 'Listening avanzado', 'Acentos, velocidad natural, podcasts, conferencias y toma de notas.'],
      ['Nivel 17', 'Produccion avanzada', 'Storytelling, discursos, escritura persuasiva y revision con IA.'],
      ['Nivel 18', 'Certificacion final', 'Simulacro completo, examen final, entrevista oral y plan de continuidad.']
    ]
  }
]

function buildLessonTemplate(levelNumber, lessonNumber, levelTitle) {
  const lessonThemes = [
    'Vocabulario clave',
    'Gramatica aplicada',
    'Listening guiado',
    'Speaking practice',
    'Reading corto',
    'Writing practico',
    'Situacion real',
    'Conversacion con IA',
    'Repaso activo',
    'Proyecto del nivel'
  ]

  return {
    id: `L${levelNumber}-${lessonNumber}`,
    title: `Leccion ${lessonNumber}: ${lessonThemes[lessonNumber - 1]}`,
    objective: `Aplicar ${levelTitle.toLowerCase()} en una actividad practica.`,
    test: {
      questions: 10,
      passingScore: 70
    },
    homework: 'Tarea escrita o grabada para revisar comprension y produccion.',
    pronunciation: {
      enabled: true,
      reviewedBy: 'IA',
      passingScore: 75
    }
  }
}

function getDaxsLevels() {
  let levelCounter = 0

  return DAXS_CURRICULUM.flatMap((block) =>
    block.levels.map(([name, title, description]) => {
      levelCounter += 1

      return {
        id: levelCounter,
        name,
        block: block.stage,
        title,
        duration: '1 mes',
        description,
        lessons: Array.from({ length: 10 }, (_, index) =>
          buildLessonTemplate(levelCounter, index + 1, title)
        ),
        exam: {
          title: `Examen ${name}`,
          questions: 30,
          passingScore: 80,
          includesSpeaking: true
        },
        unlockRules: [
          'Completar las 10 lecciones',
          'Aprobar cada test de leccion',
          'Enviar cada tarea',
          'Aprobar examen del nivel',
          'Confirmar pago activo'
        ]
      }
    })
  )
}
