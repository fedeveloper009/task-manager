 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      let currentFilter = "all";

      // DOM Elements
      const taskForm = document.getElementById("taskForm");
      const taskTitle = document.getElementById("taskTitle");
      const taskDescription = document.getElementById("taskDescription");
      const taskPoints = document.getElementById("taskPoints");
      const taskDeadline = document.getElementById("taskDeadline");
      const formExpanded = document.getElementById("formExpanded");
      const taskList = document.getElementById("taskList");
      const totalScore = document.getElementById("totalScore");
      const completedCount = document.getElementById("completedCount");
      const allCount = document.getElementById("allCount");
      const pendingCount = document.getElementById("pendingCount");
      const expiredCount = document.getElementById("expiredCount");
      const completedTabCount = document.getElementById("completedTabCount");

      // Initialize
      renderTasks();
      updateStats();

      // Event Listeners
      taskTitle.addEventListener("focus", () => {
        formExpanded.classList.add("show");
      });

      taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addTask();
      });

      // Points preset buttons
      document.querySelectorAll(".btn-preset").forEach((btn) => {
        btn.addEventListener("click", () => {
          const points = btn.dataset.points;
          taskPoints.value = points;

          document
            .querySelectorAll(".btn-preset")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
        });
      });

      // Filter buttons
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          currentFilter = btn.dataset.filter;

          document
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          renderTasks();
        });
      });

      // Functions
      function addTask() {
        const task = {
          id: Date.now().toString(),
          title: taskTitle.value.trim(),
          description: taskDescription.value.trim(),
          points: parseInt(taskPoints.value) || 10,
          deadline: taskDeadline.value || null,
          completed: false,
          completedAt: null,
        };

        tasks.unshift(task);
        saveTasks();

        // Reset form
        taskTitle.value = "";
        taskDescription.value = "";
        taskPoints.value = "10";
        taskDeadline.value = "";
        formExpanded.classList.remove("show");

        renderTasks();
        updateStats();
      }

      function toggleTask(id) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
          task.completed = !task.completed;
          task.completedAt = task.completed ? new Date().toISOString() : null;
          saveTasks();
          renderTasks();
          updateStats();
        }
      }

      function deleteTask(id) {
        if (confirm("Deseja realmente excluir esta tarefa?")) {
          tasks = tasks.filter((t) => t.id !== id);
          saveTasks();
          renderTasks();
          updateStats();
        }
      }

      function getTaskStatus(task) {
        if (task.completed) return "completed";
        if (task.deadline) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const deadline = new Date(task.deadline);
          deadline.setHours(0, 0, 0, 0);
          if (deadline < today) return "expired";
        }
        return "pending";
      }

      function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-BR");
      }

      function getDaysUntilDeadline(deadline) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      }

      function renderTasks() {
        const filteredTasks = tasks.filter((task) => {
          const status = getTaskStatus(task);
          if (currentFilter === "pending") return status === "pending";
          if (currentFilter === "expired") return status === "expired";
          if (currentFilter === "completed") return status === "completed";
          return true;
        });

        if (filteredTasks.length === 0) {
          let message = "Nenhuma tarefa ainda. Adicione uma nova tarefa acima!";
          if (currentFilter === "pending") message = "Nenhuma tarefa pendente!";
          if (currentFilter === "expired") message = "Nenhuma tarefa expirada!";
          if (currentFilter === "completed")
            message = "Nenhuma tarefa completada ainda!";

          taskList.innerHTML = `<div class="empty-state"><p>${message}</p></div>`;
          return;
        }

        taskList.innerHTML = filteredTasks
          .map((task) => {
            const status = getTaskStatus(task);
            let deadlineText = "";

            if (task.deadline) {
              const daysUntil = getDaysUntilDeadline(task.deadline);
              if (status === "expired") {
                deadlineText = `Expirou em ${formatDate(task.deadline)}`;
              } else if (daysUntil === 0) {
                deadlineText = `Vence hoje`;
              } else if (daysUntil === 1) {
                deadlineText = `Vence amanhã`;
              } else if (daysUntil > 0) {
                deadlineText = `Vence em ${daysUntil} dias`;
              }
            }

            return `
                <div class="task-card ${status}">
                    <div class="task-checkbox ${status}" onclick="toggleTask('${
              task.id
            }')">
                        ${
                          task.completed
                            ? `
                            <svg class="icon" fill="none" stroke="white" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                            </svg>
                        `
                            : ""
                        }
                    </div>
                    <div class="task-content">
                        <h3 class="task-title">${task.title}</h3>
                        ${
                          task.description
                            ? `<p class="task-description">${task.description}</p>`
                            : ""
                        }
                        <div class="task-meta">
                            <div class="task-badge points ${status}">
                                <svg class="icon" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                ${task.points} pontos
                            </div>
                            ${
                              task.deadline
                                ? `
                                <div class="task-badge deadline ${
                                  status === "expired" ? "expired" : ""
                                }">
                                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    ${deadlineText}
                                </div>
                            `
                                : ""
                            }
                            ${
                              task.completed && task.completedAt
                                ? `
                                <span class="task-date">
                                    Completada em ${formatDate(
                                      task.completedAt
                                    )}
                                </span>
                            `
                                : ""
                            }
                        </div>
                    </div>
                    <button class="btn-delete" onclick="deleteTask('${
                      task.id
                    }')">
                        <svg class="icon" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            `;
          })
          .join("");
      }

      function updateStats() {
        const completed = tasks.filter((t) => t.completed);
        const expired = tasks.filter((t) => getTaskStatus(t) === "expired");
        const pending = tasks.filter((t) => getTaskStatus(t) === "pending");
        const score = completed.reduce((sum, task) => sum + task.points, 0);

        totalScore.textContent = score;
        completedCount.textContent = completed.length;
        allCount.textContent = tasks.length;
        pendingCount.textContent = pending.length;
        expiredCount.textContent = expired.length;
        completedTabCount.textContent = completed.length;
      }

      function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }