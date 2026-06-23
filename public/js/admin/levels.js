let levels = DaxsAdminStore.getLevels()
const blocks = ['Todos', 'Basico', 'Intermedio', 'Avanzado']

let selectedBlock = 'Todos'
let selectedLevelId = 1

const levelList = document.getElementById('levelList')
const levelDetail = document.getElementById('levelDetail')
const levelFilters = document.getElementById('levelFilters')
const levelSearch = document.getElementById('levelSearch')
const levelForm = document.getElementById('levelForm')
const levelLivePreview = document.getElementById('levelLivePreview')

function getFilteredLevels() {
  const query = levelSearch.value.trim().toLowerCase()

  return levels.filter((level) => {
    const matchesBlock = selectedBlock === 'Todos' || level.block === selectedBlock
    const text = `${level.name} ${level.block} ${level.title} ${level.description}`.toLowerCase()
    const matchesSearch = text.includes(query)

    return matchesBlock && matchesSearch
  })
}

function renderFilters() {
  levelFilters.innerHTML = blocks.map((block) => `
    <button
      class="filterBtn ${block === selectedBlock ? 'active' : ''}"
      type="button"
      data-block="${block}"
    >
      ${block}
    </button>
  `).join('')

  document.querySelectorAll('.filterBtn').forEach((button) => {
    button.addEventListener('click', () => {
      selectedBlock = button.dataset.block
      const firstLevel = getFilteredLevels()[0]
      selectedLevelId = firstLevel ? firstLevel.id : selectedLevelId
      render()
    })
  })
}

function getPaymentStatus(level) {
  if (level.id === 1) return 'Pago confirmado'
  if (level.id <= 3) return 'Pendiente de pago'
  return 'Bloqueado'
}

function getProgressStatus(level) {
  if (level.id === 1) return 'Disponible'
  if (level.id === 2) return 'Siguiente'
  return 'Bloqueado'
}

function renderLevelList() {
  const filteredLevels = getFilteredLevels()

  if (filteredLevels.length === 0) {
    levelList.innerHTML = '<p class="emptyState">No hay niveles con ese filtro.</p>'
    return
  }

  levelList.innerHTML = filteredLevels.map((level) => `
    <button
      class="levelRow ${level.id === selectedLevelId ? 'selected' : ''}"
      type="button"
      data-level-id="${level.id}"
    >
      <span class="levelNumber">${String(level.id).padStart(2, '0')}</span>
      <span>
        <strong>${level.name}</strong>
        <small>${level.block} - ${level.title}</small>
      </span>
      <em>${getProgressStatus(level)}</em>
    </button>
  `).join('')

  document.querySelectorAll('.levelRow').forEach((row) => {
    row.addEventListener('click', () => {
      selectedLevelId = Number(row.dataset.levelId)
      render()
    })
  })
}

function renderLessons(level) {
  return level.lessons.map((lesson, index) => `
    <li class="lessonItem">
      <div class="lessonHeader">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <strong>${lesson.title}</strong>
      </div>
      <p>${lesson.objective}</p>
      <div class="lessonChecks">
        <span>Test ${lesson.test.questions} preguntas</span>
        <span>Tarea</span>
        <span>Pronunciacion IA ${lesson.pronunciation.passingScore}%</span>
      </div>
    </li>
  `).join('')
}

function renderRules(level) {
  return level.unlockRules.map((rule) => `<li>${rule}</li>`).join('')
}

function renderDetail() {
  const level = levels.find((item) => item.id === selectedLevelId) || levels[0]

  levelDetail.innerHTML = `
    <div class="detailHero ${level.block.toLowerCase()}">
      <p>${level.block} / ${level.duration}</p>
      <h2>${level.name}: ${level.title}</h2>
      <span>${getPaymentStatus(level)}</span>
    </div>

    <section class="detailBand">
      <div>
        <h3>Objetivo del nivel</h3>
        <p>${level.description}</p>
      </div>
      <div class="examBox">
        <strong>${level.exam.title}</strong>
        <span>${level.exam.questions} preguntas</span>
        <span>Aprobacion ${level.exam.passingScore}%</span>
        <span>Speaking incluido</span>
      </div>
    </section>

    <section class="rulesBand">
      <h3>Reglas para desbloquear el siguiente nivel</h3>
      <ul>${renderRules(level)}</ul>
    </section>

    <section>
      <div class="sectionTitle">
        <h3>Plantilla de 10 lecciones</h3>
        <a href="/admin/lessons.html">Gestionar lecciones</a>
      </div>
      <ol class="lessonGrid">${renderLessons(level)}</ol>
    </section>
  `
}

function getLevelFormData() {
  return {
    name: document.getElementById('newLevelName').value.trim(),
    block: document.getElementById('newLevelBlock').value,
    title: document.getElementById('newLevelTitle').value.trim(),
    duration: document.getElementById('newLevelDuration').value.trim(),
    description: document.getElementById('newLevelDescription').value.trim()
  }
}

function renderLevelLivePreview() {
  const data = getLevelFormData()
  const preview = {
    name: data.name || 'Nivel nuevo',
    block: data.block || 'Basico',
    title: data.title || 'Titulo del nivel',
    duration: data.duration || '1 mes',
    description: data.description || 'La descripcion del nivel aparecera aqui mientras escribes.'
  }

  levelLivePreview.innerHTML = `
    <p class="eyebrow">Previsualizacion</p>
    <div class="detailHero ${preview.block.toLowerCase()}">
      <p>${preview.block} / ${preview.duration}</p>
      <h2>${preview.name}: ${preview.title}</h2>
      <span>10 lecciones + examen final</span>
    </div>
    <p>${preview.description}</p>
  `
}

function saveLevel(event) {
  event.preventDefault()

  const data = getLevelFormData()
  const newLevel = DaxsAdminStore.addLevel(data)

  levels = DaxsAdminStore.getLevels()
  selectedBlock = 'Todos'
  selectedLevelId = newLevel.id
  levelForm.reset()
  document.getElementById('newLevelDuration').value = '1 mes'

  renderLevelLivePreview()
  render()
}

function render() {
  levels = DaxsAdminStore.getLevels()
  renderFilters()
  renderLevelList()
  renderDetail()
}

levelForm.addEventListener('submit', saveLevel)
levelForm.addEventListener('input', renderLevelLivePreview)

levelSearch.addEventListener('input', () => {
  const firstLevel = getFilteredLevels()[0]
  if (firstLevel) selectedLevelId = firstLevel.id
  render()
})

renderLevelLivePreview()
render()
