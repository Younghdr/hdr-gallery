create table if not exists events (
  id integer primary key autoincrement,
  event text not null,
  path text,
  search text,
  referrer text,
  visitor_id text not null,
  params_json text,
  user_agent text,
  ip_country text,
  created_at text not null
);

create index if not exists events_event_idx on events (event);
create index if not exists events_visitor_idx on events (visitor_id);
create index if not exists events_created_at_idx on events (created_at);
