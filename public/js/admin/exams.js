const examGrid = document.getElementById('examGrid')

examGrid.innerHTML = DaxsAdminStore.getLevels().map((level) => `
  <article class="lessonItem">
    <div class="lessonHeader">
      <span>${String(level.id).padStart(2, '0')}</span>
      <strong>${level.exam.title}</strong>
    </div>
    <p>${level.name}: ${level.title}</p>
    <div class="lessonChecks">
      <span>${level.exam.questions} preguntas</span>
      <span>Aprobacion ${level.exam.passingScore}%</span>
      <span>Speaking IA</span>
      <span>Pago requerido</span>
    </div>
  </article>
`).join('')
