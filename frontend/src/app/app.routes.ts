import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { Login } from '../pages/login/login';
import { MainDashboard } from '../pages/main-dashboard/main-dashboard';

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
