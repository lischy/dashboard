https://dashtar-admin.netlify.app/login
https://kachabazar-store-nine.vercel.app/
https://www.youtube.com/watch?v=KY1t_AvyD-0&list=PLDn5_2K0bUmfREsFv1nSHDbmHEX5oqI3Z

rMUMfSZNwNjj8Vg
gdg@gads.

yiraf54784@inikale.com

bijay20117@easipro.com jumia

Giving wrapped flexbox items vertical spacing
https://stackoverflow.com/questions/35578404/giving-wrapped-flexbox-items-vertical-spacing

how to wrap flex items that scroll horizontally
https://stackoverflow.com/questions/60854283/how-to-wrap-flex-items-that-scroll-horizontally

https://dev.to/ljnce/horizontal-scroll-on-mouse-wheel-nothing-easier-mfm

https://refine.dev/blog/css-hide-scrollbar/#hide-scrollbars-on-specific-elements

https://www.youtube.com/watch?v=3v2cxwvWh80&t=15s //colapse

https://www.dhiwise.com/post/javascript-update-object-in-array-a-comprehensive-guide upadate array of objects

pnpm dev

https://www.mockaroo.com/

https://www.joshwcomeau.com/snippets/javascript/debounce/

https://nextjs.org/blog/styling-next-with-styled-jsx

https://www.youtube.com/watch?v=tLhcyBfljYo

https://codesandbox.io/p/sandbox/react-mui-file-upload-lgqwn?file=%2Fsrc%2FFileUpload%2FFileUpload.tsx%3A124%2C9-124%2C17

https://stackoverflow.com/questions/39846282/how-to-add-the-text-on-and-off-to-toggle-button
text inside switch html

https://freefrontend.com/css-carousels/

https://www.youtube.com/watch?v=z2LQYsZhsFw

https://swiperjs.com/swiper-api#events

https://www.youtube.com/watch?v=imhdh4xCh7I

@keyframes display {
0% {
transform: translateX(200px);
opacity: 0;
}
10% {
transform: translateX(0);
opacity: 1;
}
20% {
transform: translateX(0);
opacity: 1;
}
30% {
transform: translateX(-200px);
opacity: 0;
}
100% {
transform: translateX(-200px);
opacity: 0;
}
}

.pic-ctn {
position: relative;
width: 100vw;
height: 300px;
margin-top: 15vh;
}

.pic-ctn > img {
position: absolute;
top: 0;
left: calc(50% - 100px);
opacity: 0;
animation: display 10s infinite;
}

img:nth-child(2) {
animation-delay: 2s;
}
img:nth-child(3) {
animation-delay: 4s;
}
img:nth-child(4) {
animation-delay: 6s;
}
img:nth-child(5) {
animation-delay: 8s;
}

The CSS code you've provided creates an animation effect where images within a container will move in a left-right pattern while fading in and out. Here's a breakdown of what each part of the code is doing:

Keyframes (@keyframes display)
The @keyframes rule defines the animation called display. The animation progresses through five stages (from 0% to 100%):

0%: The element is positioned 200px to the right (translateX(200px)) and is fully transparent (opacity: 0).
10%: The element moves to the original position (translateX(0)) and fades in to full opacity (opacity: 1).
20%: The element remains at its original position with full opacity.
30%: The element moves to 200px to the left (translateX(-200px)) and fades out (opacity: 0).
100%: The element stays 200px to the left and remains fully transparent.
Container (.pic-ctn)
This class applies to the container element that holds the images:

position: relative; ensures the images are positioned relative to this container.
width: 100vw; makes the container take the full viewport width.
height: 300px; sets the container's height.
margin-top: 15vh; positions the container 15% from the top of the viewport.
Images (.pic-ctn > img)
position: absolute; allows the images to be positioned absolutely within the .pic-ctn container.
top: 0; left: calc(50% - 100px); centers the images horizontally within the container, given that the image width is 200px (based on left positioning with calc).
opacity: 0; initially hides the images.
animation: display 10s infinite; applies the display animation defined earlier. The animation will run for 10 seconds and repeat infinitely.
Delays on Images
Each subsequent image has a delay, so they do not animate all at once:

img:nth-child(2): Has a 2-second delay, so it starts the animation 2 seconds after the first image.
img:nth-child(3): Has a 4-second delay.
img:nth-child(4): Has a 6-second delay.
img:nth-child(5): Has an 8-second delay.
Result
The images will appear one after the other with staggered animations.
Each image will slide in from the right, then slide out to the left while fading in and out.
This creates a repeating visual effect where each image comes in, stays for a moment, and leaves in a continuous loop.
Let me know if you need further clarification or assistance with this code!

