-- Create Table
CREATE TABLE demographics (
  index int	PRIMARY KEY,
  year integer,
  host_country char(200), 
  f_total integer,  
  m_total integer
	);
-- Create Table
CREATE TABLE time_series (
  index int	PRIMARY KEY,
  year integer,
  host_country char(200),
  origin char(200),
  value integer
);

--select * from demographics
select * from time_series