# Team Values

- Communication is the key to teamwork.
- Follow the plan and finish your work on time.
- When encountering difficulties, do not hesitate to reach out for help.
- In case of disagreement, we meet to conceive and vote for the best solution.
- When a teammate fails to deliver his/her obligations, we provide help and discuss together on what to do with the task.
- On weekdays, team members are expected to respond to messages directed at them within 30 minutes, one hour on weekends.

# Sprint Cadence

- Sprint 0: 09/28 - 10/10
- Sprint 1: 10/12 - 10/26
- Sprint 2: 10/31 - 11/09
- Sprint 3: 11/14 - 11/23
- Sprint 4: 11/28 - 12/05

# Daily Standups

- Daily Standups are on Monday, Wednesday, and Friday at 5:00PM in Bobst Library
- Attendance is required. Absence should be notified 24 hours in advance.
- Each teammate is granted 1 grace per sprint and 1 grace per semester for emergencies. The per sprint grace should be notified 2 days in advance.

# Coding Standards

- VS Code
- Always pull before starting to work 
- Always push your code on your branch
- Make sure the commit messages are clear and descriptive
- Comment your code accordingly
- Write self-documenting code. Use descriptive variable and function names. Avoid unnecessary name shortening.
- Don't leave dead/commented out code behind. If you see such code, delete it.

# Concluding Thoughts

When we embarked on our educational journeys in the US, we encountered difficulties in establishing our new lives due to the absence of a seamless platform to facilitate our initial setup. Driven by our experiences and understanding of this unique challenge, we have collaborated to develop a solution tailored for college students navigating similar pathways. Our app endeavors to make buying and selling second-hand goods not only convenient but also a delight, through its thoughtful features and user-friendly functionality. Here’s to happy coding and to making an impact on the lives of other college students!

# The Git Workflow

1. Follow the git workflow guide
2. Commits to the project with a pull request
3. Before the changes can be merged into the main branch, the pull request must undergo tests and receive approval from at least one other team member.

# How to Build and Test Project

## Clone the source code from Github

1. Run ``git clone https://github.com/agiledev-students-fall2023/4-final-project-secondhand-goods-trading-platform`` in the source control bar to create a local repository in your desired folder.
1. Install [Node.js](https://nodejs.org/en) on its offical website if you don’t have it installed on your computer.
1. Open your cloned folder in VS Code.

## Running the database

1. First of all, please create a `.env` file in both `front-end` and `back-end` folders.
1. Copy the `.env.example` respectively in `front-end` and `back-end` folders into your created two `.env` files.

## Running and Testing the Front End

1. Open a new terminal (Git Bash).
1. Navigate into the front-end directory (use ``cd ../`` to back to main folder and use ``cd front-end``).
1. Run ``npm install`` and ``npm start`` to develop, navigate, and test the front end.

## Running and Testing the Backend Server

1. Open a new terminal (Git Bash).
1. Navigate into the back-end directory (use ``cd ../`` to back to main folder and use ``cd back-end``).
1. Run ``npm install``.
1. Run ``npm start`` to set the backend server running. Or, first run ``npm install --save-dev mocha chai c8 sinon chai-http nyc`` and then run ``npm test`` to see the results of all unit/integration tests.