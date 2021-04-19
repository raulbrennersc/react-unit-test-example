import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../utils/test-utils";
import TaskList from "./TaskList";
import * as service from "../../services/TasksService";

jest.mock("../../services/TasksService");

beforeEach(() => {
  service.getTasks.mockResolvedValue([
    { title: "task 1", checked: false },
    { title: "task 2", checked: false },
  ]);
});

test("initial state", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  expect(input.value).toEqual("");
  const tasks = screen.queryAllByTestId("task-div");
  expect(tasks.length).toEqual(0);
});

test("can type", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  expect(input.value).toEqual("abcd");
});

test("add task disabled", () => {
  render(<TaskList />);
  const addBtn = screen.getByTestId("add-button");
  expect(addBtn.disabled).toBeTruthy();
});

test("add task enabled", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  const addBtn = screen.getByTestId("add-button");
  expect(addBtn.disabled).toBeFalsy();
});

test("cant add an empty task", () => {
  render(<TaskList />);
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);
  const tasks = screen.queryAllByTestId("task-div");
  expect(tasks.length).toEqual(0);
});

test("can add a task", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);
  const [checkbox, text] = screen.getByTestId("task-div").childNodes;
  expect(text.textContent).toEqual("abcd");
  expect(checkbox.checked).toBeFalsy();
  expect(input.value).toEqual("");
});

test("cant add a duplicate task", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);

  userEvent.type(input, "abcd");
  userEvent.click(addBtn);

  const tasks = screen.getAllByTestId("task-div");
  expect(tasks.length).toEqual(1);
  const inputError = screen.getByTestId("input-error");
  expect(inputError.textContent).toEqual(
    "Já existe uma tarefa com esta descrição"
  );
  expect(input.value).toEqual("abcd");
});

test("can add multiple tasks", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "task 1");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);

  userEvent.type(input, "task 2");
  userEvent.click(addBtn);

  const tasks = screen.getAllByTestId("task-div");
  expect(tasks.length).toEqual(2);
});

test("can clear all tasks", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "task 1");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);

  userEvent.type(input, "task 2");
  userEvent.click(addBtn);

  const clearBtn = screen.getByTestId("clear-button");
  userEvent.click(clearBtn);

  const tasks = screen.queryAllByTestId("task-div");
  expect(tasks.length).toEqual(0);
});

test("can load tasks", async () => {
  render(<TaskList />);
  // jest.spyOn(service, "getTasks").mockResolvedValue([
  //   { title: "task 1", checked: false },
  //   { title: "task 2", checked: false },
  // ]);
  const loadBtn = screen.getByTestId("load-button");
  userEvent.click(loadBtn);
  const tasks = await screen.findAllByTestId("task-div");
  expect(tasks.length).toEqual(2);
});

test("can check a task", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);
  const [checkbox] = screen.getByTestId("task-div").childNodes;
  userEvent.click(checkbox);
  expect(checkbox.checked).toBeTruthy();
});

test("can uncheck a task", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);
  const [checkbox] = screen.getByTestId("task-div").childNodes;
  userEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(checkbox.checked).toBeFalsy();
});

test("can remove a task", () => {
  render(<TaskList />);
  const input = screen.getByTestId("task-input");
  userEvent.type(input, "abcd");
  const addBtn = screen.getByTestId("add-button");
  userEvent.click(addBtn);
  const [, , removeBtn] = screen.getByTestId("task-div").childNodes;
  userEvent.click(removeBtn);
  const tasks = screen.queryAllByTestId("task-div");
  expect(tasks.length).toEqual(0);
});
