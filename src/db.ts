import * as sqlite3 from "sqlite3";

export const db = new sqlite3.Database("database.sqlite");

// Crear una tabla "users" con dos columnas: "id" y "preference"
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY, 
      preference TEXT
    )
  `);
});

// Crear tabla para almacenar los chat ids
db.run(`CREATE TABLE IF NOT EXISTS chat_group (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id INTEGER UNIQUE NOT NULL,
    group_name TEXT NOT NULL
  )`);

export async function saveChatGroup(
  chatId: number,
  groupName: string
): Promise<void> {
  await db.run(
    "INSERT OR REPLACE INTO chat_group (chat_id, group_name) VALUES (?, ?)",
    [chatId, groupName]
  );
}

export async function getAllGroups(): Promise<
  Array<{ id: number; chat_id: number; group_name: string }>
> {
  const sql = "SELECT * FROM chat_group";
  return new Promise<
    Array<{ id: number; chat_id: number; group_name: string }>
  >((resolve, reject) => {
    db.all(sql, [], (err, rows: any) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("rows", rows);

      resolve(rows);
    });
  });
}

export async function deleteChatGroup(chatId: number): Promise<string> {
  let message = "";
  return new Promise<string>((resolve, reject) => {
    db.get(
      "SELECT * FROM chat_group WHERE chat_id = ?",
      [chatId],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }

        if (row) {
          db.run(
            "DELETE FROM chat_group WHERE chat_id = ?",
            [chatId],
            (err) => {
              if (err) {
                console.error(err.message);
                reject(err);
                return;
              }

              message =
                "The sending of commits has been stopped for this group";
              resolve(message);
            }
          );
        } else {
          message = "This group is not registered in the database.";
          resolve(message);
        }
      }
    );
  });
}
