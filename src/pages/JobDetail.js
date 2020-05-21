import React from 'react';
import {useHistory} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import {Query} from 'react-apollo';
import ReactMarkdown from "react-markdown";

import ContentHeader from "../components/layout/ContentHeader";
import {GET_JOB} from "../queries";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import {makeStyles} from '@material-ui/core/styles';

import HttpIcon from '@material-ui/icons/Http';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(3)
    },
}));

const JobDetails = ({match}) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            <ContentHeader title='Job Details'/>
            <Link
                component="button"
                variant="body2"
                onClick={() => history.push(`/`)}
            >
                Back to list...
            </Link>

            <br/>

            <Query
                query={GET_JOB}
                variables={{
                    input: {
                        jobSlug: match.params.slug,
                        companySlug: match.params.company
                    }
                }}
            >
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    const {job} = data;

                    return (
                        <Zoom in={!loading}>
                            <Grid container spacing={4} style={{marginTop: '.5rem', padding: '1rem'}}>
                                <Grid item>
                                    <Grid container direction='row' alignItems='flex-end'  style={{marginBottom: '1.5rem'}}>
                                        <Grid item>
                                            {job.company.logoUrl &&
                                            <img src={job.company.logoUrl} alt='Logo' width={150}
                                                 style={{marginRight: '1rem'}}/>}
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='subtitle1' component='span' color='textSecondary'>
                                                Company: {job.company.name} &nbsp;
                                            </Typography>
                                            {job.userEmail && <Typography variant='body2' component='p'>
                                                <strong>Email: </strong>{job.userEmail}
                                                <Link href={`mailto:${job.userEmail}`} target='_blank'>
                                                    <EmailIcon/>
                                                </Link>
                                            </Typography>}
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h5" component="h1" color="textPrimary">
                                        {job.title} &nbsp;
                                        <Link href={job.applyUrl} target='_blank'>
                                            <HttpIcon/>
                                        </Link>
                                    </Typography>
                                    <Typography variant='caption' component='span' color='textSecondary'>
                                        <strong>Posted At:</strong> {job.postedAt} &nbsp;&nbsp;
                                        <strong>Commitment:</strong> {job.commitment.title}
                                        <br/>
                                    </Typography>
                                </Grid>


                                <Grid item>
                                    <Paper elevation={4} className={classes.paper}>
                                        <Typography variant='h6' component='h6'>
                                            Description
                                        </Typography>
                                        <Typography variant='body2' component='div'>
                                            <ReactMarkdown
                                                source={job.description}
                                                linkTarget='_blank'
                                            />
                                        </Typography>
                                        <br/>

                                        <Link
                                            component="a"
                                            variant="body2"
                                            href={job.applyUrl}
                                            target='_blank'
                                        >
                                            Apply to this job...
                                        </Link>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Zoom>
                    )
                }}

            </Query>


        </div>
    );
};

export default JobDetails;
