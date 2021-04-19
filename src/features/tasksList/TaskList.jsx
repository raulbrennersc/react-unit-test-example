import React, { useState } from "react";
import { connect } from "react-redux";
import { getTasks } from "../../services/TasksService";

const TaskList = ({
  tasks,
  addTask,
  removeTask,
  loadTasks,
  checkTask,
  clearTasks,
}) => {
  const [newTask, setNewTask] = useState("");
  const [inputError, setInputError] = useState("");

  const handleInput = (event) => {
    setNewTask(event.target.value);
    setInputError("");
  };

  const handleAddTask = () => {
    if (tasks.find((t) => t.title === newTask)) {
      setInputError("Já existe uma tarefa com esta descrição");
    } else {
      addTask(newTask);
      setNewTask("");
    }
  };

  const handleLoadTasks = async () => {
    getTasks().then(loadTasks);
  };

  return (
    <div id="content">
      <div id="input-div">
        <input
          data-testid="task-input"
          value={newTask}
          onChange={handleInput}
        />
        <button
          data-testid="add-button"
          id="add-button"
          type="button"
          onClick={handleAddTask}
          disabled={!newTask}
        >
          Adicionar
        </button>
      </div>
      <div data-testid="input-error">{inputError}</div>
      <div id="task-list">
        {tasks.map((task) => (
          <div data-testid="task-div" key={task.title} className="task-div">
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => checkTask(task)}
            />
            {task.title}
            <button
              className="remove-button"
              type="button"
              onClick={() => removeTask(task)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <button
        data-testid="load-button"
        id="load-button"
        type="button"
        onClick={handleLoadTasks}
      >
        Carregar
      </button>
      <button
        data-testid="clear-button"
        id="clear-button"
        type="button"
        onClick={clearTasks}
      >
        Limpar
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (payload) => dispatch({ type: "ADD", payload }),
  removeTask: (payload) => dispatch({ type: "REMOVE", payload }),
  loadTasks: (payload) => dispatch({ type: "LOAD", payload }),
  checkTask: (payload) => dispatch({ type: "CHECK", payload }),
  clearTasks: () => dispatch({ type: "CLEAR" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
