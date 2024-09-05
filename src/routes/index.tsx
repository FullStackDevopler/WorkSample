import ROUTES from "constants/routes";
import {
  BrowserRouter,
  Navigate,
  Routes as ReactRoutes,
  Route,
} from "react-router-dom";
import PrivateRoute from "./private";
import PublicRoute from "./public";
import AdminLayout from "layout/adminLayout";
import { useSelector } from "react-redux";
import { RootState } from "redux/store/store";
import Loader from "components/loader";

const Routes = () => {
  const { loader } = useSelector((state: RootState) => state.loaderSlice);
  const { token }: any = useSelector((state: RootState) => state?.authSlice);

  return (
    <>
      {loader && <Loader />}
      <BrowserRouter>
        <ReactRoutes>
          {ROUTES?.map(({ component: component, path, restricted }, index) => {
            return (
              <Route
                key={index}
                path={path}
                element={
                  restricted ? (
                    token ? (
                      <AdminLayout>
                        <PrivateRoute component={component} />
                      </AdminLayout>
                    ) : (
                      <Navigate to="/login" />
                    )
                  ) : !token ? (
                    <PublicRoute restricted={false} component={component} />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
            );
          })}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </ReactRoutes>
      </BrowserRouter>
    </>
  );
};

export default Routes;
