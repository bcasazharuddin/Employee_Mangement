import * as yup from "yup";
export const SignupSchema = yup.object({
  mobileNo: yup
    .string()
    .matches(/([6-9]){1}([0-9]){9}$/, "please enter a valid phone number.")
    .max(10)
    .required("Mobile should not be empty!"),
  email: yup
    .string()
    .matches(
      /([a-zA-Z0-9+_.-])(@(gmail|yahoo).com)$/,
      "must be a valid mail( Only gmail or yahoo allowed"
    )
    .required("E-mail should not be empty!"),
  name: yup.string().min(2).max(80).required("Name should not be empty!"),

  pan: yup
    .string()
    .matches(
      /([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
      "Please provide valid Pan number."
    )
    .required("Pan should not be empty!"),
  aadhar: yup
    .string()
    .matches(
      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
      "Please provide valid  Aadhar card number. "
    )
    .max(12)
    .required("Aadhaar should not be empty!"),
});
