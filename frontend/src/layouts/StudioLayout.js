
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import StudioBar from '../components/sideBar/StudioBar';


export const StudioLayout = () => {
    return (
        <div className="container flex  justify-between min-w-full">
        <StudioBar />
        <main className="flex justify-center">
            <Outlet />
        </main>
        <Toaster
            position="top-left"
            autoClose={14}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition="Bounce"
        />
        </div>
    );
}