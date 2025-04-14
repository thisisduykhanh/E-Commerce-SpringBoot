import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

function ConfirmationDialog({ open, onClose, onConfirm, title, message }) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            PaperProps={{
                style: {
                    backgroundColor: '#f4f4f4', 
                    borderRadius: '8px',
                },
            }}
        >
            <DialogTitle sx={{ backgroundColor: '#4DA7B7', color: 'white', padding: '16px 24px' }}>
                {title || 'Xác nhận'}
            </DialogTitle>
            <DialogContent sx={{ padding: '16px 24px', color: '#000' }}>
                <Typography>{message || 'Bạn có chắc chắn muốn thực hiện hành động này?'}</Typography>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#f4f4f4', padding: '8px 24px',color: '#000' }}>
                <Button 
                    onClick={onClose} 
                    variant="outlined" 
                    sx={{ 
                        borderRadius: '4px', 
                        textTransform: 'none', 
                        padding: '6px 16px',
                        boxShadow:'none',
                        border:'1px solid #4DA7B7',
                        color: '#000'
                    }}
                >
                    Hủy
                </Button>
                <Button 
                    onClick={onConfirm} 
                    variant="contained" 
                    sx={{ 
                        borderRadius: '4px', 
                        textTransform: 'none', 
                        padding: '6px 16px', 
                        background: '#4DA7B7', 
                        boxShadow:'none',
                    }}
                >
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
