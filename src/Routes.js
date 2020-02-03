import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  // Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  CapturaList as CapturaListView,
  TutorialList as TutorialListView,
  PracticaList as PracticaListView,
  EstadoCapturaList as EstadoCapturaListView,
  EspeciesList as EspeciesListView,
  GrupoEspeciesList as GrupoEspeciesListView,
  TipoUsuarioList as TipoUsuarioListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  if(localStorage.getItem("login")){

    return (
      <Switch>
        {/* <Redirect
          exact
          from="/"
          to="/dashboard"
        /> */}
        <Redirect
          exact
          from="/"
          to="/capturas"
        />
        {/* <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        /> */}
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path="/users"
        />
        <RouteWithLayout
          component={CapturaListView}
          exact
          layout={MainLayout}
          path="/capturas"
        />
        <RouteWithLayout
          component={TutorialListView}
          exact
          layout={MainLayout}
          path="/tutoriales"
        />
        <RouteWithLayout
          component={PracticaListView}
          exact
          layout={MainLayout}
          path="/practica"
        />
        <RouteWithLayout
          component={EstadoCapturaListView}
          exact
          layout={MainLayout}
          path="/estadoCaptura"
        />
        <RouteWithLayout
          component={GrupoEspeciesListView}
          exact
          layout={MainLayout}
          path="/grupoEspecies"
        />
        <RouteWithLayout
          component={EspeciesListView}
          exact
          layout={MainLayout}
          path="/especies"
        />
        <RouteWithLayout
          component={TipoUsuarioListView}
          exact
          layout={MainLayout}
          path="/tipoUsuario"
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/products"
        />
        <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path="/typography"
        />
        <RouteWithLayout
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path="/account"
        />
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        {/* <Redirect
          exact
          from="/login"
          to="/dashboard"
        /> */}
        <Redirect
          exact
          from="/login"
          to="/capturas"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Redirect
          exact
          from="/"
          to="/login"
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/login"
        />
      <Redirect to="/login" />
    </Switch>
  );
};

export default Routes;
