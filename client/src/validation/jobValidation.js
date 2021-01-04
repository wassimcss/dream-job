import * as yup from "yup";

export const jobSchema = yup.object().shape({
  job: yup.string().required(),
  company: yup.string().required(),
  description: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Is not in correct format")
    .length(8),
  field: yup.string().min(3),
  address: yup.string().min(3),
  contrat: yup.string().min(1).required(),
  salary: yup.number().required(),
  email: yup.string().email().required(),
});

export const employeeSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string().min(3).required(),
  email: yup.string().min(6).email().required(),
  age: yup.number(),
  profession: yup.string().required(),
  field: yup.string().required(),
  address: yup.string().required(),
  phone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Is not in correct format")
    .length(8),
  college: yup.string().required(),
  highSchool: yup.string().required(),
  traineeship: yup.string().required(),
  experience: yup.string().required(),
});

export const companySchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().min(6).email().required(),
  phone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Is not in correct format")
    .length(8),
  field: yup.string().min(3).required(),
  address: yup.string().min(3).required(),
});
