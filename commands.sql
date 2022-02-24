CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0); 

insert into blogs (author, url, title) values ('Will Writer', 'someurl.com/newblog', 'On humility');
insert into blogs (author, url, title, likes) values ('Wendy Writer', 'someurl.com/newblog', 'On courage', 49);

SELECT * FROM blogs;