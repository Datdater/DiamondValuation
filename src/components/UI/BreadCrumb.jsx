import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CustomSeparator() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length === 0) {
        return null;
    }
    
    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            style={{ marginLeft: '60px',
                    marginTop: '20px'
            }}>
            <Link underline="hover" color="inherit" href="/">
                Home
            </Link>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                    <Typography color="inherit" key={to}>
                        {capitalizeFirstLetter(value)}
                    </Typography>
                ) : (
                    <Link underline="hover" color="inherit" href={to} key={to}>
                        {capitalizeFirstLetter(value)}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
}