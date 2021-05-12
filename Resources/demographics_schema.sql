-- Create Table
CREATE TABLE demographics (
  index int	PRIMARY KEY,
  year integer,
  host_country char(200),
  location_name char(200),
  female_0_4 integer,
  female_5_11 integer,
  female_5_17 integer,
  female_12_17 integer,
  female_18_59 integer, 
  female_60plus integer,
  f_unknown integer, 
  f_total integer, 
  male_0_4 integer,
  male_5_11 integer, 
  male_5_17 integer, 
  male_12_17 integer, 
  male_18_59 integer, 
  male_60plus integer,
  m_unknown integer, 
  m_total integer
	);
	
select * from demographics;
	