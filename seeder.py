import json
import os
from dotenv import load_dotenv;

import mysql
import mysql.connector

import random


def reset(connection):
    connection._execute_query("SET FOREIGN_KEY_CHECKS=0")
    connection._execute_query('delete from courses');
    connection._execute_query('delete from chapters');
    connection._execute_query('delete from questions');
    connection._execute_query('delete from choices');
    connection._execute_query("SET FOREIGN_KEY_CHECKS=1")


def execute(connection):
    with open("./courses.json") as f:
        courses = json.load(f)
        for course in courses["courses"]:
            query = f"INSERT INTO courses (name) VALUES ('{course['course_name']}');";
            cursor = connection.cursor();
            cursor.execute(query);
            connection.commit();
            cursor.execute(f"select course_id from courses where name = '{course['course_name']}';");
            courseId = cursor.fetchone()[0];
            for chapter in course["chapters"]:
                sql = f"insert into chapters(chapter_name, chapter_number, course_id) values('{chapter['chapter_title']}', {chapter['chapter_number']}, {courseId});";
                cursor.execute(sql);
                connection.commit();
            cursor.close();
    
    difficulties, objectives = ['easy', 'difficult'], ['reminding','understanding','creativity'];
    
    
    
    questions = [];
    with open("./questions.json") as f:
        questions = json.load(f)
        
    
    cursor = connection.cursor();
    cursor.execute(f"select chapter_id from chapters;");
    chapters = cursor.fetchall()
    cursor.close();
    
    
    
    
    for chapter in chapters:
        chapterId = chapter[0];
        
        
        possibilities = [];
        
        
        for diff in difficulties:
            for obj in objectives:
                possibilities.append([diff, obj]);
        
        possibilities += possibilities;
        cursor = connection.cursor();
        for i in range(12):
            randIdx = random.choice([z for z in range(len(possibilities))])
            diff, obj = possibilities.pop(randIdx);
            question = questions.pop();
            sql = f'insert into questions(content, difficulty, chapter_id, objective) VALUES("{question['question']}", "{diff}", {chapterId}, "{obj}");'
            cursor.execute(sql)
            connection.commit();
                        
            answer = question["answer"];
            
            cursor.execute(f'select question_id from questions where content = "{question['question']}";');
            questionId = cursor.fetchone()[0];
            for char, order in [("A", 1), ("B", 2), ("C", 3), ("D", 4)]:
                isCorrect = char == answer;
                sql = f'insert into choices(choice_number, content, question_id, is_correct) VALUES({order}, "{question[char]}", {questionId}, {isCorrect});'
                cursor.execute(sql);
                connection.commit();
                        
        cursor.close();
    
    print("Done");
            
            

    

def main():
    load_dotenv('.env')
    host = os.getenv('DB_HOST')
    port = os.getenv('DB_PORT')
    password = os.getenv('DB_PASSWORD')
    database = os.getenv('DB_DATABASE')
    user = os.getenv('DB_USER')
    connection = mysql.connector.connect(host = host, port = port, user = user, password = password, database = database);

    reset(connection)
    execute(connection);

main();


