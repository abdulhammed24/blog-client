import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "../../redux-toolkit/slices/categorySlice";
import { Spinner, useToast } from "@chakra-ui/react";

//Form schema
const formSchema = yup
  .object()
  .shape({
    title: yup.string().required("Title is required"),
  })
  .required();

const UpdateCategory = () => {
  const { id } = useParams();
  // console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  //fetch single category
  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  //get data from store
  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr, category, isEdited, isDeleted } = state;
  // console.log(category);

  /* display error message*/
  if (appErr || serverErr) {
    toast({
      title: appErr || serverErr,
      status: "error",
      duration: 5000,
    });
  }

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },
    onSubmit: (values) => {
      //build up the date for update

      //dispath the action
      dispatch(updateCategory({ title: values.title, id }));
    },
    validationSchema: formSchema,
  });

  //redirect
  useEffect(() => {
    if (isEdited || isDeleted) {
      navigate("/category-list");
    }
  }, [isDeleted, isEdited, navigate]);

  //redirect
  // if (isEdited || isDeleted) return navigate("/category-list");

  return (
    <>
      {/* {loading ? (
        <>
          {/* loading please wait... */}
      {/* <div className="min-h-[80vh] flex justify-center items-center">
            <Spinner thickness="4px" speed="0.65s" color="blue" size="xl" />
          </div> */}
      {/* </> */}
      {/* ) : (  */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <BookOpenIcon className="mx-auto h-12 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Update Category
            </h2>
            <div className="mt-2 text-center text-sm text-gray-600">
              <p className="font-medium text-indigo-600 hover:text-indigo-500">
                These are the categories user will select when creating a post
              </p>
              {/* Display err */}
              {/* <div>
              {appErr || serverErr ? (
                <h2 className="text-red-500 text-center text-lg">
                  {serverErr} {appErr}
                </h2>
              ) : null}
            </div> */}
            </div>
          </div>
          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                {/* Title */}
                <input
                  value={formik.values.title || ""}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  type="text"
                  autoComplete="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                  placeholder={category?.title}
                />
                <div className="text-red-400 mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
            </div>

            <div>
              <div>
                {/* Submit */}
                {loading ? (
                  <button
                    disabled
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      color="white"
                      size="md"
                    />
                    {/* Loading please wait... */}
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <PlusCircleIcon
                          className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                          aria-hidden="true"
                        />
                      </span>
                      {loading ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          color="white"
                          size="md"
                        />
                      ) : (
                        <div>Update Category</div>
                      )}
                    </button>
                    <button
                      onClick={() => dispatch(deleteCategory(id))}
                      type="submit"
                      className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Delete Category
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default UpdateCategory;
