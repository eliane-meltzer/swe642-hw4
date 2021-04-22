package com.swe642.hw4.survey;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.swe642.hw4.survey.data.DataProcessor;
import com.swe642.hw4.survey.data.SurveyData;
import com.swe642.hw4.survey.reports.AllReports;
import com.swe642.hw4.survey.reports.SurveyReport;
import com.swe642.hw4.survey.repository.SurveyRepo;

@RestController
@RequestMapping("/api/")
public class SurveyController {
	@Autowired
	private final SurveyRepo repo;
	
	public SurveyController(SurveyRepo repo) {
		this.repo = repo;
	}
	@PostMapping(path=ServiceLinks.SAVE_SURVEY, consumes = "application/json", produces = "application/json")
	public ResponseEntity<SurveyData> saveStudentFormData(RequestEntity<?> o) {
		//save survey form data to database		
		LinkedHashMap<String, Object> body = (LinkedHashMap<String, Object>) o.getBody();
		SurveyData s = new SurveyData(body);		
		
		ResponseEntity<SurveyData> r = ResponseEntity.ok().body(repo.save(s));		
		return r;    
	}
		
	@PostMapping(path=ServiceLinks.GET_SURVEY, consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> retrieveSurveyData(RequestEntity<?> o) {
		//retrieve survey form data from database using PK=student.id
	    LinkedHashMap<String, Object> body = (LinkedHashMap<String, Object>) o.getBody();
	    if(!body.containsKey("id")) {
	    	return (ResponseEntity<?>) ResponseEntity.noContent();
	    }
	    
	    String string_id = (String) body.get("id");
	    Long val = Long.parseLong(string_id);			
	    SurveyReport s = repo.findSurveyByID(val);		
		return ResponseEntity.ok().body(s);		
	}	
	@GetMapping(path=ServiceLinks.LIST_ALL)
	public ResponseEntity<?> getAllSurveyIDs() {
		List<AllReports> r =  repo.reportSurveyList();
		return ResponseEntity.ok(r);
	}
	
	@PostMapping(path=ServiceLinks.PROCESS_DATA, consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> getProcessedData(RequestEntity<?> o){
		String body = (String) o.getBody();

		DataProcessor d = new DataProcessor(body);
		double mean = d.getMean();
		double std = d.getStdDev();
		double max = d.getMaxVal();
		String ret = "{mean: "+mean+", stdDev: "+std+", maxVal: "+max+",}";
		
		return ResponseEntity.ok().body(ret);
	}
	
}
