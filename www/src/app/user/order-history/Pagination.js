import { Box, Button } from "@mui/material";

function Pagination() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 2,
        mb: 2,
        borderRadius: "8px", // Đặt border-radius để góc mượt mà
        p: "0 !important",
        gap: 2, // Khoảng cách giữa các nút
      }}
    >
      <Button
        variant="outlined"
        sx={{
          color: "#00A6B7", // Màu của chữ
          borderColor: "#00A6B7", // Màu viền
          borderRadius: "50%", // Góc tròn
          background: "#fff", // Nền trắng
          padding: "8px 16px", // Padding cho nút
          "&:hover": {
            background: "#00A6B7", // Màu nền khi hover
            color: "#fff", // Màu chữ khi hover
          },
        }}
      >
        &lt;
      </Button>

      <Button
        variant="outlined"
        sx={{
          color: "#fff", // Màu chữ
          borderColor: "#00A6B7", // Màu viền
          background: "#00A6B7", // Màu nền
          borderRadius: "50%", // Góc tròn
          padding: "8px 16px", // Padding cho nút
          fontWeight: "bold", // Đậm chữ
          "&:hover": {
            background: "#008D91", // Màu nền khi hover
            borderColor: "#008D91", // Màu viền khi hover
          },
        }}
      >
        1
      </Button>

      <Button
        variant="outlined"
        sx={{
          color: "#00A6B7", // Màu chữ
          borderColor: "#00A6B7", // Màu viền
          borderRadius: "50%", // Góc tròn
          background: "#fff", // Nền trắng
          padding: "8px 16px", // Padding cho nút
          "&:hover": {
            background: "#00A6B7", // Màu nền khi hover
            color: "#fff", // Màu chữ khi hover
          },
        }}
      >
        &gt;
      </Button>
    </Box>
  );
}

export default Pagination;
