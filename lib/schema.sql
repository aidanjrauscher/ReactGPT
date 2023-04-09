-- QUERIES USED TO SETUP POSTGRESQL DB IN SUPABASE

-- ADD PGVECTOR EXTENSION
create extension vector;

-- CREATE TABLE
create table chunk_embedding (
  id bigserial primary key,
  title text,
  url text,
  chunkContent text,
  numTokens bigint, 
  embedding vector (1536)
);


-- CUSTOM FUNCTION TO HANDLE EMBEDDING SIMILARITY SEARCH
create or replace function reactgpt_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)

returns table(
  id bigint,
  title text, 
  url text,
  content text,
  numTokens bigint,
  similarity float
)

language plpgsql
as $$
begin
  return query
  select
    chunk_embedding.id,
    chunk_embedding.title,
    chunk_embedding.url,
    chunk_embedding.content,
    chunk_embedding.numTokens,
    1 - (chunk_embedding.embedding <=> query_embedding) as
similarity 
from chunk_embedding
where 1- (chunk_embedding.embedding <=> query_embedding) > similarity_threshold
order by chunk_embedding.embedding <=> query_embedding
limit match_count;
end;
$$;



