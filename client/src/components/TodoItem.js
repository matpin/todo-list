import React, { useState, useRef, useEffect } from "react";
import "./TodoItem.css";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { IconButton } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "./globalStyles.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

function TodoItem({ item, deleteTodoItem, completedTasks, editTasks, clMode }) {
  const [disabledEditInput, setDisabledEditInput] = useState(true);
  const [checkButtonDisabled, setCheckButtonDisabled] = useState(false);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [openDialogDeleteItem, setOpenDialogDeleteItem] = React.useState(false);
  const [openEmptyEditInputDialog, setOpenEmptyEditInputDialog] = useState(false);
  const handleCloseEmptyEditInputDialog = () => setOpenEmptyEditInputDialog(false);
  const ref = useRef(null);
  let tempEditValue = item.todo;

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

  useEffect(() => {
    setEditButtonDisabled(item.completed);
    if (!disabledEditInput) {
      ref.current.focus();
    }
  }, [disabledEditInput, item.completed]);

  // Delete item dialog functions
  const handleClickOpenDeleteItem = () => {
    setOpenDialogDeleteItem(true);
  };

  const handleCloseDeleteItem = (deleteItem) => {
    if (deleteItem === true) {
      handleDelete(item.id);
    }
    setOpenDialogDeleteItem(false);
  };

  // Delete function
  function handleDelete(itemId) {
    deleteTodoItem(itemId);
  }

  // Checkbox function
  function handleCheckbox(itemId, e) {
    completedTasks(itemId, e.target.checked);
    setEditButtonDisabled(!editButtonDisabled);
  }

  // Edit function
  function handleEdit(e, item) {
    item.todo = e.target.value;
    tempEditValue = item.todo;
    editTasks(item);
  }

  // Edit button function
  function handleEditButton(item) {
    setDisabledEditInput(!disabledEditInput);
    setCheckButtonDisabled(!checkButtonDisabled);
    console.log(tempEditValue);
    if (checkButtonDisabled) {
      if (tempEditValue === "") {
        setOpenEmptyEditInputDialog(true);
      }
    }
  }

  // Submit with enter edit function
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      console.log("validate");
      handleEditButton(item);
    }
  }

  return (
    <div
      id="itemsStyle"
      className={
        item.priority === "0"
          ? "mostImportantBox"
          : item.priority === "1"
          ? "importantBox"
          : item.priority === "2"
          ? "notImportantBox"
          : ""
      }
    >
      <Checkbox
        className="checkboxStyles"
        onChange={(e) => handleCheckbox(item.id, e)}
        disabled={checkButtonDisabled}
        checked={item.completed}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      />
      <input
        ref={ref}
        type="text"
        value={item.todo}
        className={
          item.completed === true
            ? "completed-" + clMode
            : "editInput-" + clMode
        }
        onChange={(e) => handleEdit(e, item)}
        onKeyDown={handleKeyDown}
        disabled={disabledEditInput}
        spellCheck={false}
      />
      {disabledEditInput ? (
        <IconButton
          onClick={() => handleEditButton(item)}
          disabled={editButtonDisabled}
        >
          <EditRoundedIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleEditButton(item)}>
          <CheckRoundedIcon />
        </IconButton>
      )}
      <IconButton
        onClick={() => {
          handleClickOpenDeleteItem();
        }}
      >
        <DeleteRoundedIcon />
      </IconButton>

      <Dialog
        open={openDialogDeleteItem}
        onClose={handleCloseDeleteItem}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Task will be removed"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Permantly delete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDeleteItem(false)}>Cancel</Button>
          <Button onClick={() => handleCloseDeleteItem(true)} autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        sx={{ color: "text.primary" }}
        open={openEmptyEditInputDialog}
        onClose={handleCloseEmptyEditInputDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Warning
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Empty task!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TodoItem;
