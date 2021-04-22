package com.swe642.hw4.survey.repository;

import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import com.swe642.hw4.survey.data.SurveyData;
import com.swe642.hw4.survey.reports.AllReports;
import com.swe642.hw4.survey.reports.SurveyReport;

import java.util.List;



public interface SurveyRepo extends CrudRepository<SurveyData, Long> {
	
	@Query("SELECT S.ID AS ID, S.STUDENTID AS STUDENTID FROM SURVEYDATA S")
	List<AllReports> reportSurveyList();
	
	/*
	 * @param id
	 * @return
	 */
	@Query(value="SELECT S.ID AS ID, S.STUDENTNAME AS STUDENTNAME, S.STUDENTID AS STUDENTID, S.SURVEYDATE AS SURVEYDATE, "
      + "S.STREET AS STREET, S.CITY AS CITY, S.STATE AS STATE, S.ZIP AS ZIP, "
      + "S.TELNUM AS TELNUM, S.EMAIL AS EMAIL, S.URL AS URL, S.LIKED AS LIKED, S.HEARD AS HEARD, "
      + "S.GRADMON AS GRADMON, S.GRADYEAR AS GRADYEAR, S.RECOMMEND AS RECOMMEND, S.COMMENTS AS COMMENTS "			
      + "FROM SURVEYDATA S "
      + "WHERE S.ID =:SID;")
	SurveyReport findSurveyByID(@Param("SID") Long id);	

}
