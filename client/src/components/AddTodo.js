import React, { useState, useRef } from "react";
import "./AddTodo.css";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeleteIcon from '@mui/icons-material/Delete';
import "./globalStyles.css";

function AddTodo({ addNewTodo, removeAll, colorMode, clMode }) {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("");
  const ref = useRef(null);
  const [openPriorityDialog, setOpenPriorityDialog] = React.useState(false);
  const handleClosePriorityDialog = () => setOpenPriorityDialog(false);
  const [openEmptyInputDialog, setOpenEmptyInputDialog] = React.useState(false);
  const handleCloseEmptyInputDialog = () => setOpenEmptyInputDialog(false);

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

  // Submit task with click function
  function handleClick() {
    if (!priority) {
      setOpenPriorityDialog(true);
      return;
    }
    if (todo === "") {
      setOpenEmptyInputDialog(true);
      return;
    }
    addNewTodo(todo, priority);
    setTodo("");
    ref.current.focus();
  }

  // Select priority function
  function selectPriority(e) {
    // console.log(e.target.value);
    setPriority(e.target.value);
  }

  // Remove all function
  function handleRemove() {
    removeAll()
  }

  // Submit task with enter function
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (!priority) {
        setOpenPriorityDialog(true);
        return;
      }
      if (todo === "") {
        setOpenEmptyInputDialog(true);
        return;
      }
      addNewTodo(todo, priority);
      setTodo("");
      ref.current.focus();
    }
  }

  return (
    <div className="addContainer">
      <div className="titleContainer">
        <IconButton onClick={colorMode.toggleColorMode}><DarkModeIcon/></IconButton>
        <h1>Todo List</h1>
        <IconButton onClick={handleRemove}><DeleteIcon/></IconButton>
      </div>
      <div className="addSecond">
        <select
          className="selectOptions"
          defaultValue={"DEFAULT"}
          onChange={(e) => selectPriority(e)}
        >
          <option value="DEFAULT" disabled>
            Priority
          </option>
          <option value={0} className="mostImportant">
            High
          </option>
          <option value={1} className="important">
            Medium
          </option>
          <option value={2} className="notImportant">
            Low
          </option>
        </select>
        <input
          className={clMode === "light" ? "light inputStyles" : "dark inputStyles"}
          ref={ref}
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          value={todo}
          spellCheck={false}
        />
        <IconButton
          style={{ color: "#900C3F", padding: 0 }}
          onClick={handleClick}
        >
          <AddCircleRoundedIcon sx={{ fontSize: "1.8em" }} />
        </IconButton>
        <Modal
          sx={{color: 'text.primary'}}
          open={openPriorityDialog}
          onClose={handleClosePriorityDialog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Warning
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please select a priority!
            </Typography>
          </Box>
        </Modal>

        <Modal
          sx={{color: 'text.primary'}}
          open={openEmptyInputDialog}
          onClose={handleCloseEmptyInputDialog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Warning
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please write something!
            </Typography>
          </Box>
        </Modal>
      </div> 
    </div>
  );
}

export default AddTodo;
