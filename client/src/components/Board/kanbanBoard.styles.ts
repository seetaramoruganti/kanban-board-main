const classes = {
  header: {
    display: "flex",
    "&>.heading": {
      margin: "0 auto",
    },
    padding: "20px",
    margin: "0px auto",
    width: "90vw",
  },
  itemId: {
    flex: 1,
    textAlign: "left",
  },
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    overflow: "auto",
    minHeight: "80vh",
    maxHeight: "80vh",
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "100%",
    margin: "0px auto",
    marginRight: "5px",
    marginLeft: "5px",
    backgroundColor: "#e6e6e6",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    overflow: "auto",
  },
  columnHead: {
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
};
export default classes;
