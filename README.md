# 🚀mediaNV Database Management Interface (DMI)

A powerful MERN stack application designed to automate PostgreSQL database management tasks like creating instances, checking existence, and seamless data migration between databases.

## ✨ Features

- **Dynamic Instance Creation:** Create new PostgreSQL databases with a single click.
- **Database Verification:** Instantly check if a specific database exists on the server.
- **Smart Migration:** Migrate data from a source database to a target database using `pg_dump` and `psql` pipes.
- **Real-time Logging:** Activity console to track every success and error during operations.
- **Custom Port Support:** Configured to work seamlessly with custom PostgreSQL ports (e.g., 7777).

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Tools:** pg (node-postgres), Child Process (Exec/Spawn)

## ⚙️ Prerequisites

Before running the project, ensure you have:
- Node.js installed
- PostgreSQL installed and running on Port `7777` (or your configured port)
- `pg_dump` and `psql` added to your System Environment Variables (PATH)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/RAJATKUMARSINGH527/mediaNV-Database_Management_Interface.git
cd mediaNV-Database_Management_Interface
```

**2. Backend Setup**

```Bash
cd BackEnd
npm install
```
**Create a .env file in the BackEnd folder:**
```env
PORT=5000
DATABASE_URL=postgres://postgres:YourPassword@localhost:7777/postgres
```
Note: If your password contains `@`, use `%40`in the DATABASE_URL.

**Start the Backend Server:**
```bash
npm run dev
```
### 3. Frontend Setup

```bash
cd ../frontEnd
npm install
```
**Start the Frontend Server:**
```bash
npm run dev
```
### 4. Access the Application
Open your browser and navigate to `http://localhost:5000` to access the Database Management Interface.

## 📋 API Endpoints

Method          Endpoint                  Description
`POST`         `/api/db/create`       Creates a new database instance
`POST`         `/api/db/check`        Checks if a database exists
`POST`         `/api/db/migrate`      Migrates data between two databases

## 📝 Usage
- **Create Database:** Enter the desired database name and click `"Create Database"`.
- **Check Database Existence:** Input the database name and click `"Check Existence"`.
- **Migrate Database:** Provide source and target database names, then click `"Migrate Database"`.
- **View Logs:** Monitor the activity console for real-time updates on operations.

## 🛡️ Migration Logic

The project uses high-performance system pipes to handle migrations: `pg_dump -U user -h host -p port source_db | psql -U user -h host -p port target_db`

## 📝 Troubleshooting (Local Setup)

- **SSL Error:** The backend is configured to bypass SSL for `localhost` connections.
- **Password Prompt:** We use `PGPASSWORD` environment injection to ensure non-interactive migrations (no manual typing required in terminal).
- **Port 7777:** Ensure your `postgresql.conf` is listening on port 7777 if you modified it during installation.

## 🛡️ Error Handling

The application includes robust error handling to manage issues such as:
- Connection failures
- Invalid database names
- Migration errors
All errors are logged in the activity console for easy troubleshooting.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contact & Support
**Project Lead**: Rajat Kumar Singh
- Email: [rajatkumarsingh257@gmail.com](mailto:rajatkumarsingh257@gmail.com)  
- GitHub: [RAJATKUMARSINGH527](https://github.com/RAJATKUMARSINGH527)  

## 🙏 Acknowledgements

- Thanks to the open-source community for libraries and tools that made this project possible.
- Inspired by the need to streamline financial workflows and reduce manual data entry errors.

---

© 2026 Database Forge. All rights reserved. Built with ❤️ for the Developer Community.