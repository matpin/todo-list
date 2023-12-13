import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import React, { useState, useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import "./components/globalStyles.css";
import axios from "axios";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [todoArr, setTodoArr] = useState([]);
  const [openDialogNoTasks, setOpenDialogNoTasks] = React.useState(false);
  const handleCloseNoTasks = () => setOpenDialogNoTasks(false);
  const [openDialogDeleteAll, setOpenDialogDeleteAll] = React.useState(false);

  // Color change settings
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // Get all todos function
  function getAllTodos() {
    try {
      axios
        .get("http://localhost:8000/todo")
        .then((res) => setTodoArr(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  // Delete all todos function
  const handleCloseDeleteAll = (deleteTodos) => {
    console.log(deleteTodos);
    if (deleteTodos === true) {
      try {
        todoArr.forEach((t) =>
          axios.delete(`http://localhost:8000/todo/${t.id}`)
        );
      } catch (error) {
        console.log(error);
      }
      setTodoArr([]);
    }
    setOpenDialogDeleteAll(false);
  };

  // Dialogs styles
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Add new todo function
  function addNewTodo(todo, priority) {
    let newTodo = {
      todo: todo,
      completed: false,
      priority: priority,
    };
    try {
      axios
        .post("http://localhost:8000/todo/create", newTodo)
        .then((res) => {
          console.log(res.data);
          let prioritySort = [...todoArr, res.data.newTodo];
          prioritySort.sort((min, max) => min.priority - max.priority);
          setTodoArr(prioritySort);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    // console.log(newTodo);
  }

  // Delete item function
  function deleteTodoItem(id) {
    try {
      axios.delete(`http://localhost:8000/todo/${id}`);
    } catch (error) {
      console.log(error);
    }
    setTodoArr(
      todoArr.filter((deleteItem) => {
        return deleteItem.id !== id;
      })
    );
  }

  // Completed tasks function
  function completedTasks(id, isChecked) {
    try {
      todoArr
        .filter((t) => t.id === id)
        .map((item) => ({
          ...item,
          completed: isChecked,
        }))
        .forEach((t) => axios.put(`http://localhost:8000/todo/${t.id}`, t));
    } catch (error) {
      console.log(error);
    }
    setTodoArr(
      todoArr.map((item) => {
        if (item.id === id) {
          return { ...item, completed: isChecked };
        } else {
          return item;
        }
      })
    );
  }

  // Edit function
  function editTasks(newItem) {
    try {
      axios.put(`http://localhost:8000/todo/${newItem.id}`, newItem);
    } catch (error) {
      console.log(error);
    }
    setTodoArr(
      todoArr.map((item) => {
        if (item.id === newItem.id) {
          return { ...item, ...newItem };
        }
        return item;
      })
    );
  }

  // Handle remove all button function
  function removeAll() {
    if (todoArr.length === 0) {
      setOpenDialogNoTasks(true);
    } else {
      setOpenDialogDeleteAll(true);
    }
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Container className={mode === "light" ? "light mh" : "dark mh"}>
          <div className="appContainer">
            <div className="appInner">
              <AddTodo
                addNewTodo={addNewTodo}
                removeAll={removeAll}
                colorMode={colorMode}
                clMode={mode}
              />
              <TodoList
                todoArr={todoArr}
                deleteTodoItem={deleteTodoItem}
                completedTasks={completedTasks}
                editTasks={editTasks}
                clMode={mode}
              />
            </div>

            <Modal
              sx={{ color: "text.primary" }}
              open={openDialogNoTasks}
              onClose={handleCloseNoTasks}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Warning
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  No tasks to delete!
                </Typography>
              </Box>
            </Modal>

            <Dialog
              sx={{ color: "text.primary" }}
              open={openDialogDeleteAll}
              onClose={handleCloseDeleteAll}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"All tasks will be removed?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Permantly delete.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDeleteAll(false)}>No</Button>
                <Button onClick={() => handleCloseDeleteAll(true)} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
