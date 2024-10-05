# PayPal Express App

### 1. **Endpoints**

#### **User Management:**

- **POST `/api/register`** – Register a new user.
- **POST `/api/login`** – Authenticate user and provide access token.
- **POST `/api/logout`** – Logout the user.
- **GET `/api/user/:id`** – Fetch user details (with proper authentication).
- **PUT `/api/user/:id`** – Update user profile information.
- **DELETE `/api/user/:id`** – Delete user account.

#### **Account & Balance Management:**

- **GET `/api/account/balance`** – Fetch current account balance for logged-in user.
- **POST `/api/account/deposit`** – Add funds to the account.
- **POST `/api/account/withdraw`** – Withdraw funds from the account.

#### **Transactions:**

- **POST `/api/transaction/send`** – Send money to another user.
- **POST `/api/transaction/request`** – Request money from another user.
- **GET `/api/transaction/history`** – Fetch transaction history.
- **GET `/api/transaction/:id`** – Fetch details of a specific transaction.

#### **Payment:**

- **POST `/api/payment/process`** – Process a payment for a third-party service or merchant.
- **POST `/api/payment/refund`** – Refund a payment.

### 2. **Middleware**

- **`authMiddleware`**
- **`adminMiddleware`**
- **`validationMiddleware`**
- **`errorHandlingMiddleware`**
- **`rateLimitingMiddleware`**
- **`loggingMiddleware`**

### 3. **Routers**

- **`/auth` Router**
  - Routes: `/register`, `/login`, `/logout`
- **`/user` Router**
  - Routes: `/balance`, `/deposit`, `/withdraw`
- **`/transaction` Router**
  - Routes: `/send`, `/request`, `/history`
- **`/payment` Router**
  - Routes: `/process`, `/refund`

### Models

1. **User**

   - username
   - password
   - email
   - firstName
   - lastName
   - address
   - isActive
   - phoneNumber

2. **Session**

   - key
   - data
   - user
   - expire
   - getData()

3. **Account**

   - user
   - balance

4. **Transaction**

   - sender
   - recipient
   - amount

5. **Withdraw**

   - datetime
   - account
   - amount

6. **Deposit**

   - datetime
   - account
   - amount

[Diagram](https://dbdiagram.io/d/67010bdffb079c7ebd6cb085)
