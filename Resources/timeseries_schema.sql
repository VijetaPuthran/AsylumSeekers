-- Create Table
CREATE TABLE time_series (
  index int	PRIMARY KEY,
  year integer,
  host_country char(200),
  origin char(200),
  population_type char(200),
  value integer
);
