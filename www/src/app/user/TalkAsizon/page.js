'use client';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';

function Talkasizon() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        'In elementum est a ante sodales iaculis',
        'Etiam lobortis massa eu nibh tempor elementum',
        'In elementum est a ante sodales iaculis',
        'Aenean quis quam nec lacus semper dignissim',
        'Nulla tincidunt eros id tempus accumsan',
    ];

    const answers = [
        'Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu.',
        'Aliquam erat volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Sed porttitor lectus nibh. Nulla porttitor accumsan tincidunt.',
        'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Donec rutrum congue leo eget malesuada.',
        'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.',
        'Donec sollicitudin molestie malesuada. Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.',
    ];

    return (
        <Box p={2}>
            <Grid container={true} spacing={2}>
                {/* Cột bên trái - câu hỏi */}
                <Grid
                    item={true}
                    xs={12}
                    md={6}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100%' }}
                >
                    <Box sx={{ width: '100%', overflowY: 'auto', maxHeight: '100vh' }}>
                        <h1>Welcome, Let&apos;s Talk About Our Asizon</h1>
                        {questions.map((question, index) => (
                            <Box key={index} border={1} borderRadius={1} mb={2} sx={{ width: '100%' }}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    p={2}
                                    onClick={() => handleToggle(index)}
                                    color="#00A6B7"
                                    sx={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                                >
                                    <span>{question}</span>
                                    <AddCircleOutlineIcon sx={{ fontSize: '20px' }} />
                                </Box>
                                {openIndex === index && (
                                    <Box p={2} sx={{ backgroundColor: '#fff', color: '#333' }}>
                                        {/* Hiển thị các câu trả lời dưới dạng các đoạn văn riêng biệt */}
                                        {answers[index].split('. ').map((answer, answerIndex) => (
                                            <p key={answerIndex}>{answer.trim()}.</p>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Grid>

                {/* Cột bên phải - ảnh */}
                <Grid item={true} xs={12} md={6}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ height: '100%' }}>
                        <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                            <img
                                src="/assets/Image (3).png"
                                alt="Ecobazar"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Talkasizon;
