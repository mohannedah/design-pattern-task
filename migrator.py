import os
from dotenv import load_dotenv
import mysql.connector



            
def execute(connection):
    directoryFiles = os.listdir('./database_revisions');
    
    
    for file in directoryFiles:
        if file.endswith('.sql'):
            with open('./database_revisions/' + file, 'r') as f: 
                queries = f.read().split(';');
              
                for i in range(len(queries)):
                    queries[i] = queries[i].strip();
                    queries[i] += ";";
                
                for query in queries:
                    if query == ";":
                        continue;
                    cursor = connection.cursor();
                    cursor.execute(query);
                    cursor.close();
                print(f"Executed {file}");
    

def main():
    load_dotenv('.env')
    host = os.getenv('DB_HOST')
    port = os.getenv('DB_PORT')
    password = os.getenv('DB_PASSWORD')
    database = os.getenv('DB_DATABASE')
    user = os.getenv('DB_USER')
    connection = mysql.connector.connect(host = host, port = port, user = user, password = password, database = database);

    
    
    print("Bearer mohanned".split('Bearer'));
    # execute(connection);

main();