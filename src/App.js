import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import TaskList from "./features/tasksList/TaskList";

function App() {
  return (
    <Provider store={store}>
      <TaskList />
    </Provider>
  );
}

export default App;
