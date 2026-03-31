# Real-Time Collaborative Coding Platform

A scalable real-time coding platform that enables multiple users to join shared rooms, collaborate on code simultaneously, and execute programs securely with controlled concurrency and live output synchronization.

---

## Highlights

* Real-time collaboration using WebSockets (Socket.IO)
* Room-based multi-user architecture
* Secure and isolated code execution using child processes
* FIFO queue system for managing concurrent execution requests
* Per-user execution limits to ensure fair resource usage
* Live output broadcasting to all participants
* Modular backend architecture designed for scalability

---

## Features

* Live code editing and synchronization across multiple users
* Multi-user collaboration via unique room IDs
* Real-time code execution with shared output
* Execution sandboxing with timeouts and safeguards
* Queue-based concurrency control (FIFO)
* Fair usage policy with per-user execution limits
* Real-time execution status updates
* Clean and modular backend structure

---

## Architecture Overview


Client (Frontend)
        ↓
   WebSocket Layer (Socket.IO)
        ↓
   Room Manager (Session Handling)
        ↓
   Execution Queue (FIFO)
        ↓
   Worker Process (Child Process)
        ↓
   Output Broadcast to Clients

---

## How It Works

1. Users join a shared room using a unique room ID
2. Code changes are instantly synchronized across all connected clients via WebSockets
3. When a user executes code:

   * The request is added to a FIFO execution queue
   * The system ensures controlled concurrency and fair scheduling
4. Code is executed in an isolated child process
5. Execution output is captured and broadcast to all users in the room
6. Timeouts and safeguards prevent infinite loops and misuse

---

## Key Design Decisions

* **FIFO Queue System**
  Ensures fair and ordered execution of requests while preventing server overload

* **Child Process Execution**
  Provides isolation from the main server, improving stability and security

* **Execution Constraints**
  Timeouts and limits prevent infinite loops and resource abuse

* **Room-Based Architecture**
  Enables scalable and independent multi-user collaboration sessions

* **Concurrency Control**
  Restricts simultaneous executions per user to maintain system fairness

---

## Tech Stack

* Backend: Node.js, Express.js
* Real-Time Communication: Socket.IO
* Execution Engine: Node.js Child Processes
* Architecture: Modular MVC-inspired structure
* (Optional Upgrade): MongoDB for persistence

---

## Installation

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install


---

## Running the Project


npm run dev

---

## Environment Variables

Create a `.env` file in the root directory:

PORT=5000

(Add database or JWT variables if extended)

---

## Demo / Screenshots

### 1. Real-Time Code Synchronization
Demonstrates multiple users editing code simultaneously with instant updates across all connected clients.
<img width="1696" height="613" alt="image" src="https://github.com/user-attachments/assets/25ed6ba3-28a2-404c-bba4-79a717bb6f3c" />

### 2. Execution Timeout Handling
Shows how the system safely terminates long-running or infinite loops using execution time limits.
<img width="1728" height="669" alt="image" src="https://github.com/user-attachments/assets/201f5d30-5bad-40ee-878b-1f222a42f8ec" />

### 3. Runtime Error Handling
Illustrates how runtime errors are captured and broadcast to all users in the session.
<img width="1634" height="705" alt="image" src="https://github.com/user-attachments/assets/991ee489-fbc9-4f0e-8288-ee9e837ec729" />


---

## Future Improvements

* JWT-based authentication and user accounts
* Persistent storage for code and sessions (MongoDB)
* Syntax highlighting and improved editor UI
* Docker containerization
* Horizontal scaling using Redis (for distributed systems)

---

## Learnings & Takeaways

* Designed a real-time system using WebSockets for low-latency communication
* Implemented concurrency control using queue-based scheduling
* Built a secure execution pipeline with process isolation
* Gained hands-on experience with system design concepts like scalability and resource management

---

## Author

Your Name
GitHub: https://github.com/your-username
LinkedIn: https://linkedin.com/in/your-profile

---

## Support

If you found this project useful, consider giving it a star on GitHub.

