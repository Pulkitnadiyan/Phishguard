# PhishGuard Deployment Guide

This guide describes how to deploy the PhishGuard application with a Neon Database, a Render backend, and a Vercel frontend.

## 1. Setup Neon Database (Serverless PostgreSQL)
1. Go to [neon.tech](https://neon.tech/) and create a free project.
2. Under your dashboard, navigate to **Connection Details**.
3. Select the **JDBC** format.
4. Copy the connection string. It will look like this:
   `jdbc:postgresql://ep-example-word-123456.us-east-2.aws.neon.tech/neondb?user=postgres&password=YourPassword&sslmode=require`

*(Keep this connection string handy, you'll need it for Render)*

## 2. Deploy Backend to Render
1. Go to [render.com](https://render.com/) and click **New+** -> **Web Service**.
2. Select **Build and deploy from a Git repository**.
3. Connect your GitHub account and select your `PhishGuard` repository.
4. In the setup page, fill in the following details:
   - **Name**: `phishguard-backend` (or whatever you prefer)
   - **Root Directory**: `backend` *(⚠️ VERY IMPORTANT, DO NOT MISS THIS)*
   - **Environment**: Select `Docker`
   - **Region**: Anywhere (closer to your Neon DB region is slightly faster)
5. Scroll down to **Advanced** and add the following **Environment Variables**:
   - Key: `SPRING_DATASOURCE_URL`
   - Value: `[PASTE_THE_NEON_JDBC_STRING_HERE]` (including user and password inside the string)
   - *(Optional)* If your JDBC string lacks `?user=` or `&password=`, you can add `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` manually.
6. Click **Create Web Service**. 
7. Wait ~2-3 minutes for the build to pass.
8. Once live, copy your backend URL at the top left. (e.g. `https://phishguard-backend-xxxx.onrender.com`)

## 3. Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com/) and click **Add New** -> **Project**.
2. Import the `PhishGuard` repository.
3. In the configuration page, match these settings:
   - **Framework Preset**: `Vite` (Vercel should automatically detect this!)
   - **Root Directory**: `frontend` *(⚠️ VERY IMPORTANT, DO NOT MISS THIS)*
4. Open the **Environment Variables** tab and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://phishguard-backend-xxxx.onrender.com/api` *(Your Render URL + `/api` on the end!)*
5. Click **Deploy**. Vercel will build and serve your app.

## Done!
You've officially deployed the full-stack PhishGuard application. 🚀
