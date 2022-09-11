import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, useToast } from "@chakra-ui/react";
import {
  createCategory,
  fetchCategory,
} from "../../redux-toolkit/slices/categorySlice";
import { useEffect } from "react";

//Form schema
const schema = yup
  .object()
  .shape({
    title: yup.string().required("Title is required"),
  })
  .required();

const AddNewCategory = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = (data) => {
    dispatch(createCategory(data));
    // reset();
    // console.log(data);
  };

  //fetch single category
  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, fetchCategory, id]);

  //get data from store
  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr, isCreated } = state;

  /* display error message*/
  if (appErr || serverErr) {
    toast({
      title: appErr || serverErr,
      status: "error",
      duration: 5000,
    });
  }

  //redirect
  useEffect(() => {
    if (isCreated) {
      navigate("/category-list");
    }
  }, [isCreated, navigate]);

  //redirect
  // if (isCreated) return navigate("/category-list");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {/* Title */}
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                type="text"
                autoComplete="text"
                name="title"
                placeholder="New Category"
                {...register("title")}
              />
              <p className="text-red-600 mb-4 pl-2">{errors.title?.message}</p>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  disabled
                  className="group relative w-full flex justify-center cursor-not-allowed py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
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
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  Add new Category
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
