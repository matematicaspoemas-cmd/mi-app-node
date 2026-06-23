const dashboardLevelForm = document.getElementById('dashboardLevelForm')
const dashboardLessonForm = document.getElementById('dashboardLessonForm')
const dashboardLevelPreview = document.getElementById('dashboardLevelPreview')
const dashboardLessonPreview = document.getElementById('dashboardLessonPreview')
const dashboardLessonLevel = document.getElementById('dashboardLessonLevel')

function getDashboardLevels() {
  return DaxsAdminStore.getLevels()
}

function renderDashboardLessonOptions() {
  const selectedValue = dashboardLessonLevel.value
  const levels = getDashboardLevels()

  dashboardLessonLevel.innerHTML = levels.map((level) => `
    <option value="${level.id}">${level.name} - ${level.title}</option>
  `).join('')

  if (selectedValue) dashboardLessonLevel.value = selectedValue
}

function getDashboardLevelData() {
  return {
    name: document.getElementById('dashboardLevelName').value.trim(),
    block: document.getElementById('dashboardLevelBlock').value,
    title: document.getElementById('dashboardLevelTitle').value.trim(),
    duration: '1 mes',
    description: document.getElementById('dashboardLevelDescription').value.trim()
  }
}

function getDashboardLessonData() {
  return {
    levelId: Number(dashboardLessonLevel.value),
    lessonNumber: Number(document.getElementById('dashboardLessonNumber').value),
    title: document.getElementById('dashboardLessonTitle').value.trim(),
    objective: document.getElementById('dashboardLessonTitle').value.trim(),
    content: document.getElementById('dashboardLessonContent').value.trim(),
    homework: document.getElementById('dashboardLessonHomework').value.trim(),
    testQuestions: 10,
    testPassingScore: 70,
    pronunciationScore: 75
  }
}

function renderDashboardLevelPreview() {
  const data = getDashboardLevelData()

  dashboardLevelPreview.innerHTML = `
    <p class="eyebrow">Previsualizacion del nivel</p>
    <div class="detailHero ${data.block.toLowerCase()}">
      <p>${data.block} / 1 mes</p>
      <h2>${data.name || 'Nivel nuevo'}: ${data.title || 'Titulo del nivel'}</h2>
      <span>10 lecciones + examen final</span>
    </div>
    <p>${data.description || 'Aqui veras la descripcion del nivel mientras escribes.'}</p>
  `
}

function renderDashboardLessonPreview() {
  const data = getDashboardLessonData()
  const level = getDashboardLevels().find((item) => item.id === Number(data.levelId))

  dashboardLessonPreview.innerHTML = `
    <p class="eyebrow">Previsualizacion de la leccion</p>
    <article class="lessonItem previewLesson">
      <div class="lessonHeader">
        <span>${String(data.lessonNumber || 1).padStart(2, '0')}</span>
        <strong>${data.title || 'Titulo de la leccion'}</strong>
      </div>
      <p>${level ? level.name : 'Nivel seleccionado'}</p>
      <div class="previewContent">
        ${data.content || 'Aqui aparecera el contenido principal.'}
      </div>
      <div class="lessonChecks">
        <span>Test 10 preguntas</span>
        <span>Tarea</span>
        <span>Pronunciacion IA</span>
      </div>
      <p class="homeworkPreview">${data.homework || 'Aqui aparecera la tarea.'}</p>
    </article>
  `
}

function refreshDashboardBlocks() {
  const blockContainer = document.getElementById('programBlocks')
  if (!blockContainer) return

  const levels = getDashboardLevels()
  const lessonCount = levels.reduce((total, level) => total + level.lessons.length, 0)
  const blockCounts = levels.reduce((acc, level) => {
    acc[level.block] = (acc[level.block] || 0) + 1
    return acc
  }, {})

  document.getElementById('dashboardTotalLevels').innerText = levels.length
  document.getElementById('dashboardTotalLessons').innerText = lessonCount
  document.getElementById('dashboardTotalTests').innerText = lessonCount
  document.getElementById('dashboardTotalExams').innerText = levels.length

  blockContainer.innerHTML = Object.entries(blockCounts).map(([block, count]) => `
    <article class="card">
      <h3>${block}</h3>
      <p>${count}</p>
      <small>niveles mensuales</small>
    </article>
  `).join('')
}

dashboardLevelForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const newLevel = DaxsAdminStore.addLevel(getDashboardLevelData())

  dashboardLevelForm.reset()
  renderDashboardLessonOptions()
  dashboardLessonLevel.value = String(newLevel.id)
  renderDashboardLevelPreview()
  renderDashboardLessonPreview()
  refreshDashboardBlocks()
})

dashboardLessonForm.addEventListener('submit', (event) => {
  event.preventDefault()
  DaxsAdminStore.addLesson(getDashboardLessonData())
  renderDashboardLessonPreview()
})

dashboardLevelForm.addEventListener('input', renderDashboardLevelPreview)
dashboardLessonForm.addEventListener('input', renderDashboardLessonPreview)
dashboardLessonLevel.addEventListener('change', renderDashboardLessonPreview)

renderDashboardLessonOptions()
renderDashboardLevelPreview()
renderDashboardLessonPreview()
refreshDashboardBlocks()
