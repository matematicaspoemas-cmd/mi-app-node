let lessonLevels = DaxsAdminStore.getLevels()
const lessonLevelSelect = document.getElementById('lessonLevelSelect')
const lessonPreview = document.getElementById('lessonPreview')
const lessonForm = document.getElementById('lessonForm')
const lessonLivePreview = document.getElementById('lessonLivePreview')

function renderLevelOptions() {
  const selectedValue = lessonLevelSelect.value

  lessonLevelSelect.innerHTML = lessonLevels.map((level) => `
    <option value="${level.id}">${level.name} - ${level.title}</option>
  `).join('')

  if (selectedValue) lessonLevelSelect.value = selectedValue
}

function getLessonFormData() {
  return {
    levelId: Number(lessonLevelSelect.value),
    lessonNumber: Number(document.getElementById('lessonNumber').value),
    title: document.getElementById('lessonTitle').value.trim(),
    objective: document.getElementById('lessonObjective').value.trim(),
    content: document.getElementById('lessonContent').value.trim(),
    homework: document.getElementById('lessonHomework').value.trim(),
    testQuestions: Number(document.getElementById('lessonTestQuestions').value),
    testPassingScore: Number(document.getElementById('lessonTestPassing').value),
    pronunciationScore: Number(document.getElementById('lessonPronunciationScore').value)
  }
}

function renderLessonLivePreview() {
  const data = getLessonFormData()
  const level = lessonLevels.find((item) => item.id === Number(lessonLevelSelect.value))

  lessonLivePreview.innerHTML = `
    <p class="eyebrow">Previsualizacion</p>
    <article class="lessonItem previewLesson">
      <div class="lessonHeader">
        <span>${String(data.lessonNumber || 1).padStart(2, '0')}</span>
        <strong>${data.title || 'Titulo de la leccion'}</strong>
      </div>
      <p>${data.objective || 'El objetivo de la leccion aparecera aqui.'}</p>
      <div class="previewContent">
        ${data.content || 'El contenido de la leccion se vera en esta zona mientras escribes.'}
      </div>
      <div class="lessonChecks">
        <span>${level ? level.name : 'Nivel'}</span>
        <span>Test ${data.testQuestions || 10} preguntas</span>
        <span>Aprobacion ${data.testPassingScore || 70}%</span>
        <span>Pronunciacion IA ${data.pronunciationScore || 75}%</span>
      </div>
      <p class="homeworkPreview">${data.homework || 'La tarea aparecera aqui.'}</p>
    </article>
  `
}

function renderLessonPreview() {
  lessonLevels = DaxsAdminStore.getLevels()
  const level = lessonLevels.find((item) => item.id === Number(lessonLevelSelect.value))

  lessonPreview.innerHTML = `
    <div class="detailHero ${level.block.toLowerCase()}">
      <p>${level.block} / ${level.duration}</p>
      <h2>${level.name}: ${level.title}</h2>
      <span>10 lecciones listas para completar</span>
    </div>

    <div class="lessonGrid">
      ${level.lessons.map((lesson, index) => `
        <article class="lessonItem">
          <div class="lessonHeader">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <strong>${lesson.title}</strong>
          </div>
          <p>${lesson.objective}</p>
          <div class="lessonChecks">
            <span>Contenido</span>
            <span>Test ${lesson.test.passingScore}%</span>
            <span>Tarea</span>
            <span>Speaking IA</span>
          </div>
        </article>
      `).join('')}
    </div>
  `
}

function saveLesson(event) {
  event.preventDefault()

  DaxsAdminStore.addLesson(getLessonFormData())
  lessonLevels = DaxsAdminStore.getLevels()

  renderLevelOptions()
  renderLessonPreview()
  renderLessonLivePreview()
}

renderLevelOptions()

lessonLevelSelect.addEventListener('change', () => {
  renderLessonPreview()
  renderLessonLivePreview()
})

lessonForm.addEventListener('submit', saveLesson)
lessonForm.addEventListener('input', renderLessonLivePreview)

renderLessonPreview()
renderLessonLivePreview()
