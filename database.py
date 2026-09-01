import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()


def get_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQLHOST", "localhost"),
        port=int(os.getenv("MYSQLPORT", "3306")),
        user=os.getenv("MYSQLUSER", "root"),
        password=os.getenv("MYSQLPASSWORD"),
        database=os.getenv("MYSQLDATABASE", "student_performance")
    )


if __name__ == "__main__":
    db = get_db()

    print("MySQL connected successfully!")

    cursor = db.cursor()

    cursor.execute("SELECT * FROM students")

    students = cursor.fetchall()

    print("Students from MySQL:")

    for student in students:
        print(student)

    cursor.close()
    db.close()