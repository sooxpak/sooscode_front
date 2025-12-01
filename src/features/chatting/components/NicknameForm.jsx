import React from "react";
import { Button, TextField } from "@mui/material";

function NicknameForm({ nickname, onNicknameChange, onSubmit }){
   return (
    <form onSubmit={onSubmit}>
      <TextField
        label="닉네임"
        fullWidth
        variant="outlined"
        value={nickname}
        onChange={(e) => onNicknameChange(e.target.value)}
        size="medium"
        sx={{ mb: 2 }}
        placeholder="예: user-123, 윤서, guest01"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          py: 1.2,
          mt: 1,
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        입장하기
      </Button>
    </form>
   );
}
export default NicknameForm