https://github.com/vercel/next-learn/blob/main/dashboard/final-example/

https://nextjs.org/docs/pages/building-your-application/routing/middleware#matching-paths

https://authjs.dev/getting-started/session-management/protecting?framework=next-js

https://authjs.dev/getting-started/migrating-to-v5

https://nextjs.org/learn/dashboard-app/adding-authentication

https://nextjs.org/docs/pages/building-your-application/authentication

https://github.com/renanleonel/next-auth-v5-middleware/blob/main/src/middleware.ts

https://next-auth.js.org/configuration/nextjs#middleware

https://authjs.dev/getting-started/providers/credentials?framework=next-js

https://www.geeksforgeeks.org/using-the-useref-hook-to-change-an-elements-style-in-react/
https://html2canvas.hertzen.com/configuration - create canva
https://www.youtube.com/watch?v=gkCaIyBPnd8
https://printjs.crabbly.com/ - preview
https://www.npmjs.com/package/jspdf - download pdf

https://www.youtube.com/watch?v=GbZa9s9Siss

https://www.youtube.com/watch?v=4V5HbqYJCVI&pp=ygUFanNwZGY%3D

https://www.youtube.com/watch?v=nD5SAX7EJAc - react pd

https://www.youtube.com/watch?v=3CMgznBdl-M&pp=ygUManNwZGYgbmV4dGpz

https://www.youtube.com/watch?v=9Qp7F8YWEF4

https://www.youtube.com/watch?v=1er63_Ki7MI - throttle
https://www.youtube.com/watch?v=RadgkoJrhu0 - revalidate optimistic update
useEffect(() => {
import("print-js").then((PrintJS) => {
const handlePrint = async () => {
// const printJS = dynamic(async () => await import("print-js"), {
// ssr: false,
// });

        const element = printInvoice.current;
        element.style.color = "black";
        element.style.backgroundColor = "white";

        if (!element) {
          return;
        }
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
          width: element.scrollWidth,
          height: element.scrollHeight,
          color: "#ffffff",
          background: "#000",
        });
        const image = canvas.toDataURL("image/jpeg");

        printJS({
          printable: image,
          type: "image",
          header: "Test",
        });
      };

      if (printButton) {
        printButton.current.addEventListener("click", handlePrint);
      }
    });

}, []);

https://www.youtube.com/watch?v=5ENPhdEMewg
https://mui.com/material-ui/customization/css-theme-variables/configuration/
https://bareynol.github.io/mui-theme-creator/
https://www.youtube.com/watch?v=jlHXgu38amM
https://mui.com/material-ui/customization/dark-mode/
https://m2.material.io/inline-tools/color/

https://github.com/mui/material-ui/pull/26545

https://www.youtube.com/watch?v=0Oacr8VrnNk

https://youtu.be/Hx2UqlhPmnc

https://freewebsnippets.com/snippet/slider/stylish-swiper-slider-with-full-screen-image-and-text-overlay.html

https://developer.fedoraproject.org/tech/database/postgresql/about.html
https://www.youtube.com/watch?v=RVPrch4L7Hc
https://www.youtube.com/watch?v=uBx3SqKCw4M
use non-relational (json) queries postgresql
https://docs.fedoraproject.org/en-US/quick-docs/postgresql/

sudo systemctl start postgresql-17

=# CREATE USER lenny WITH PASSWORD 'leonard';
postgres=# CREATE DATABASE my_project OWNER lenny;

sudo -u postgres psql

psql -U lenny -h localhost -d my_db\*project(dbname)
\du
alter user \*\** with password '%%%';
\l or select datname rom pg*database;
create database \*\*\*;
\c or \connect dbname
\dt to list tables

create table

create user doadmin with password 'schy$$dev';

my_db=> ALTER TABLE products.products_info ALTER COLUMN category TYPE character varying[] USING ARRAY[category::character varying]::character varying[];

alter TABLE products.products_info add column product_images VARCHAR[] ;

UPDATE products.products_info SET category[2] = 'test' where product_id=50 RETURNING \*;

instert into products.products_info (product_images) VALUES (ARRAY['','']) where product_id=50 RETURNING \*;

---

Schemas

---

In PostgreSQL, the terms schema and database refer to different levels of organizational structures within the database system.
Here’s a breakdown of the key differences:

1. Database:
   A database is a collection of data stored and managed in PostgreSQL.
   It is the highest-level organizational structure in PostgreSQL.

A PostgreSQL server can have multiple databases, and each database is isolated from others,
meaning data in one database cannot be accessed from another unless explicitly linked (e.g., using foreign data wrappers).

Databases are separate entities, and each database has its own set of schemas, tables, and other objects.

