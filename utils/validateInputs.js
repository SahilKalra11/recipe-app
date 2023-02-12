import * as yup from "yup";

export const recipeSchema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  time: yup
    .string()
    .required("Time is required")
    .min(1)
    .test(
      "no-leading-zero",
      "Leading zero is not allowed",
      (value, context) => {
        return value && !value.startsWith("0");
      }
    ),
  description: yup.string().trim().required("Description is required"),
  categoryId: yup.number().required("Category should be provided"),
  ingredients: yup
    .array()
    .of(yup.number())
    .required("Ingredients should be present"),
});

export const categorySchema = yup.object().shape({
  categoryName: yup.string().required("Category Name is required"),
});

export const ingredientSchema = yup.object().shape({
  ingredientName: yup
    .string()
    .required("Ingredient Name is required is Required"),
});

const validateObjectShapeWithObject = (schema, obj2) => {
  const obj1 = schema.getDefault();
  for (let key in obj1) {
    if (!(key in obj2)) return false;
  }
  return true;
};

const validate = (schema, name, value) => {
  return schema.validateAt(name, { [name]: value }).catch((err) => {
    console.log("name", name, value, err);
    return {
      isError: true,
      errorMessage: err.errors[0],
    };
  });
};

export const validateInputs = async (schema, name, value, pass) => {
  let errorObj = {
    isError: false,
    errorMessage: "",
  };
  switch (name) {
    case "title": {
      errorObj = await validate(schema, name, value);
      break;
    }
    case "description": {
      errorObj = await validate(schema, name, value);
      break;
    }
    case "time": {
      errorObj = await validate(schema, name, value);
      break;
    }
    case "categoryId": {
      errorObj = await validate(schema, name, value);

      break;
    }
    case "ingredients": {
      errorObj = await validate(schema, name, value);

      break;
    }
    case "categoryName": {
      errorObj = await validate(schema, name, value, pass);

      break;
    }
    case "ingredientName": {
      errorObj = await validate(schema, name, value, pass);

      break;
    }
    default: {
      return {
        isError: false,
        errorMessage: "",
      };
    }
  }

  return errorObj;
};

export const validateSchema = async (schema, data) => {
  let errorObj = {
    isError: false,
    errorMessage: "",
  };

  if (!validateObjectShapeWithObject(schema, data)) {
    errorObj = {
      isError: true,
      errorMessage: "data is not aligned with object",
    };
    return errorObj;
  }
  if (schema && data) {
    await schema.validate(data).catch((err) => {
      errorObj = {
        ...errorObj,
        isError: true,
        errorMessage: err.errors,
      };
    });
  }
  return errorObj;
};
