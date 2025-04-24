QuickNotes - Full Stack App (React + Express + PostgreSQL)

QuickNotes es una aplicación web full stack desarrollada como prueba técnica para una posición de desarrollador junior Full Stack.
Permite a los usuarios registrarse, iniciar sesión, crear notas rápidas categorizadas y visualizarlas de forma segura.

Tecnologías utilizadas

Frontend: React + TypeScript + Vite

API: fetch + REST

Backend: Node.js + Express + TypeScript

ORM:Prisma

Base de datos: PostgreSQL


Configuracion Local: 
git clone git@github.com:TU_USUARIO/quicknotes.git
cd quicknotes

Configuracion Backend:
cd backend
cp .env.example .env
# Rellena DATABASE_URL y JWT_SECRET
npx prisma migrate dev --name init
npm install
npm run dev

Configuracion Frontend:

cd frontend/quicknotes-frontend
cp .env.example .env
# Rellena VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
