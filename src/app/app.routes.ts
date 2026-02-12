import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { MainDashboard } from '../components/main-dashboard/main-dashboard';

export const routes: Routes = [

    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'main',
        component: MainDashboard,
        title: 'Home'
    }

];
