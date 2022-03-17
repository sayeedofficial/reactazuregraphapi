import React from "react";
import { Avatar, Button } from "@mui/material";
import "./Member.css";

function Member({ email, name }) {
  return (
    <div className="mcard">
      <Avatar>{name}</Avatar>
      <p>NO : {email}</p>
      <Button color="error" size="small" variant="contained">
        Delete
      </Button>
    </div>
  );
}

export default Member;
