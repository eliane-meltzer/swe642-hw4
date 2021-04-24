package com.swe642.hw4.survey.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.swe642.hw4.survey.data.SurveyData;
import com.swe642.hw4.survey.reports.AllReports;
import com.swe642.hw4.survey.reports.SurveyReport;

import java.util.List;

@Repository
@Component
public interface SurveyRepo extends JpaRepository<SurveyData, Long> {
	
	@Query("SELECT NEW com.swe642.hw4.survey.reports.AllReports(id, studentid) FROM SURVEYDATA")
	List<AllReports> reportSurveyList();
	
	/*
	 * @param id
	 * @return
	 */
	@Query("SELECT S.id AS ID, S.name AS STUDENTNAME, S.studentid AS STUDENTID, S.surveydate AS SURVEYDATE, "
      + "S.street AS STREET, S.city AS CITY, S.state AS STATE, S.zip AS ZIP, "
      + "S.telnum AS TELNUM, S.email AS EMAIL, S.url AS URL, S.liked AS LIKED, S.heard AS HEARD, "
      + "S.gradmon AS GRADMON, S.gradyear AS GRADYEAR, S.recommend AS RECOMMEND, S.comments AS COMMENTS "			
      + "FROM SURVEYDATA S "
      + "WHERE ID =:id")
	SurveyReport findSurveyByID(@Param("id") Long id);	

}