Example: If you have multiple projects, you might create separate databases for each project, such as project1, project2, etc.

Key characteristics:

Each database is isolated.

Multiple databases can exist in a PostgreSQL instance (server).

Each database has its own set of schemas, tables, etc.
Commands related to databases:

Create a database:
CREATE DATABASE mydatabase;

List databases:
\l -- In psql

2. Schema:
   A schema is a namespace within a database.
   It allows you to organize database objects like tables, views, functions, and other schema objects into logical groups.

Schemas help avoid naming conflicts by allowing the same object names in different schemas.
For example, you can have a users table in both the public schema and a finance schema without conflict.

Schemas are optional, and if not specified, the default schema is public.

A single database can have multiple schemas. All schemas within a database share the same set of tablespace (storage area).

Key characteristics:

Each schema resides within a single database.

Schemas provide a way to organize and manage database objects within a database.

It’s possible to control access to schemas for different users.

You can have the same table or function names in different schemas.

Commands related to schemas:

Create a schema:
CREATE SCHEMA myschema;

List schemas:
\dn -- In psql

Set search path (which schema is searched first):
SET search_path TO myschema, public;

Example:
Let’s consider a scenario:

You have a PostgreSQL server with two databases: company_db and sales_db.

Inside company_db, you create two schemas: employees and finance. Inside sales_db, you create a schema called sales_reports.

company_db could contain tables like:

employees.employees (for employee data),

finance.transactions (for financial data).

sales_db could contain tables like:

sales_reports.monthly_sales (for sales data).

While company_db and sales_db are separate databases and can’t access each other directly, the schemas inside each database
(employees, finance, and sales_reports) organize the tables and allow for structured management within that single database.

To list the tables in a specific schema in PostgreSQL, you can use the following command in psql (PostgreSQL command-line interface)
or a SQL query in your preferred SQL client (like DBeaver):

Using psql:
Connect to the PostgreSQL database:
psql -d your_database_name

To list tables in a specific schema, use the following command:

\dt schema_name.\*
Replace schema_name with the name of the schema you want to list the tables for. For example, if the schema is called employees,
you would run:

\dt employees.\*

---

Using SQL Query:
Alternatively, you can use an SQL query to list tables in a specific schema:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'your_schema_name'
AND table_type = 'BASE TABLE';
Replace your_schema_name with the actual name of the schema you want to list tables for. For example,
if the schema is employees, you would run:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'employees'
AND table_type = 'BASE TABLE';
This query will return a list of tables within the specified schema.

Example:
For a schema called public (which is the default schema), you would run:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';
Notes:

table_schema refers to the schema name.

table_type can be 'BASE TABLE' for actual tables or 'VIEW' for views, depending on what you're looking for.
The query above filters for base tables.

---

To create a table in a specific schema in PostgreSQL, you can use the CREATE TABLE statement and specify the schema name
as part of the table name.

Here’s the basic syntax to create a table in a specific schema:

CREATE TABLE schema_name.table_name (
column1 datatype [constraints],
column2 datatype [constraints],
...
);
Example:
Let’s say you have a schema called employees and you want to create a table called employees_info in that schema.
You would run the following SQL query:

CREATE TABLE employees.employees_info (
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
date_of_birth DATE,
hire_date DATE
);
Explanation:
employees: The name of the schema in which the table will be created.

employees_info: The name of the table being created.

Columns: The list of columns with their respective data types and any constraints like PRIMARY KEY or NOT NULL.

Step-by-Step Example:
Create the Schema (if it doesn’t already exist): If the schema doesn’t already exist, you can create it first:

CREATE SCHEMA employees;
Create the Table: Now, you can create the table within the employees schema:

CREATE TABLE employees.employees_info (
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
date_of_birth DATE,
hire_date DATE
);
Verify Table Creation: You can verify that the table was created successfully by listing the tables in the employees schema:

\dt employees.\*

Or, using a query:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'employees';
Notes:
If you don’t specify the schema when creating the table, PostgreSQL will create it in the default schema (usually public).

If you’re not connected to the right database or if the user doesn’t have proper permissions on the schema,
make sure you have the correct privileges and connection.

---

To describe (view the structure of) tables in a specific schema in PostgreSQL, you can use a few different methods,
depending on whether you're working in psql (the command-line interface) or running SQL queries directly.

1. Using psql (PostgreSQL Command Line Interface)
   List Tables in a Specific Schema
   ***
   To list all tables in a specific schema (e.g., employees schema), use the following command:

\dt schema_name.\*
Example for the employees schema:

\dt employees.\*

## Describe a Specific Table

To describe the structure of a specific table (i.e., view its columns, data types, and constraints), use the \d command:

\d schema_name.table_name
Example:

