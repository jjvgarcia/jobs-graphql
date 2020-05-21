import React from 'react';
import {toast} from 'react-toastify';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {useFormik} from "formik";
import * as Yup from 'yup';
import {useMutation} from '@apollo/react-hooks';
import {SUBSCRIBE} from "../../queries";


const initialValues = {
    name: '',
    email: ''
}

const validations = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    email: Yup.string().email().required('A valid email is required'),
});


const Subscribe = () => {

    const [subscribe] = useMutation(SUBSCRIBE);


    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validations,
        onSubmit: values => {
            const {name, email} = values;

            subscribe({
                variables:
                    {
                        input: {
                            name,
                            email
                        }
                    }
            })
                .then( res => {
                    console.log({res});
                    toast.success('Sucesso!');
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Ops! Algo deu errado!');
                });


            formik.resetForm({});
            formik.setSubmitting(false);
        }
    });

    return (
        <div>
            <Typography variant="h4" component="p" align='center' color='textPrimary'>
                Subscribe to the Newsletter
            </Typography>

            <Grid container justify='center'>
                <Grid item>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container direction='row' alignItems='flex-start' spacing={1}>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    autoFocus
                                    type='text'
                                    margin='dense'
                                    variant='outlined'
                                    id='name'
                                    name='name'
                                    label='Name'
                                    placeholder='Name...'
                                    fullWidth
                                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                                    error={formik.touched.name && !!formik.errors.name}
                                    {...formik.getFieldProps('name')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    type='text' // deixei text para fazer a validação de email pelo Yup
                                    margin='dense'
                                    variant='outlined'
                                    id='email'
                                    name='email'
                                    label='email'
                                    placeholder='email...'
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                                    error={formik.touched.email && !!formik.errors.email}
                                    {...formik.getFieldProps('email')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <Button type='submit'
                                        fullWidth
                                        color='primary'
                                        variant='contained'
                                        disabled={!formik.isValid || formik.isSubmitting}
                                        style={{marginTop: 9}}
                                >Enviar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>

        </div>
    );
};

export default Subscribe;
