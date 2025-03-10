           [User Sign-Up]
                 │
                 ▼
    ┌──────────────────────┐
    │  User submits form   │
    │ (username & password)│
    └──────────────────────┘
                 │
                 ▼
    ┌──────────────────────┐
    │ Check if username    │
    │ already exists in DB │
    └──────────────────────┘
                 │
         Yes ───▶│ Username taken? │──▶ Send error message
                 ▼
          No ───▶ Proceed with signup
                 │
                 ▼
    ┌────────────────────────────┐
    │ Generate SALT using bcrypt │
    │   (e.g., saltRounds = 10)  │
    └────────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Hash password with SALT    │
    │ using bcrypt.hash()        │
    └────────────────────────────┘
                 │
                 ▼
    ┌──────────────────────┐
    │ Store hashed password│
    │   in MongoDB         │
    └──────────────────────┘
                 │
                 ▼
    ┌──────────────────────┐
    │ Redirect to login    │
    │  (signup success)    │
    └──────────────────────┘

--------------------------------------------------

           [User Login]
                 │
                 ▼
    ┌──────────────────────┐
    │ User submits form    │
    │ (username & password)│
    └──────────────────────┘
                 │
                 ▼
    ┌──────────────────────┐
    │ Find user in DB      │
    └──────────────────────┘
                 │
          No ───▶│ User not found │──▶ Send error message
                 ▼
          Yes ───▶ Proceed with login
                 │
                 ▼
    ┌────────────────────────────┐
    │ Retrieve stored hashed     │
    │ password from database     │
    └────────────────────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │ Compare submitted password │
    │ with stored hash using     │
    │ bcrypt.compare()           │
    └────────────────────────────┘
                 │
          Match? │──────▶ Yes ───▶ Generate session/token (Login success)
                 │
          No ───▶ Send error message ("Invalid password")