# CodeReview Hub

> **The definitive collaborative platform where Stack Overflow meets GitHub PRs.**  
> Post your code, receive expert line-by-line reviews, and build your reputation as a Digital Architect.

---

## Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-Object_Storage-C72E49?style=for-the-badge&logo=minio&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2025-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## What is CodeReview Hub?

**CodeReview Hub** is a full-stack web application that lets developers post their code snippets and receive structured, expert peer reviews — think of it as GitHub Pull Requests combined with Stack Overflow, but focused entirely on collaborative code quality improvement.

### Key Features

| Feature                    | Description                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| 📝 **Post Code**           | Share code snippets directly or upload a file. Tag with languages and topics.                        |
| 💬 **Inline Comments**     | GitHub-style line-by-line commenting with drag-to-select line ranges.                                |
| ⭐ **Peer Reviews**        | Full review system with markdown support — post, edit, delete, and accept reviews.                   |
| 🏆 **Reputation System**   | Earn points when your reviews are accepted. Rise through architect levels.                           |
| 🔍 **Browse & Filter**     | Infinite scroll post feed filterable by language, status (Open / Accepted / Closed), and sort order. |
| 🎨 **Syntax Highlighting** | Beautiful code highlighting powered by Shiki with the Houston theme.                                 |
| 🖊️ **Monaco Editor**       | VS Code's editor embedded for writing and editing code posts.                                        |
| 🔐 **Authentication**      | Email/password auth with Google OAuth, password reset via email, and JWT sessions via NextAuth.      |
| 🖼️ **Profile**             | User dashboard with reputation score, level rank, review history, and comment history.               |
| 🗃️ **File Storage**        | Large code files and profile images stored in MinIO (S3-compatible object storage).                  |
| 📄 **Legal Pages**         | Markdown-driven Terms & Privacy pages with SEO metadata.                                             |
| 🗺️ **SEO**                 | Auto-generated sitemap, robots.txt, Open Graph images, and Twitter cards per post.                   |

---

## Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) `v20+`
- [Yarn](https://yarnpkg.com/) (package manager)
- [Docker](https://www.docker.com/) **or** [Podman](https://podman.io/) (for running services)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PrathameshDhande22/CodeReviewHub.git
cd CodeReviewHub/my-app
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and update the following:

```env
# PostgreSQL — matches the docker-compose defaults
DATABASE_URL="postgresql://postgres:admin1234@localhost:5432/codereview?schema=public"

# NextAuth secret — generate with: openssl rand -base64 32
BETTER_AUTH_SECRET=your_random_secret_here

# Google OAuth (from Google Cloud Console)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# MinIO (S3-compatible object storage)
MINIO_ACCESS_KEY=your_minio_access_key
MINIO_SECRET_KEY=your_minio_secret_key
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
```

### 4. Start Backend Services (Docker Compose)

The project uses Docker Compose to run **PostgreSQL**, **pgAdmin**, and **MinIO** locally.

> See the [Running with Docker Compose](#-running-with-docker-compose) section below for details.

### 5. Set Up the Database

Generate the Prisma client and run migrations:

```bash
# Generate Prisma client types
yarn db:generate

# Apply database migrations
yarn db:migrate
```

### 6. Run the Development Server

```bash
yarn dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## 🐳 Running with Docker Compose

The `start-dockercompose.yaml` file spins up all the required backend infrastructure services.

### Services Included

| Service           | Container Name      | Port            | Description                                          |
| ----------------- | ------------------- | --------------- | ---------------------------------------------------- |
| **PostgreSQL 18** | `postgressql`       | `5432`          | Primary application database                         |
| **pgAdmin 4**     | `pgadmin`           | `8081`          | Web-based PostgreSQL GUI                             |
| **MinIO**         | `minio-blobstorage` | `9000` / `9001` | S3-compatible object storage for code files & images |

### Start with Docker

```bash
docker compose -f start-dockercompose.yaml up -d
```

### Start with Podman

```bash
# Option 1 — Using the built-in npm script
yarn podman

# Option 2 — Manual
podman machine start
podman compose -f start-dockercompose.yaml up -d
```

### Stop the Services

```bash
docker compose -f start-dockercompose.yaml down

# To also remove volumes (⚠️ deletes all data):
docker compose -f start-dockercompose.yaml down -v
```

### Accessing the Services

| Service           | URL                                            | Credentials                                     |
| ----------------- | ---------------------------------------------- | ----------------------------------------------- |
| **pgAdmin**       | [http://localhost:8081](http://localhost:8081) | Email: `test@prathamesh.com` / Password: `test` |
| **MinIO Console** | [http://localhost:9001](http://localhost:9001) | Configure via MinIO license & access keys       |
| **PostgreSQL**    | `localhost:5432`                               | User: `postgres` / Password: `admin1234`        |

> **MinIO Note:** MinIO uses a license file located at `./minio/minio.license`. You need a valid MinIO AIStor license for the configured image. For development without a license, you can swap the image to `minio/minio:latest` and update the command to `minio server /mnt/data --console-address ":9001"`.

---

## Production Build

### Build the Application

```bash
yarn build
```

### Start the Production Server

```bash
yarn start
```

---

## Screenshots

1. **Home Page**
   ![Home Page](./images/s1.png)

2. **Login Page**
   ![Login page](./images/s2.png)

3. **Register Page**
   ![Register Page](./images/s3.png)

4. **Browse Post Page**
   ![Browse Post Page](./images/s4.png)

5. **View Post Page**
   ![view Post Page](./images/s5.png)

6. **Review on Post Page**
   ![Review on Post page](./images/s6.png)

7. **Profile Page**
   ![Profile Page](./images/s7.png)

8. **Update Profile**
   ![Update Profile](./images/s8.png)

9. **New Post Page**
   ![New Post Page](./images/s9.png)

---

## License

This project is licensed under the terms in the [LICENSE](LICENSE) file.

---

<p align="center">Built with ❤️ by <a href="https://github.com/PrathameshDhande22">Prathamesh Dhande</a></p>