\d employees.employees_info
This will show you the columns, data types, constraints, indexes, etc., for the employees_info table in the employees schema.

2. Using SQL Queries
   You can also use SQL queries to describe the structure of tables by querying PostgreSQL's system catalog or the
   information_schema.

Query 1: List Tables in a Schema
To list the tables in a specific schema, you can query the information_schema.tables view:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'schema_name'
AND table_type = 'BASE TABLE';

For example, to list tables in the employees schema:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'employees'
AND table_type = 'BASE TABLE';
Query 2: Describe a Table
To describe the structure of a table (get column names, data types, and other information),
you can query the information_schema.columns view:

SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'schema_name'
AND table_name = 'table_name';

For example, to describe the employees_info table in the employees schema:

SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'employees'
AND table_name = 'employees_info';
This will return a list of the columns in the employees_info table, along with their data types,
whether they allow NULL values, and any default values.

connect.js

// import { Pool } from "pg";

// const pool = new Pool({
// user: "doadmin", // Your PostgreSQL username
// host: "localhost", // Database host (localhost for local PostgreSQL)
// database: "my_db", // The database you created
// password: "schy$$dev", // Your PostgreSQL password
// port: 5432, // PostgreSQL default port
// });

// export default pool;

products/rout.js
// // pages/api/users.js
// import pool from "../../lib/connect";
// // import pool from "../../lib/db";

// async function fetchProducts(req, res) {
// try {
// const { rows } = await pool.query("SELECT \* FROM products.products_info"); // Query example
// // res.status(200).json(rows); // Send the results as a JSON response
// return new Response(JSON.stringify(rows), { status: 200 });
// } catch (err) {
// // res.status(500).json({ error: "Failed to fetch users" });
// return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
// status: 500,
// });
// } finally {
// // Close the pool connection (this is important for long-running connections, not always needed in serverless)
// await pool.end();
// }
// }

// // Handle GET request
// export async function GET(req) {
// return fetchProducts();
// }

WITH paginated*results AS (
SELECT *
FROM your*table
ORDER BY id
LIMIT 10 OFFSET 10 -- example for page 2
)
SELECT *,
(SELECT CEIL(COUNT(\*) / 10.0) FROM your_table) AS total_pages
FROM paginated_results;

https://www.youtube.com/watch?v=NZKUirTtxcg - Infinite Scrolling With React - Tutorial
https://www.youtube.com/watch?v=IFYFezylQlI

Switch schema

---

SHOW search_path;
And to put the new schema in the path, you could use:
SET search_path TO myschema;
Or if you want multiple schemas:
SET search_path TO myschema, public;

---

## https://neon.tech/postgresql/postgresql-cheat-sheet

imae upload next js
https://imagekit.io/blog/nextjs-image-and-video-upload/
https://www.youtube.com/watch?v=3f5Q9wDePzY
https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
https://www.youtube.com/watch?v=-_bhH4MLq1Y
https://imagekit.io/blog/uploading-multiple-files-using-javascript/

const response = Array.from(event.target.files).map(
async (file) => await uploadFile({ file: file })
);

https://github.com/react-dropzone/react-dropzone
https://www.youtube.com/watch?v=KCPqGhLiCH8

document.querySelector("[src='images/x.jpg']").click()
element.parentNode.removeChild(element); // will remove the element from DOM
https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

https://www.thatsoftwaredude.com/content/13936/how-to-show-pdf-file-upload-previews-using-javascript

append date.now() to the filename to avoid override on same file upload , I don't want the user to see the altered name

https://medium.com/kevin-salters-blog/reordering-a-javascript-array-based-on-a-drag-and-drop-interface-e3ca39ca25c

Using ON CONFLICT with DO UPDATE (Optional)
If you want to update the existing row in case of a conflict instead of doing nothing (e.g., updating display_name or published), you can modify the query slightly:

javascript
Copy
Edit
const query = `  INSERT INTO products.attributes(name, display_name, published) 
  VALUES ($1, $2, $3)
  ON CONFLICT (name) 
  DO UPDATE SET display_name = EXCLUDED.display_name, published = EXCLUDED.published
  RETURNING *;`;

try {
const { rows, errors } = await pool.query(query, [
attribute.name,
attribute.display_name,
attribute.published,
]);
console.log(rows); // Logs the inserted or updated row(s)
} catch (err) {
console.error("Error executing query", err.stack); // Logs the error if there's one
}
Explanation:
DO UPDATE: If a conflict is detected on the name column, this statement will update the existing row's display_name and published values with the values from the new insert.

EXCLUDED: The EXCLUDED keyword refers to the row that was supposed to be inserted (but was excluded due to the conflict).
