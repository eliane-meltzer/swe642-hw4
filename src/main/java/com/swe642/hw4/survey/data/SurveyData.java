package com.swe642.hw4.survey.data;

import java.util.LinkedHashMap;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;


@Entity
@Data
@Table(name="SURVEYDATA")
public class SurveyData {
	
	//member variables
	@Column(name="ID")
	private @Id @GeneratedValue Long id;
	@Column(name="STUDENTNAME")
	private String name = ""; 
	@Column(name="STUDENTID")
	private String studentID = ""; 
	@Column(name="STREET")
	private String street = "";
	@Column(name="CITY")
	private String city = ""; 
	@Column(name="STATE")
	private String state = ""; 
	@Column(name="ZIP")
	private String zip = ""; 
	@Column(name="TELNUM")
	private String telNum = ""; 
	@Column(name="EMAIL")
	private String email = ""; 
	@Column(name="URL")
	private String url = ""; 
	@Column(name="HEARD")
	private String heard = ""; 
	@Column(name="GRADMON")
	private String gradMon = ""; 
	@Column(name="GRADYEAR")
	private String gradYear = ""; 
	@Column(name="RECOMMEND")
	private String recommend = ""; 
	@Column(name="COMMENTS")
	private String comments = "";
	@Column(name="SURVEYDATE")
	private String surveyDate = "";
	@Column(name="LIKED")
	private String[] liked = new String[6];
	
	/*
	 * requires non-null linked hashmap containing keys for each field
	 */
	public SurveyData(LinkedHashMap<String, Object> map) {
		this.id = null;
		if(map.containsKey("name")) {this.name = (String) map.get("name");}		
		if(map.containsKey("studentid")) {this.studentID = (String) map.get("studentid");}
		if(map.containsKey("surveydate")) {this.surveyDate = (String) map.get("surveydate");}
		if(map.containsKey("street")) {this.street = (String) map.get("street");}
		if(map.containsKey("city")) {this.city = (String) map.get("city");}
		if(map.containsKey("state")) {this.state = (String) map.get("state");}
		if(map.containsKey("zip")) {this.zip = (String) map.get("zip");}
		if(map.containsKey("telnum")) {this.telNum = (String) map.get("telnum");}
		if(map.containsKey("email")) {this.email = (String) map.get("email");}
		if(map.containsKey("url")) {this.url = (String) map.get("url");}
		if(map.containsKey("heard")) {this.heard = (String) map.get("heard");}
		if(map.containsKey("gradmon")) {this.gradMon = (String) map.get("gradmon");}
		if(map.containsKey("gradyear")) {this.gradYear = (String) map.get("gradyear");}
		if(map.containsKey("recommend")) {this.recommend = (String) map.get("recommend");}
		if(map.containsKey("comments")) {this.comments = (String) map.get("comments");}
	}
	
	
	public SurveyData(String name, String studentID, String surveyDate, String street, String city, String state, String zip, String telNum,
			String email, String url, String[] liked, String heard, String gradMon, String gradYear, String recommend, String comments) {
		this.id = null;
		this.name = name;
		this.studentID = studentID;
		this.surveyDate = surveyDate;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.telNum = telNum;
		this.email = email;
		this.url = url;
		this.liked = liked;
		this.heard = heard;
		this.gradMon = gradMon;
		this.gradYear = gradYear;
		this.recommend = recommend;
		this.comments = comments;
	}
	
	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		SurveyData d = (SurveyData) o;
		return Objects.equals(id, d.id) &&
				Objects.equals(name, d.name) &&
				Objects.equals(studentID, d.studentID) &&
				Objects.equals(surveyDate, d.surveyDate) &&
				Objects.equals(street, d.street) &&
				Objects.equals(city, d.city) &&
				Objects.equals(state, d.state) &&
				Objects.equals(zip, d.zip) && 
				Objects.equals(telNum, d.telNum) &&
				Objects.equals(email, d.email) &&
				Objects.equals(url, d.url) &&
				Objects.equals(liked, d.liked) &&
				Objects.equals(heard, d.heard) &&
				Objects.equals(gradMon, d.gradMon) &&
				Objects.equals(gradYear, d.gradYear) &&
				Objects.equals(recommend, d.recommend) &&
				Objects.equals(comments, d.comments);
		
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, name, studentID, surveyDate, street, city, state, zip,
				telNum, email, url, liked, heard, gradMon, gradYear, recommend, comments);
	}
	
	@Override
	public String toString() {
		return "ID: "+id+"\nStudentName: "+name+"\nStudentID: "+studentID+"\nSurvey date: "
			      +surveyDate+"\nStreet Address: "+street+"\nCity: "+city+"\nState: "+state+"\nZip: "
			      +zip+"\nTelephone: "+telNum+"\nEmail: "+email+"\nHomepage: "
			      +url+"\nLiked: "+liked+"\nHeard: "+heard+"\nGrad Month: "+gradMon+
			      "\nGrad Year: "+gradYear+"\nRecommend: "+recommend+"\nComments: "+comments;
	}
}
