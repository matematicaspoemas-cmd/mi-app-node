const DAXS_STORAGE_KEYS = {
  levels: 'daxs_custom_levels',
  lessons: 'daxs_custom_lessons'
}

function readStoredItems(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch (error) {
    return []
  }
}

function saveStoredItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items))
}

function createDefaultLesson(levelId, lessonNumber, title, objective) {
  return {
    id: `C${levelId}-${lessonNumber}`,
    title: title || `Leccion ${lessonNumber}: Nueva leccion`,
    objective: objective || 'Objetivo pendiente por definir.',
    content: '',
    test: {
      questions: 10,
      passingScore: 70
    },
    homework: 'Tarea pendiente por definir.',
    pronunciation: {
      enabled: true,
      reviewedBy: 'IA',
      passingScore: 75
    }
  }
}

const DaxsAdminStore = {
  getCustomLevels() {
    return readStoredItems(DAXS_STORAGE_KEYS.levels)
  },

  getCustomLessons() {
    return readStoredItems(DAXS_STORAGE_KEYS.lessons)
  },

  getLevels() {
    const baseLevels = getDaxsLevels()
    const customLevels = this.getCustomLevels()

    return [...baseLevels, ...customLevels].map((level) => ({
      ...level,
      lessons: this.getLessonsByLevel(level.id, level.lessons)
    }))
  },

  getLessonsByLevel(levelId, fallbackLessons = []) {
    const customLessons = this.getCustomLessons().filter((lesson) =>
      String(lesson.levelId) === String(levelId)
    )

    if (customLessons.length === 0) return fallbackLessons

    const mergedLessons = [...fallbackLessons]

    customLessons.forEach((lesson) => {
      const index = Number(lesson.lessonNumber) - 1

      if (index >= 0 && index < mergedLessons.length) {
        mergedLessons[index] = lesson
      } else {
        mergedLessons.push(lesson)
      }
    })

    return mergedLessons
  },

  addLevel(data) {
    const customLevels = this.getCustomLevels()
    const nextId = Math.max(...getDaxsLevels().map((level) => level.id), ...customLevels.map((level) => level.id), 18) + 1

    const newLevel = {
      id: nextId,
      name: data.name || `Nivel ${nextId}`,
      block: data.block || 'Basico',
      title: data.title || 'Nuevo nivel',
      duration: data.duration || '1 mes',
      description: data.description || 'Descripcion pendiente por completar.',
      lessons: Array.from({ length: 10 }, (_, index) =>
        createDefaultLesson(nextId, index + 1)
      ),
      exam: {
        title: `Examen Nivel ${nextId}`,
        questions: Number(data.examQuestions) || 30,
        passingScore: Number(data.examPassingScore) || 80,
        includesSpeaking: true
      },
      unlockRules: [
        'Completar las 10 lecciones',
        'Aprobar cada test de leccion',
        'Enviar cada tarea',
        'Aprobar examen del nivel',
        'Confirmar pago activo'
      ],
      custom: true
    }

    customLevels.push(newLevel)
    saveStoredItems(DAXS_STORAGE_KEYS.levels, customLevels)

    return newLevel
  },

  addLesson(data) {
    const lessons = this.getCustomLessons()
    const lessonNumber = Number(data.lessonNumber) || lessons.filter((lesson) =>
      String(lesson.levelId) === String(data.levelId)
    ).length + 1

    const newLesson = {
      id: `CUSTOM-${Date.now()}`,
      levelId: Number(data.levelId),
      lessonNumber,
      title: data.title || `Leccion ${lessonNumber}: Nueva leccion`,
      objective: data.objective || 'Objetivo pendiente por definir.',
      content: data.content || '',
      test: {
        questions: Number(data.testQuestions) || 10,
        passingScore: Number(data.testPassingScore) || 70
      },
      homework: data.homework || 'Tarea pendiente por definir.',
      pronunciation: {
        enabled: true,
        reviewedBy: 'IA',
        passingScore: Number(data.pronunciationScore) || 75
      }
    }

    lessons.push(newLesson)
    saveStoredItems(DAXS_STORAGE_KEYS.lessons, lessons)

    return newLesson
  }
}
