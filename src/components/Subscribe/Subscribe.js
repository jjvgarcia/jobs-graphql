import React from 'react';
import {Mutation} from 'react-apollo';
import {toast} from 'react-toastify';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {SUBSCRIBE} from "../../queries";

import * as Yup from "yup";
import {Formik, Form} from "formik";

const initialValues = {
    name: '',
    email: ''
}

const validations = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    email: Yup.string().required('A valid email is required'),
});

const Subscribe = () => {
    return (
        <div>
            <Typography variant="h4" component="p" align='center' color='textPrimary'>
                Subscribe to the Newsletter
            </Typography>
            <Mutation mutation={SUBSCRIBE}>
                {(subscribe, {loading}) => {
                    return (
                        <Grid container justify='center'>
                            <Grid item>
                                <Formik
                                    initialValues={initialValues}
                                    enableReinitialize={true}
                                    validateOnChange={true}
                                    validateSchema={validations}
                                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                                        const {name, email} = values;
                                        subscribe({
                                            variables: {
                                                input: {
                                                    name,
                                                    email
                                                }
                                            }
                                        })
                                            .then(res => {
                                                toast.success('Success registering to newsletter');
                                                console.log(res);
                                                resetForm({});
                                            })
                                            .catch(e => console.log(e));

                                        setSubmitting(false);
                                    }}
                                >
                                    {({
                                          errors,
                                          touched,
                                          isValid,
                                          isSubmitting,
                                          handleSubmit,
                                          getFieldProps,
                                      }) => (
                                        <Form>
                                            <Grid container direction='row' alignItems='center' spacing={1}>
                                                <Grid item xs={12} sm={5}>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        type='text'
                                                        margin='dense'
                                                        id='name'
                                                        name='name'
                                                        label='Name'
                                                        helperText={touched.name && errors.name ? errors.name : null}
                                                        error={touched.name && !!errors.name}
                                                        {...getFieldProps('name')}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={5}>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        type='text'
                                                        margin='dense'
                                                        id='email'
                                                        name='email'
                                                        label='Email'
                                                        helperText={touched.email && errors.email ? errors.email : null}
                                                        error={touched.email && !!errors.email}
                                                        {...getFieldProps('email')}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={2}>
                                                    <Button type='submit'
                                                            fullWidth
                                                            onSubmit={handleSubmit}
                                                            color='primary'
                                                            variant='contained'
                                                            disabled={loading || !isValid || isSubmitting}
                                                    >Enviar</Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>
                        </Grid>
                    )
                }}
            </Mutation>
        </div>
    );
};

export default Subscribe;
