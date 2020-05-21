import React from 'react';
import Typography from "@material-ui/core/Typography";

const ContentHeader = ({title}) => {
    return (
        <Typography variant="h4" component="h1" color="primary" style={{marginBottom: 8}}>
            {title}
        </Typography>

    );
};

export default ContentHeader;
