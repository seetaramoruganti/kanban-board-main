const itemStyles = {
  card: {
    backgroundColor: "#fff",
    textTransform: "none" as const,
    marginTop: "10px",
    marginBottom: "10px",
    width: "100%",
    color: "rgb(51, 153, 255)",
  },
  header: {
    display: "flex",
    "&>.heading": {
      margin: "0 auto",
    },
  },
  itemId: {
    flex: 1,
    textAlign: "left" as const,
  },
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0px auto",
    marginRight: "5px",
    marginLeft: "5px",
    backgroundColor: "#e6e6e6",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#e6e6e6",
  },
  item: {
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
    width: "100%",
  },
  assigned: {
    fontSize: "1em",
    color: "grey",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    margin: "10px",
    "&.span": {
      marginLeft: 10,
    },
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
  },
  dialogue: {
    minWidth: "500px",
  },
  dialogueSaveBtn: {
    backgroundColor: "#4caf50",
  },
  dialogueDeleteBtn: {
    backgroundColor: "#f44336",
    color: "#fff",
  },
  doneStyles: {
    textDecoration: "line-through",
    alignItems: "flex-start",
    display: "flex",
    margin: "10px",
  },
  dialogField: {
    margin: "15px",
  },
  searchField: {},
};
export default itemStyles;
