CREATE TABLE team_request (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id uuid NOT NULL REFERENCES team(id) ON DELETE CASCADE DEFERRABLE,
  requester_id uuid NULL REFERENCES profile(id) ON DELETE CASCADE DEFERRABLE,
  valid_until timestamptz NOT NULL,
  auto_join_until timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);


ALTER TABLE team_request ADD CONSTRAINT team_request_unique UNIQUE (team_id, requester_id);
