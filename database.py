import mysql.connector

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="YOUR_MYSQL_PASSWORD_HERE",
    database="student_performance"
)

print("MySQL connected successfully!")

# Create cursor
cursor = db.cursor()

# Get students from database
cursor.execute("SELECT * FROM students")

students = cursor.fetchall()

# Display students
print("Students from MySQL:")

for student in students:
    print(student)

# Close connection
cursor.close()
db.close()
