CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0); 

insert into blogs (author, url, title) values ('Will Writer', 'someurl.com/newblog', 'On humility');

select * from blogs;