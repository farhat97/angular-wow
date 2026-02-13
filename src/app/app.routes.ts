import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { MainDashboard } from '../components/main-dashboard/main-dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'home',
        component: MainDashboard,
        title: 'Home',
        canActivate: [authGuard]
    },

    { 
        path: '**', 
        redirectTo: '/login' 
    }
];
