'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'var(--font-roboto)',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: "transform ease-in-out 0.2s"
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h6:
                {
                    fontSize: "1.1rem",
                    lineHeight: "1"
                }                
            }
        }
    }
});

export default theme;
