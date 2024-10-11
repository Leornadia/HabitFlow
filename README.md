
```markdown
# Habitflow

Welcome to **Habitflow**, a simple yet powerful Habit Tracker API designed to help you cultivate positive habits and track your progress. With Habitflow, you can easily manage your habits, log your progress, and stay motivated on your journey to self-improvement.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Testing the API](#testing-the-api)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Create Habits**: Easily add new habits to track.
- **Log Progress**: Keep track of your progress and maintain streaks.
- **View All Habits**: Get a complete list of your habits and their statuses.
- **Delete Habits**: Remove habits that no longer serve your goals.

## Technologies
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express**: A web framework for Node.js to build APIs quickly and easily.
- **SQLite**: A lightweight, disk-based database to store your habit data.
- **Nodemon**: Automatically restarts the server when changes are detected.
- **Morgan**: Middleware to log HTTP requests for debugging.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **SQLite3**

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/habitflow.git
   cd habitflow
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm run dev
   ```
   You can access the API at `http://localhost:3000`.

## API Endpoints

Here’s how you can interact with the Habitflow API:

### 1. Create a New Habit
- **Method**: `POST /habits`
- **Request Body**:
  ```json
  {
    "name": "Exercise",
    "description": "Daily workout"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Exercise",
    "description": "Daily workout"
  }
  ```

### 2. Retrieve All Habits
- **Method**: `GET /habits`
- **Response**:
  ```json
  {
    "habits": [
      {
        "id": 1,
        "name": "Exercise",
        "description": "Daily workout",
        "streak": 3,
        "last_logged": "2024-10-10"
      }
    ]
  }
  ```

### 3. Log a Habit
- **Method**: `PUT /habits/:id/log`
- **Response**:
  ```json
  {
    "message": "Habit logged successfully!"
  }
  ```

### 4. Delete a Habit
- **Method**: `DELETE /habits/:id`
- **Response**:
  ```json
  {
    "message": "Habit deleted successfully!"
  }
  ```

## Testing the API
You can use tools like **Postman** or **curl** to test the API. Here are some sample curl commands:

- **Create a Habit**:
  ```bash
  curl -X POST http://localhost:3000/habits -H "Content-Type: application/json" -d '{"name": "Exercise", "description": "Daily workout"}'
  ```

- **Get All Habits**:
  ```bash
  curl http://localhost:3000/habits
  ```

- **Log a Habit**:
  ```bash
  curl -X PUT http://localhost:3000/habits/1/log
  ```

- **Delete a Habit**:
  ```bash
  curl -X DELETE http://localhost:3000/habits/1
  ```

## Future Enhancements
- **User Authentication**: Add user accounts for personalized habit tracking.
- **Frontend Application**: Develop a user-friendly interface for interaction.
- **Notifications**: Implement reminders for habit logging.
- **Analytics Dashboard**: Provide insights on user progress and habits.

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for any feature requests or bug reports.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. 


