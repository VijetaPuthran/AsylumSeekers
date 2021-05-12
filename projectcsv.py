# Dependencies
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, join, outerjoin, MetaData, Table, func
from config import connect_string

# #################################################
# # Database Setup
# #################################################
engine = create_engine(connect_string)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# View all of the classes that automap found
Base.classes.keys()
# Save references to each table
# Asylumseekers = Base.classes.asylumseekers
Demographics = Base.classes.demographics
Timeseries = Base.classes.time_series
# Create our session (link) from Python to the DB
session = Session(engine)


class Asylum_Seekers():
    # def __init__(self):
    #     self.engine = create_engine(connect_string)
    #      # self.conn = self.engine.connect()
    #     self.connect_string = connect_string
    #     self.inspector = inspect(self.engine)
    #     self.tables = self.inspector.get_table_names()
    #     self.Base = automap_base()
    #     self.Base.prepare(self.engine, reflect=True)
    #     self.Asylumseekers=self.Base.classes['asylumseekers']
    #     self.Demographics=self.Base.classes['demographics']
    #     self.TimeSeries=self.Base.classes['time_series']
    
    
    # def asy_seekers_info(self):
        
        # results = session.query(Asylumseekers.host_country, Asylumseekers.origin, Asylumseekers.year,Asylumseekers.month,Asylumseekers.value).\
        #     all() 
        # results = pd.read_csv("Resources/asylum_seekers_monthly.csv")
        # asy_seek = results.to_dict('results')
        # asy_seek = []
        # for result in results:
        #     temp_dict = {}
        #     temp_dict["HostCountry"] = result[0]
        #     temp_dict["Origin"] = result[1]
        #     temp_dict["Year"]= result[2]
        #     temp_dict["Month"] = result[3]
        #     #temp_dict["Value"] = result[4]
        #     asy_seek.append(temp_dict)  
        # return(asy_seek)    

    def demographics(self):

        results = pd.read_csv("demographics.csv")
        dem = results.to_dict('results')
        results = session.query(Demographics.year,Demographics.host_country, Demographics.f_total, Demographics.m_total).all()
        dem =[]
        for result in results:
            temp_dem = {}
            temp_dem["Year"]=result.year
            temp_dem["HostCountry"]=result.host_country
        #     temp_dem["Location"]=result.location_name
        #     temp_dem["Female_0-4"]=result.female_0_4
        #     temp_dem["Female_5-11"]=result.female_5_11
        #     temp_dem["Female_5-17"]=result.female_5_17
        #     temp_dem["Female_12-17"]=result.female_12_17
        #     temp_dem["Female_18-59"]=result.female_18_59
        #     temp_dem["Female_60+"]=result.female_60plus
        #     temp_dem["Female_unknown"]=result.f_unknown
            temp_dem["Female_total"]=result.f_total
        #     temp_dem["Male_0-4"]=result.male_0_4
        #     temp_dem["Male_5-11"]=result.male_5_11
        #     temp_dem["Male_5-17"]=result.male_5_17
        #     temp_dem["Male_12-17"]=result.male_12_17
        #     temp_dem["Male_18-59"]=result.male_18_59
        #     temp_dem["Male_60plus"]=result.male_60plus
        #     temp_dem["Male_unknown"]=result.m_unknown
            temp_dem["Male_total"]=result.m_total
            dem.append(temp_dem) 
        return(dem)

    def time_series_info(self): 

        # results = pd.read_csv("timeseries.csv")
        # time = results.to_dict('results')
        results = session.query(Timeseries.year, Timeseries.host_country, Timeseries.origin,Timeseries.value).\
            all() 
        time = []
        for result in results:
            temp_dict = {}
            temp_dict["Year"]= result.year
            temp_dict["Host_Country"] = result.host_country
            temp_dict["Origin"] = result.origin
            # temp_dict["Population_Type"] = result.population_type
            temp_dict["Value"] = result.value
            time.append(temp_dict)
        return(time) 

    # def geomaps(self):
    #     results = pd.read_csv("Coordinates_File2.csv")
    #     geo = results.to_dict('results')
    #     return(geo)

   
   