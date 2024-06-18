import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const passwordRegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

interface RegistrationForm {
    email: string
    password: string
    confirmPassword: string
    phoneNumber: string
}
export const Forms = () => {
    const SignUpSchema: Yup.ObjectSchema<RegistrationForm> = Yup.object().shape(
        {
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string()
                .required('Please Enter your password')
                .matches(
                    passwordRegExp,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
                ),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required(),
            phoneNumber: Yup.string()
                .required()
                .matches(phoneRegExp, 'Phone number is not valid'),
        }
    )
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    phoneNumber: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        console.log(JSON.stringify(values, null, 3))
                        actions.setSubmitting(false)
                    }, 3000)
                }}>
                <Form></Form>
            </Formik>
        </>
    )
}
