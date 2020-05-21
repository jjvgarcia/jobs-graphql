import React from 'react';
import Typography from "@material-ui/core/Typography";
import Subscribe from "../Subscribe/Subscribe";

const Footer = () => {
    return (
        <div style={{margin: '1.5rem .5rem 1rem .5rem'}}>
            <Subscribe />
            <Typography variant="caption" component="p" align='center' color='textSecondary' style={{marginTop: '1.5rem'}}>
                &copy; {new Date().getFullYear()} - playing with https://graphql.jobs/
            </Typography>

        </div>
    );
};

export default Footer;
